import { twMerge } from "tailwind-merge";

export default function BusinessContainer({ className, children }: any) {
  return (
    <div className={ twMerge('grid md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 my-12 md:mx-auto px-1 md:px-12 items-center justify-center', className) }>
      {children}
    </div>
  )
}
