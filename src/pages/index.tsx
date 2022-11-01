/* eslint-disable @next/next/no-html-link-for-pages */
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

import { LandingLayout } from "@layouts/landing";

const Home: NextPageWithLayout = () => {
  return (
    <div className="">
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
