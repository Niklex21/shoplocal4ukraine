import { twMerge } from "tailwind-merge";

export default function BusinessContainer({ className, children }: any) {
  return (
    <div className={ twMerge('flex flex-row flex-wrap gap-6 my-20 md:mx-auto px-1 md:px-12 justify-center md:justify-start', className) }>
      {children}
    </div>
  )
}
