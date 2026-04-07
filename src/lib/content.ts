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
const allPosts = import.meta.glob('../content/**/index.md', {
  query: '?raw',
  import: 'default',
});

/**
 * Discovers all images in the content directory to resolve them as static assets.
 */
const allImages = import.meta.glob('../content/**/*.{jpg,jpeg,png,webp,avif}', {
  import: 'default',
});

/**
 * Resolves a relative image path from a post's frontmatter to its processed URL.
 *
 * @param postDir - The directory path of the post.
 * @param imagePath - The path from the frontmatter (e.g., './image.jpg').
 * @returns The resolved image URL or the original path if it's external or absolute.
 */
async function resolveImagePath(
  postDir: string,
  imagePath: string,
): Promise<string> {
  // If it's an external URL or an absolute path starting with /, return it as-is.
  if (!imagePath || imagePath.startsWith('http') || imagePath.startsWith('/')) {
    return imagePath;
  }

  // Resolve relative paths like './image.jpg' or '../images/...'
  // Normalize the path by joining postDir and imagePath
  const parts = postDir.split('/');
  const imageParts = imagePath.split('/');

  for (const part of imageParts) {
    if (part === '.') continue;
    if (part === '..') {
      parts.pop();
    } else {
      parts.push(part);
    }
  }

  const resolvedPath = parts.join('/');
  const fetcher = allImages[resolvedPath];

  if (fetcher) {
    return (await fetcher()) as string;
  }

  return imagePath;
}

/**
 * Fetches and parses a specific post's markdown content.
 *
 * @param category - The directory name of the category (e.g., 'sports/handball' or 'others').
 * @param slug - The directory name of the post.
 * @returns A Post object.
 */
export async function getPost(category: string, slug: string): Promise<Post> {
  const postDir =
    category === 'others'
      ? `../content/others/${slug}`
      : category.includes('/')
        ? `../content/${category}/${slug}`
        : `../content/sports/${category}/${slug}`;

  const path = `${postDir}/index.md`;

  const fetcher = allPosts[path];

  if (!fetcher) {
    throw new Error(`Post not found: ${path}`);
  }

  const rawContent = (await fetcher()) as string;
  // @ts-expect-error front-matter return type
  const { attributes, body } = fm(rawContent);

  const attrs = attributes as FrontMatterAttributes;

  const [resolvedImage, resolvedImages] = await Promise.all([
    attrs.image
      ? resolveImagePath(postDir, attrs.image)
      : Promise.resolve(undefined),
    attrs.images
      ? Promise.all(attrs.images.map((img) => resolveImagePath(postDir, img)))
      : Promise.resolve(undefined),
  ]);

  return {
    slug,
    sport: category.split('/').pop() || category,
    ...attrs,
    image: resolvedImage,
    images: resolvedImages,
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
      // Path is like '../content/sports/handball/2025-torneio-calheta-beach-handball/index.md'
      const parts = path.split('/');
      const slug = parts[parts.length - 2];
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
