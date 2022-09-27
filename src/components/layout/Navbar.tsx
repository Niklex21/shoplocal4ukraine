import { useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
 
export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="#" className="flex items-center">
          Pages
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="#" className="flex items-center">
          Account
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="#" className="flex items-center">
          Blocks
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="#" className="flex items-center">
          Docs
        </Link>
      </Typography>
    </ul>
  );
 
  return (
    <Navbar fullWidth={true} className="min-w-full py-2 px-4 lg:px-8 lg:py-4 mb-20">
      <div className="w-full flex items-center justify-between text-blue-gray-900">
        <span className="self-center text-sm sm:text-md md:text-xl lg:text-2xl font-semibold whitespace-nowrap dark:text-white">ShopLocal4Ukraine</span>
        {/* <div className="hidden lg:block">{navList}</div> */}
        <Button variant="gradient" size="sm" className="" >
          <Link href="https://airtable.com/shrWIgk68QyqEcqCS" target="_blank" className="text-xs sm:text-md">Add your business</Link>
        </Button>
        {/* <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
          </IconButton>*/}
      </div>
       {/* <MobileNav open={openNav}>
         {navList}
         <Button variant="gradient" size="sm" fullWidth className="mb-2">
           <span>Buy Now</span>
         </Button>
       </MobileNav> */}
    </Navbar>
  );
}