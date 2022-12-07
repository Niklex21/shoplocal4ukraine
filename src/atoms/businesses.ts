import { BusinessCategory, BusinessModel, Tag } from "@api/business/types";
import { MapDragState, SearchedSerializedBusiness, SerializedBusinessModel, Views } from "@appTypes/businesses";
import { atom } from "jotai";
import Fuse from "fuse.js"
import { atomWithHash } from "jotai/utils";
import { findBusinessById, serializeBusinessModel, serializedToSearchSerialized } from "@utils/utils";
import { LOCAL_STORAGE_KEYS } from "@utils/config";

const timeAtom = atom<string>("")

/**
 * Stores the view settings for the business viewer.
 */
const atomView = atomWithHash(LOCAL_STORAGE_KEYS.atomView, Views.Gallery, { delayInit: true })

/**
 * Stores whether or not the map is being moved right now.
 */
const atomMapDragState = atom<MapDragState>(MapDragState.Off)

/**
 * Stores the currently selected business ID.
 * Note: delayInit has to be true to avoid problems with hydration (https://github.com/pmndrs/jotai/issues/739#issuecomment-929260696)
 */
const atomSelectedBusinessID = atomWithHash<string>(LOCAL_STORAGE_KEYS.atomBusinessId, "", { delayInit: true })

/**
 * Stores the current search query in the search bar in the main businesses view.
 */
const atomSearchQuery = atomWithHash<string>(LOCAL_STORAGE_KEYS.atomSearch, "", { delayInit: true })

/**
 * Stores the selected categories that filter the businesses.
 */
const atomSelectedCategories = atomWithHash<Array<BusinessCategory>>(LOCAL_STORAGE_KEYS.atomCategories, [], { delayInit: true })

/**
 * Stores the selected tags that filter the business.
 */
const atomSelectedTags = atomWithHash<Array<Tag>>(LOCAL_STORAGE_KEYS.atomTags, [], { delayInit: true })

/**
 * Stores all the businesses currently available, should only be modified once.
 */
const atomAllBusinesses = atom<Array<BusinessModel>>([])

/**
 * A read-only item that stores the currently selected business.
 */
const atomCurrentBusiness = atom<SerializedBusinessModel>(
    (get) => serializeBusinessModel(
        findBusinessById(
            get(atomAllBusinesses),
            get(atomSelectedBusinessID)
        )
    )
)

/**
 * A read-only atom that stores businesses that are filtered according to the currently selected categories
 */
const atomFilteredBusinesses = atom<Array<BusinessModel>>(
    (get) => {
        let target = get(atomAllBusinesses)

        if (get(atomSelectedCategories).length > 0) {
            target = target.filter((b: BusinessModel) => get(atomSelectedCategories).includes(b.businessCategory))
        }

        if (get(atomSelectedTags).length > 0) {
            target = target.filter((b: BusinessModel) => get(atomSelectedTags).filter(t => b.tags.includes(t)).length > 0)
        }

        return target
    }
)

/**
 * A read-only atom that stores the FuseSearch object derived from current filtered businesses.
 */
const atomFuseSearch = atom<Fuse<SerializedBusinessModel>>(
    (get) => new Fuse<SerializedBusinessModel>(
        get(atomFilteredBusinesses).map(
            (b: BusinessModel) => serializeBusinessModel(b)
        ),
        {
            includeScore: true,
            keys: [
                'name',
                'serializedBusinessCategory',
                'serializedTags',
                'location.address',
                'location.city',
                'location.country',
                'description',
                'contributions'
            ]
        }
    )
)

/**
 * A read-only atom that stores the businesses with the search query applied on.
 */
const atomSearchedBusinesses = atom<Array<SearchedSerializedBusiness>>(
    (get) => {
        return get(atomSearchQuery) === ""
            ? get(atomFilteredBusinesses).map(b => serializedToSearchSerialized(serializeBusinessModel(b)))
            : get(atomFuseSearch).search(get(atomSearchQuery))
    }
)

export {
    timeAtom,
    atomView,
    atomMapDragState,
    atomSelectedBusinessID,
    atomSearchQuery,
    atomSelectedCategories,
    atomSelectedTags,
    atomAllBusinesses,
    atomFilteredBusinesses,
    atomFuseSearch,
    atomSearchedBusinesses,
    atomCurrentBusiness
}
