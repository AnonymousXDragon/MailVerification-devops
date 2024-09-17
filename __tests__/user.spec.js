const { user } = require('../src/database/models')

jest.mock("../src/database/models", () => ({
    user: {
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        save: jest.fn()
    }
}))

beforeAll(() => {
    console.log("starting user service tests")
})

afterAll(() => {
  jest.clearAllMocks()
  console.log("All Mocks fn's are cleared")
})

afterEach(() => {
    jest.resetAllMocks();
    console.log("finished reseting mocks")
})

describe("testing user service", () => {

    it("It should create a user", async () => {

        const mockUserData = {
            email: "arnold_shazni@universe.com",
            password: "arnold shazni",
            name: "arnold shazni",
            lastlogin: new Date(),
            isverfied: false,
            resetPasswordToken: 5432,
            resetPasswordExpiresAt: new Date(),
            verificationToken: 3452,
            verificationTokenExpiresAt: new Date()
        }

        user.create.mockResolvedValue({
            id: 1,
            ...mockUserData
        })

        const newUser = await user.create(mockUserData)

        expect(newUser).toEqual({
            id:1,
            email: "arnold_shazni@universe.com",
            password: "arnold shazni",
            name: "arnold shazni",
            lastlogin: mockUserData.lastlogin,
            isverfied: false,
            resetPasswordToken: 5432,
            resetPasswordExpiresAt: mockUserData.resetPasswordExpiresAt,
            verificationToken: 3452,
            verificationTokenExpiresAt: mockUserData.verificationTokenExpiresAt
        })

        expect(user.create).toHaveBeenCalledWith(mockUserData)
    })

    it("This should return a user with a unique email", async () => {
        const mockUserData = {
            email: "arnold_shazni@universe.com",
            password: "arnold shazni",
            name: "arnold shazni",
            lastlogin: new Date(),
            isverfied: false,
            resetPasswordToken: 5432,
            resetPasswordExpiresAt: new Date(),
            verificationToken: 3452,
            verificationTokenExpiresAt: new Date()
        }
        
        user.findOne.mockResolvedValue({
            id: 1,
            ...mockUserData
        })

        const userR = await user.findOne({ where: {
            email: mockUserData.email
        } })

        expect(userR.name).toBe("arnold shazni")
        expect(userR.isverfied).toBe(false)
        expect(userR.verificationToken).toBe(3452)
    })

    it("should update it with given payload", async () => {
        const email = "arnold_shazni@universe.com"
        const mockUserData = {
            isverfied : true,
            lastlogin: new Date()
        }

        user.update.mockResolvedValue({
            id: 1,
            ...mockUserData
        })

        const new_user = await user.update(mockUserData,{
            where: {
                email: email
            }
        });

        expect(new_user.isverfied).toBe(true)
        expect(new_user.lastlogin).toBe(mockUserData.lastlogin)
    })
})


describe("testing user controller", () => {

})