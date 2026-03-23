// @ts-expect-error front-matter might not have types
import fm from 'front-matter';

/**
 * Interface representing a single post's metadata and content.
 */
export interface Post {
  slug: string;
  title: string;
  date: string;
  image?: string;
  description: string;
  images?: string[];
  content: string;
  sport: string;
}

interface FrontMatterAttributes {
  title: string;
  date: string;
  image?: string;
  description: string;
  images?: string[];
}

/**
 * Fetches and parses a specific post's markdown file.
 *
 * @param sport - The directory name of the sport (e.g., 'handball').
 * @param slug - The filename of the post without the .md extension.
 * @returns A Post object.
 */
export async function getPost(sport: string, slug: string): Promise<Post> {
  const response = await fetch(`/content/sports/${sport}/${slug}.md`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${slug}`);
  }
  const text = await response.text();
  // @ts-expect-error front-matter return type
  const { attributes, body } = fm(text);

  return {
    slug,
    sport,
    ...(attributes as FrontMatterAttributes),
    content: body as string,
  };
}

/**
 * Fetches the list of post filenames for a given sport from a manifest file.
 * Since we are in a static client-side environment, we'll use a `posts.json` manifest
 * per sport that needs to be updated or we will fetch it from an API/Search if available.
 *
 * For simplicity and GitHub editing friendliness, we'll recommend maintaining a
 * `posts.json` in each sport's directory or we could fetch the directory list
 * if the server allows it. In GitHub Pages/Vite, we can't easily list files at runtime
 * without an external API (like GitHub's).
 *
 * Strategy: A small JSON index file in each directory.
 */
export async function getSportPosts(sport: string): Promise<Post[]> {
  try {
    const response = await fetch(`/content/sports/${sport}/index.json`);
    if (!response.ok) {
      return [];
    }
    const { posts }: { posts: string[] } = await response.json();

    const postPromises = posts.map(slug => getPost(sport, slug));
    const allPosts = await Promise.all(postPromises);

    // Sort by date descending
    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error(`Error fetching posts for ${sport}:`, error);
    return [];
  }
}
