export interface ImageAssets {
  thumbnail: string
  full: string
}

export interface Post {
  slug: string
  title: string
  date: string
  image?: ImageAssets
  description: string
  images?: ImageAssets[]
  content: string // Pre-compiled HTML from Markdown
  sport: string
}

interface FrontMatterAttributes {
  title: string
  date: string
  image?: string
  description: string
  images?: string[]
}

/**
 * Global content discovery using Vite's import.meta.glob.
 * Processes all Markdown files within the content directory.
 *
 * @author Harry Vasanth (harryvasanth.com)
 * @copyright (c) 2026
 */
const allPosts = import.meta.glob('../content/**/index.md')

/**
 * Dual-Res Image generators.
 * Uses vite-imagetools to generate optimized thumbnails and lightbox images.
 */
const gridImages = import.meta.glob(
  '../content/**/*.{jpg,jpeg,png,webp,avif}',
  {
    query: { format: 'webp', w: '400', h: '400', fit: 'cover', quality: '80' },
    import: 'default',
  },
)

const lightboxImages = import.meta.glob(
  '../content/**/*.{jpg,jpeg,png,webp,avif}',
  {
    query: { format: 'webp', w: '1600', quality: '90' },
    import: 'default',
  },
)

/**
 * Resolves a relative image path from a post directory into optimized asset URLs.
 * Handles local paths, absolute paths, and external URLs.
 *
 * @param postDir - The directory path of the post.
 * @param imagePath - The path to the image as defined in front-matter.
 * @returns Promise<ImageAssets> - Object containing optimized thumbnail and full URLs.
 */
async function resolveImagePath(
  postDir: string,
  imagePath: string,
): Promise<ImageAssets> {
  if (!imagePath || imagePath.startsWith('http') || imagePath.startsWith('/')) {
    return { thumbnail: imagePath, full: imagePath }
  }

  const parts = postDir.split('/')
  const imageParts = imagePath.split('/')

  for (const part of imageParts) {
    if (part === '.') continue
    if (part === '..') {
      parts.pop()
    } else {
      parts.push(part)
    }
  }

  const resolvedPath = parts.join('/')

  const fetchThumbnail = gridImages[resolvedPath]
  const fetchFull = lightboxImages[resolvedPath]

  if (fetchThumbnail && fetchFull) {
    const [thumbnailUrl, fullUrl] = await Promise.all([
      fetchThumbnail(),
      fetchFull(),
    ])
    return {
      thumbnail: thumbnailUrl as string,
      full: fullUrl as string,
    }
  }

  return { thumbnail: imagePath, full: imagePath }
}

/**
 * Fetches and processes a single post by category and slug.
 *
 * @param category - The sport category or 'others'.
 * @param slug - The unique slug for the post.
 * @returns Promise<Post> - The processed post object.
 */
export async function getPost(category: string, slug: string): Promise<Post> {
  const postDir =
    category === 'others'
      ? `../content/others/${slug}`
      : category.includes('/')
        ? `../content/${category}/${slug}`
        : `../content/sports/${category}/${slug}`

  const path = `${postDir}/index.md`
  const fetcher = allPosts[path]

  if (!fetcher) throw new Error(`Post not found: ${path}`)

  const module = (await fetcher()) as {
    attributes: FrontMatterAttributes
    html: string
  }

  const attrs = module.attributes
  const compiledHTML = module.html

  const [resolvedImage, resolvedImages] = await Promise.all([
    attrs.image
      ? resolveImagePath(postDir, attrs.image)
      : Promise.resolve(undefined),
    attrs.images
      ? Promise.all(attrs.images.map(img => resolveImagePath(postDir, img)))
      : Promise.resolve(undefined),
  ])

  return {
    slug,
    sport: category.split('/').pop() || category,
    ...attrs,
    image: resolvedImage,
    images: resolvedImages,
    content: compiledHTML,
  }
}

/**
 * Fetches all posts for a specific sport category.
 * Posts are sorted by date in descending order.
 *
 * @param sport - The sport category slug.
 * @returns Promise<Post[]> - Array of processed posts.
 */
export async function getSportPosts(sport: string): Promise<Post[]> {
  try {
    const sportPrefix =
      sport === 'others' ? '../content/others/' : `../content/sports/${sport}/`
    const sportPosts = Object.keys(allPosts).filter(path =>
      path.startsWith(sportPrefix),
    )

    const postPromises = sportPosts.map(async path => {
      const parts = path.split('/')
      const slug = parts[parts.length - 2]
      return getPost(sport === 'others' ? 'others' : sport, slug)
    })

    const results = await Promise.all(postPromises)

    return results.sort((a, b) => b.date.localeCompare(a.date))
  } catch (error) {
    console.error(`Error discovering posts for ${sport}:`, error)
    return []
  }
}
