// This contains a variety of different model-to-text converter functions.

import { Tag, BusinessCategory } from "@api/business/types";
import { ErrorType, processError } from "@api/_error";
import { Views } from "@appTypes/businesses";
import strings from "./strings";

/**
 * Converts a given business category into the appropriate text string.
 * @param category the business category
 */
export function businessCategoryConverter(category: BusinessCategory) : string {
    switch (category) {
        case BusinessCategory.Crafts:
            return strings.businesses.categories.crafts;
        case BusinessCategory.Restaurant:
            return strings.businesses.categories.restaurant;
        case BusinessCategory.Lifestyle:
            return strings.businesses.categories.lifestyle;
        case BusinessCategory.Cafe:
            return strings.businesses.categories.cafe;
        case BusinessCategory.Services:
            return strings.businesses.categories.services;
        case BusinessCategory.Groceries:
            return strings.businesses.categories.groceries;
        case BusinessCategory.Shopping:
            return strings.businesses.categories.shopping;
        case BusinessCategory.Product:
            return strings.businesses.categories.product;
        default:
            processError(ErrorType.InvalidBusinessCategory, `Business category provided: ${ category }`);
            return "Invalid"
    }
}

/**
 * Converts a given tag category into the appropriate text string.
 * @param tag the tag category
 */
export function tagConverter(tag: Tag) : string {
    switch (tag) {
        case Tag.UkrainianOwned:
            return strings.businesses.tag.ukrainianOwned;
        case Tag.OnlineOnly:
            return strings.businesses.tag.onlineOnly;
        default:
            processError(ErrorType.InvalidTag, `Tag category provided: ${ tag }`);
            return "Invalid"
    }
}

/**
 * Converts a given business view category into the appropriate text string.
 * @param view the view type
 */
export function businessViewConverter(view: Views) : string {
    switch(view) {
        case Views.Gallery:
            return strings.businesses.businessView.titleViewGallery;
        case Views.Map:
            return strings.businesses.businessView.titleViewMap;
        default:
            processError(ErrorType.InvalidBusinessView, `BusinessView provided: ${ view }`);
            return "Invalid"
    }
}
