enum Page {
  None,
  About,
  Privacy,
  Join
}

type Link = {
  text: string,
  link: string,
  page?: Page
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
  instagram?: string
}

export type { Link, Person }
export { Page }
