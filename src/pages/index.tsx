import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

import { LandingLayout } from "@layouts/landing";
import Link from "next/link";
import Image from "next/image";

import flag from '@public/flag.jpg'

const Home: NextPageWithLayout = () => {
  return (
    <div className="w-full h-full grid grid-cols-2 text-ukraine-blue font-bold">
      <Image
        alt="Ukraine"
        className="w-full h-full"
        src={ flag }
      />
      <div className="flex flex-wrap flex-col h-full w-full p-4 text-center justify-center">
        <h1 className="text-4xl">This page is in development!</h1>
        {/* // eslint-disable-next-line @next/next/no-html-link-for-pages */}
        {/* TODO: we have to use a instead of Link tag here because switching different layouts breaks Tailwind styles for some reason :| */}
        <div className="text-2xl mt-4">To see the current app go <span className="hover:underline"><a href="/businesses">here</a></span>.</div>
      </div>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <LandingLayout>
      { page }
    </LandingLayout>
  )
}

export default Home
