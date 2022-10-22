// This contains a variety of different model-to-text converter functions.

import { AffiliationType, BusinessCategory } from "@api/business/types";
import { ErrorType, processError } from "@api/_error";
import { Views } from "src/pages/businesses";
import strings from "./strings";

/**
 * Converts a given business category into the appropriate text string.
 * @param category the business category
 */
export function businessCategoryConverter(category: BusinessCategory) : string {
    switch (category) {
        case BusinessCategory.Crafts:
            return strings.businesses.categories.crafts;
        case BusinessCategory.Dining:
            return strings.businesses.categories.dining;
        case BusinessCategory.LifeStyle:
            return strings.businesses.categories.lifestyle;
        case BusinessCategory.Retail:
            return strings.businesses.categories.retail;
        case BusinessCategory.Services:
            return strings.businesses.categories.services;
        default:
            processError(ErrorType.InvalidBusinessCategory, `Business category provided: ${ category }`);
            return "Invalid"
    }
}

/**
 * Converts a given affiliation category into the appropriate text string.
 * @param affiliation the affiliation category
 */
export function affiliationCategoryConverter(affiliation: AffiliationType) : string {
    switch (affiliation) {
        case AffiliationType.UkraineSupporters:
            return strings.businesses.affiliation.ukraineSupporters;
        case AffiliationType.UkrainianOwned:
            return strings.businesses.affiliation.ukrainianOwned;
        default:
            processError(ErrorType.InvalidAffiliationType, `Affiliation category provided: ${ affiliation }`);
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