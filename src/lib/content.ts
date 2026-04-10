// src/lib/content.ts

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
  content: string // This is now pre-compiled HTML!
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
 * Notice we REMOVED the `?raw` query! Vite-plugin-markdown will process these.
 */
const allPosts = import.meta.glob('../content/**/index.md')

// Dual-Res Image generators
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

  // Vite-plugin-markdown exports `attributes` and `html` natively!
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
    content: compiledHTML, // Passing the static HTML
  }
}

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

    // OPTIMIZATION: Avoid costly Date parsing on every comparison cycle.
    // Uses efficient string locale comparison (assumes YYYY-MM-DD front-matter format)
    return results.sort((a, b) => b.date.localeCompare(a.date))
  } catch (error) {
    console.error(`Error discovering posts for ${sport}:`, error)
    return []
  }
}
