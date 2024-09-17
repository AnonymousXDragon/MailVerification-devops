

beforeAll(() => {
    console.log("before...")
})

afterAll(() => {
    console.log("After...")
})

beforeEach(() => {
    console.log("before each ...")
})

afterEach(() => {
    console.log("after each ...")
})

function dictionary(s) {
    if ( s === '') {
        return {}
    }
    return s
}

describe('dictionary', () => {

    test('should return an empty dictionary', () => { 
        expect(dictionary('')).toEqual({})
    })

    test('should return an object', () => {
        expect({ 'name': 'arnold shazni' }).toEqual({'name': 'arnold shazni'})
    })
})