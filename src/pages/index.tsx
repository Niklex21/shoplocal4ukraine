import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="grid grid-cols-2 gap-4 place-content-center h-screen w-screen place-items-center">
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/join">
        <a>Join</a>
      </Link>
      <Link href="/privacy">
        <a>Privacy</a>
      </Link>
      <Link href="/businesses">
        <a>Businesses</a>
      </Link>
    </div>
  )
}

export default Home
