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

const icon = <IconCheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <IconCheckBox fontSize="small" />;

const Home: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col w-full p-16 md:grid md:grid-cols-2 items-center gap-32">
      <div className="flex flex-col items-left">
        <text className="text-7xl font-bold leading-tight text-ukraine-blue">{ strings.landing.home.callPrimary }</text>
        <text className="text-2xl mt-8 max-w-lg">{ strings.landing.home.callSecondary }</text>
        <div className="mt-10 flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <Autocomplete
              options={ Object.values(BusinessCategory).filter((category) => typeof category !== "string") as Array<BusinessCategory> }
              multiple
              disableCloseOnSelect
              getOptionLabel={(option) => businessCategoryConverter(option)}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    className="mr-2"
                    checked={selected}
                  />
                  { businessCategoryConverter(option) }
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label={ strings.landing.home.categoriesLabel } />
              )}
              className="w-1/3"
              limitTags={ 1 }
            />
            <FormControlLabel
              value="ukrainianOwned"
              control={<Checkbox />}
              label={ strings.landing.home.onlyUkrainianOwnedLabel }
              labelPlacement="start"
            />
          </div>
          <div className="flex flex-row">
            <TextField className="w-3/4" label={ strings.landing.home.locationFieldLabel } />
            <Button variant="outlined" className="border-ukraine-yellow" startIcon={ <IconSearch /> }>{ strings.landing.home.searchButtonLabel }</Button>
          </div>
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
