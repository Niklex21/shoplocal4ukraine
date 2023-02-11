import { BusinessCategory, Tag } from "@api/business/types"
import { LocalCafe, Restaurant, ShoppingCart, SvgIconComponent } from "@mui/icons-material"
import { businessCategoryConverter, tagConverter } from "@utils/converters"
import strings from "@utils/strings"
import { useAtom } from "jotai"
import { createElement } from "react"
import { atomCurrentQuery, atomSelectedCategories, atomSelectedTags } from "src/atoms/businesses"
import { twMerge } from "tailwind-merge"

type Props = {
    className?: string
}

type QuickSearch = {
    text: string,
    action: () => void,
    icon?: SvgIconComponent
}

export function QuickSearches({ className }: Props) {

    const [ selectedCategories, setSelectedCategories ] = useAtom(atomSelectedCategories)
    const [ selectedTags, setSelectedTags ] = useAtom(atomSelectedTags)
    const [ currentQuery, setCurrentQuery ] = useAtom(atomCurrentQuery)

    const quickSearches : QuickSearch[] = [
        {
            text: strings.businesses.businessView.quickSearches.ukrainianOwned,
            action: () => {
                setCurrentQuery(tagConverter(Tag.UkrainianOwned))
                setSelectedTags([...selectedTags, Tag.UkrainianOwned])
            }
        },
        {
            text: strings.businesses.businessView.quickSearches.restaurants,
            icon: Restaurant,
            action: () => {
                setCurrentQuery(businessCategoryConverter(BusinessCategory.Restaurant))
                setSelectedCategories([...selectedCategories, BusinessCategory.Restaurant])
            }
        },
        {
            text: strings.businesses.businessView.quickSearches.cafe,
            icon: LocalCafe,
            action: () => {
                setCurrentQuery(businessCategoryConverter(BusinessCategory.Cafe))
                setSelectedCategories([...selectedCategories, BusinessCategory.Cafe])
            }
        },
        {
            text: strings.businesses.businessView.quickSearches.shopping,
            icon: ShoppingCart,
            action: () => {
                setCurrentQuery(businessCategoryConverter(BusinessCategory.Shopping))
                setSelectedCategories([...selectedCategories, BusinessCategory.Shopping])
            }
        }
    ]

    return (
        <div className={ twMerge("flex flex-row gap-2", className) }>
            {
                quickSearches.map(
                    ({ text, action, icon }, index) => (
                        <span className="flex px-4 gap-1 py-2 drop-shadow-md my-auto items-center cursor-pointer bg-white hover:brightness-95 text-oxford-blue text-sm rounded-full" onClick={ action } key={ index }>
                            { icon ? createElement(icon, { className: "text-sm"}) : (<></>) }
                            { text }
                        </span>
                    )
                )
            }
        </div>
    )
}
