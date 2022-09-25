import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
 
export default function Footer() {
  return (
<footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900 mt-20">
    <div className="sm:flex sm:items-center sm:justify-between">
        <a href="/" className="flex items-center mb-4 sm:mb-0">
            {/* <img src="https://i.ytimg.com/vi/5C86GUmftJM/maxresdefault.jpg" className="mr-3 h-8" alt="Flowbite Logo" /> */}
            <span className="self-center text-lg lg:text-2xl font-semibold whitespace-nowrap dark:text-white">ShopLocal4Ukraine</span>
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
                <span className="mr-4 font-semibold md:mr-6 ">Creators:</span>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/alex-nikanov/" className="mr-4 hover:underline md:mr-6">Alex Nikanov</a>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/long-artem-dinh/" className="mr-4 hover:underline md:mr-6 ">Artem Dinh</a>
            </li>
        </ul>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="/" className="hover:underline">ShopLocal4Ukraine</a>. All Rights Reserved.
    </span>
</footer>
  );
}