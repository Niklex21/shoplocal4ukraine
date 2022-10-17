import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-4 bg-white rounded-lg shadow md:px-6 dark:bg-gray-900">
        <hr className="border-gray-200 sm:mx-auto dark:border-gray-700 mb-2" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2022 <Link href="/" className="hover:underline">ShopLocal4Ukraine</Link>. All Rights Reserved.
        </span>
    </footer>
  );
}
