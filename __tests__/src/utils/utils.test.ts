import { isEmpty, urlShortener } from "@utils/utils"

/**
 * All the tests for {@link urlShortener}
 */
describe('urlShortener', () => {

    const tests : Array<{ name: string, initialURL: string, expectedURL: string }> = [
        {
            name: "should remove https://",
            initialURL: "https://example.com",
            expectedURL: "example.com"
        },
        {
            name: "should remove http://",
            initialURL: "http://example.com",
            expectedURL: "example.com"
        },
        {
            name: "should remove www.",
            initialURL: "www.example.com",
            expectedURL: "example.com"
        },
        {
            name: "should remove all https://, www., and http://",
            initialURL: "https://http://www.www.example.com",
            expectedURL: "example.com"
        },
        {
            name: "should remove the slashes at the end of a string",
            initialURL: "example.com///",
            expectedURL: "example.com"
        },
        {
            name: "should remove nothing",
            initialURL: "example.com",
            expectedURL: "example.com"
        },
    ]

    tests.forEach(
        ({ name, initialURL, expectedURL }) => {
            it(name, () => {
                expect(urlShortener(initialURL)).toBe(expectedURL)
            })
        }
    )

})

/**
 * All the tests for {@link isEmpty}
 */
describe('isEmpty', () => {

    it('should return true on an empty array (.keys undefined)', () => {
        expect(isEmpty([])).toBe(true)
    })

    it('should return true on a non-empty array (.keys undefined)', () => {
        expect(isEmpty(["hello", "there"])).toBe(true)
    })

    it('should return true on a en empty dictionary', () => {
        expect(isEmpty({})).toBe(true)
    })

    it('should return true on an empty string', () => {
        expect(isEmpty("")).toBe(true)
    })

    it('should return true on a non-empty string', () => {
        expect(isEmpty("hello")).toBe(true)
    })

    it('should return false on a non-empty dictionary', () => {
        expect(isEmpty({ "hello": "hello", 2: 1 })).toBe(false)
    })
    
})

