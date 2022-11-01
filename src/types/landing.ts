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


export type { Link }
export { Page }
