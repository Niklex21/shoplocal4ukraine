import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

import { LandingLayout } from "@layouts/landing";

const Home: NextPageWithLayout = () => {
  return (
    <>
      Main Page
    </>
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
