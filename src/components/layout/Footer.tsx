import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex w-full bg-background-inverted justify-between p-4">
            <Link href="/">
                <a className="text-lg font-medium text-text-inverted opacity-70 hover:opacity-100">Logo</a>
            </Link>
            <Link href="mailto:shoplocal4ukraine@gmail.com">
                <a className="text-lg font-medium text-text-inverted opacity-70 hover:opacity-100">shoplocal4ukraine@gmail.com</a>
            </Link>
        </footer>
    )
}