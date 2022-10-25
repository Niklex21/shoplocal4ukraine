import {processError, ErrorType } from "@api/_error";
import { BusinessCategory, Tag, Country, BusinessModel, MapBusinessJSON, Location } from "./types";


/**
 * Converts a given string Business Category value into one of the {@link BusinessCategory} options.
 * @param value an Airtable Business Category
 * @returns null if the value is invalid, one of the {@link BusinessCategory} options otherwise
 */
function businessCategoryConverter(value: string) : BusinessCategory | null {
    let category : BusinessCategory;

    switch (value) {
        case 'Restaurant':
            category = BusinessCategory.Restaurant;
            break;
        case 'Lifestyle':
            category = BusinessCategory.Lifestyle;
            break;
        case 'Retail':
            category = BusinessCategory.Retail;
            break;
        case 'Crafts':
            category = BusinessCategory.Crafts;
            break;
        case 'Services':
            category = BusinessCategory.Services;
            break;
        case 'Groceries':
            category = BusinessCategory.Groceries;
            break;
        case 'Shopping':
            category = BusinessCategory.Shopping;
            break;
        default:
            processError(ErrorType.InvalidBusinessCategory, `Category provided: ${ value }`);
            return null;
    }

    return category;
}

/**
 * Converts a given string Tags value into one of the {@link Tag} options.
 * @param values an Airtable Tags Type
 * @returns an array of {@link Tag} options
 */
function tagsConverter(values: Array<string>) : Array<Tag> {
    let tags : Array<Tag> = [];

    values.forEach((tag) => {
        switch(tag) {
            case 'Ukrainian-Owned':
                tags.push(Tag.UkrainianOwned);
                break;
            default:
                processError(ErrorType.InvalidTag, `Tag supplied: ${ tag }`);
                break;
        }
    })
    
    return tags;
}

/**
 * Converts a given string country into the appropriate {@link Country} enum.
 * @param country country string
 * @returns null if the country is invalid per {@link Country}, otherwise the country with the appropriate type
 */
function countryConverter(country: string) : Country | null {
    switch (country) {
        case 'USA':
            return Country.USA;
        default:
            processError(ErrorType.InvalidCountry, `Country provided: ${ country }`);
            return null;
    }
}

/**
 * Converts location string attributes to {@link Location}.
 * 
 * @param googleMapsURL comes from ['Google Maps URL'] Airtable field
 * @param address comes from ['Address'] field
 * @param city comes from ['City/town'] field
 * @param country comes from ['Country'] field
 * @param longitude comes from ['Longitude'] field
 * @param latitude comes from ['Latitude'] field
 * @returns a location fieldsect
 */
function locationConverter({ googleMapsURL, address, city, country, longitude, latitude }: any) : Location {
    let location : Location = {} as Location;

    if (googleMapsURL) {
        location.googleMapsURL = googleMapsURL;
    }

    if (address) {
        location.address = address;
    }

    if (city) {
        location.city = city;
    }

    if (country && countryConverter(country)) {
        location.country = countryConverter(country) as Country;
    }

    if (longitude) {
        location.longitude = parseFloat(longitude); 
    }

    if (latitude) {
        location.latitude = parseFloat(latitude);
    }

    return location;
}

/**
 * Converts an array of Airtable images to an array of image urls acceptable by the {@link BusinessModel}.
 * @param images an array of Airtable images
 * @returns an array of image URLs
 */
function imagesConverter(images: Array<any>): Array<String> {
    return images.map((img: any) => img['url'])
}

/**
 * Processes raw JSON data from Airtable and returns a {@link BusinessModel} object.
 * 
 * @param data the raw JSON data from the Airtable
 * @returns the data as a {@link BusinessModel} object
 */
export function jsonToBusiness(data: any) : BusinessModel {
    let business : BusinessModel = {} as BusinessModel;

    business.id = data['id']

    const fields = data['fields'];

    const jsonToBusinessMap : Array<MapBusinessJSON> = [
        {
            key: 'name',
            json: 'Name'
        },
        {
            key: 'description',
            json: 'Description'
        },
        {
            key: 'businessCategory',
            json: 'Business category',
            converter: businessCategoryConverter
        },
        {
            key: 'tags',
            json: 'Tags',
            converter: tagsConverter
        },
        {
            key: 'website',
            json: 'Website'
        },
        {
            key: 'email',
            json: 'Email'
        },
        {
            key: 'phone',
            json: 'Phone number'
        },
        {
            key: 'socialMedia',
            json: 'Primary social media / Linktree (optional)'
        },
        {
            key: 'images',
            json: 'Images',
            converter: imagesConverter
        }
    ]

    business.tags = []
    business.images = []

    jsonToBusinessMap.forEach(({ key, json, converter }) => {
        if (json in fields) {
            business[key] = (converter && converter(fields[json]) !== null) ? converter(fields[json]) : fields[json];
        }
    })

    business.location = locationConverter({
        googleMapsURL: fields['Google Maps URL'],
        address: fields['Address'],
        city: fields['City/town'],
        country: fields['Country'],
        latitude: fields['Latitude'],
        longitude: fields['Longitude']
    });

    return business;
}