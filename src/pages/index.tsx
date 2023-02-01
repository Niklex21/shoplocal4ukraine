/* eslint-disable @next/next/no-html-link-for-pages */
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

import { LandingLayout } from "@layouts/landing";
import heroImage from "@public/images/map_screenshot.png"
import Image from "next/image"
import Link from "next/link"
import strings from "@utils/strings"
import { Autocomplete, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { BusinessCategory } from "@api/business/types";
import { businessCategoryConverter } from "@utils/converters";
import { CheckBoxOutlineBlank as IconCheckBoxOutlineBlank, CheckBox as IconCheckBox, Search as IconSearch } from '@mui/icons-material';
import { ButtonSecondary } from "@components/common/buttons";

const icon = <IconCheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <IconCheckBox fontSize="small" />;

const Home: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col w-full p-16 md:grid md:grid-cols-2 items-center gap-32">
      <div className="flex flex-col items-left">
        <text className="text-7xl font-bold leading-tight text-ukraine-blue">{ strings.landing.home.callPrimary }</text>
        <text className="text-2xl mt-8 max-w-lg">{ strings.landing.home.callSecondary }</text>
        <div className="mt-10 flex gap-4">
          <Link href="/businesses">
            <ButtonSecondary text={ strings.landing.home.discoverBusinesses } />
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Link href="/businesses">
          <Image
            src={ heroImage }
            alt="Map Preview"
            className="object-contain rounded-2xl cursor-pointer"
          />
        </Link>
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
