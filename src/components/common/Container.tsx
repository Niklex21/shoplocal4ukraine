import { twMerge } from "tailwind-merge";

/**
 * Generic container component.
 * 
 * Note: can we replace an explicit className with implicit somehow?
 */
export default function Container({ className, children }: any) {
    return (
        <div className={ twMerge('w-full h-full flex flex-auto flex-wrap p-2', className) }>
            { children }
        </div>
    )
}
