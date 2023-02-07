import defaults from "@utils/config"
import { ImageProps } from "next/image"
import { useState } from "react"
import Image from "next/image"

type ImageSrcType = ImageProps['src']

type Props = ImageProps & {
    fallbackImageSrc?: ImageSrcType
}

/**
 * A wrapper around next/image that also allows for default images that load on error.
 * 
 * This functions in the same way as the standard Image from next.js, adding only a single prop.
 * If the image wasn't loaded properly, this component will attempt to replace it with the supplied fallbackImage.
 * 
 * @param param0 
 * @returns 
 */
export default function ImageWithFallback({ fallbackImageSrc, src, alt, onError, ...props }: Props) {

    const [ imageSrc, setImageSrc ] = useState<ImageSrcType>(src)
    // whether or not the image has already errored, to prevent looping
    const [ errored, setErrored ] = useState<boolean>(false)

    let fallbackImage = fallbackImageSrc ?? defaults.businesses.gallery.defaultImage.src

    const handleError = () : void => {
        // if has already error before, return empty to avoid loops
        if (errored) return

        setErrored(true)
        setImageSrc(fallbackImage)
    }

    return (
        <Image
            src={ imageSrc }
            onError={ onError ?? handleError }
            alt={ alt }
            { ...props }
        />
    )
}