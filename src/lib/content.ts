// @author HarryVasanth (https://github.com/harryvasanth)

/**
 * Assets representation for an image in both thumbnail and full resolutions.
 */
export type ImageAssets = {
  thumbnail: string
  full: string
}

/**
 * Represents a content post, typically from a Markdown file.
 */
export type Post = {
  slug: string
  title: string
  date: string
  image?: ImageAssets
  description: string
  images?: ImageAssets[]
  content: string // Pre-compiled HTML content
  sport: string
}

/**
 * Front matter attributes extracted from Markdown.
 */
type FrontMatterAttributes = {
  title: string
  date: string
  image?: string
  description: string
  images?: string[]
}

/**
 * Dynamically import all Markdown posts from the content directory.
 */
const allPosts = import.meta.glob('../content/**/index.md')

/**
 * Import all images with specific transformation for grid display (thumbnails).
 */
const gridImages = import.meta.glob(
  '../content/**/*.{jpg,jpeg,png,webp,avif}',
  {
    query: { format: 'webp', w: '400', h: '400', fit: 'cover', quality: '80' },
    import: 'default',
  },
)

/**
 * Import all images with high resolution for lightbox display.
 */
const lightboxImages = import.meta.glob(
  '../content/**/*.{jpg,jpeg,png,webp,avif}',
  {
    query: { format: 'webp', w: '1600', quality: '90' },
    import: 'default',
  },
)

/**
 * Resolves a relative image path from a Markdown file to its processed asset URLs.
 *
 * @param postDir The directory of the post being processed.
 * @param imagePath The relative path to the image file.
 * @returns A promise resolving to an ImageAssets object.
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
 * Retrieves all posts for a specific sport, sorted by date.
 */
export async function getSportPosts(sport: string): Promise<Post[]> {
  try {
    const sportPrefix =
      sport === 'others' ? `../content/others/` : `../content/sports/${sport}/`
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
