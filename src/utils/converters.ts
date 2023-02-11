// This contains a variety of different model-to-text converter functions.

import { Tag, BusinessCategory } from "@api/business/types";
import { FeedbackCategory } from "@api/reports/feedback/types";
import { ErrorType, processError } from "@api/_error";
import { AutocompleteSuggestionCategory, Views } from "@appTypes/businesses";
import { Category, Label, Place, SvgIconComponent } from "@mui/icons-material";
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

/**
 * Converts a given feedback category into the appropriate text string.
 * @param category a feedback category
 * @returns the category as a string
 */
export function feedbackCategoryConverter(category: FeedbackCategory) : string {
    switch(category) {
        case FeedbackCategory.Bug:
            return strings.app.feedbackReport.bug;
        case FeedbackCategory.Suggestion:
            return strings.app.feedbackReport.suggestion;
        default:
            processError(ErrorType.InvalidFeedbackCategory, `Feedback category provided: ${ category }`)
            return "Invalid"
    }
}

/**
 * Returns a category-appropriate icon based on the autocomplete suggestion supplied.
 * @param category an autocomplete suggestion category
 * @returns an instance of an icon to represent the category
 */
export function getAutocompleteCategoryIcon(category: AutocompleteSuggestionCategory) : SvgIconComponent {
    switch(category) {
        case AutocompleteSuggestionCategory.Business:
            return Place;
        case AutocompleteSuggestionCategory.Category:
            return Category;
        case AutocompleteSuggestionCategory.Tag:
            return Label;
    }
}
