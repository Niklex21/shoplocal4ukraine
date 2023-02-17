enum Page {
  None,
  About,
  Privacy,
  Join,
  HowToSupport,
  Blog
}

type Link = {
  text: string,
  link: string,
  page?: Page,
  targetBlank?: boolean
}

type Person = {
  name: string,
  profilePictureURL: string,
  role: string,
  description: string,
  gifURL: string,
  website?: string,
  email?: string,
  linkedin?: string,
  instagram?: string,
  behance?: string,
  github?: string
}

export type { Link, Person }
export { Page }
