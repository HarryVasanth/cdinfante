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
 * Uses Vite's glob import to automatically discover all Markdown files in the
 * src/content directory. This ensures new posts are picked up without
 * manual registration in a JSON manifest.
 */
const allPosts = import.meta.glob('../content/**/*.md', {
  query: '?raw',
  import: 'default',
});

/**
 * Fetches and parses a specific post's markdown content.
 *
 * @param category - The directory name of the category (e.g., 'sports/handball' or 'others').
 * @param slug - The filename of the post without the .md extension.
 * @returns A Post object.
 */
export async function getPost(category: string, slug: string): Promise<Post> {
  const path = category.includes('/')
    ? `../content/${category}/${slug}.md`
    : `../content/sports/${category}/${slug}.md`;

  let fetcher = allPosts[path];

  // Fallback for when category is not 'sports/...' but just 'others'
  if (!fetcher && !category.includes('/')) {
    const alternativePath = `../content/${category}/${slug}.md`;
    fetcher = allPosts[alternativePath];
  }

  if (!fetcher) {
    throw new Error(`Post not found: ${path}`);
  }

  const rawContent = (await fetcher()) as string;
  // @ts-expect-error front-matter return type
  const { attributes, body } = fm(rawContent);

  return {
    slug,
    sport: category.split('/').pop() || category,
    ...(attributes as FrontMatterAttributes),
    content: body as string,
  };
}

/**
 * Discovers all posts for a given sport by scanning the imported glob.
 *
 * @param sport - The directory name of the sport.
 * @returns An array of Post objects sorted by date descending.
 */
export async function getSportPosts(sport: string): Promise<Post[]> {
  try {
    const sportPrefix =
      sport === 'others' ? `../content/others/` : `../content/sports/${sport}/`;

    const sportPosts = Object.keys(allPosts).filter((path) =>
      path.startsWith(sportPrefix),
    );

    const postPromises = sportPosts.map(async (path) => {
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      return getPost(sport === 'others' ? 'others' : sport, slug);
    });

    const results = await Promise.all(postPromises);

    // Sort by date descending
    return results.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (error) {
    console.error(`Error discovering posts for ${sport}:`, error);
    return [];
  }
}
