import { groq } from 'next-sanity'

// Get all posts with author and category data
export const postsQuery = groq`
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "author": author->{
      name,
      slug,
      image
    },
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    categories[]->{
      _id,
      title,
      slug
    },
    publishedAt,
    body
  }
`

// Get a single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    "author": author->{
      name,
      slug,
      image,
      bio
    },
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    categories[]->{
      _id,
      title,
      slug
    },
    publishedAt,
    body
  }
`

// Get all post slugs for static generation
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`
