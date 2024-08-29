import { getUserByIdHandler } from "../handlers/users.mjs";

const mockRequest = {
    findUserIndex: 1
};

const mockResponse = {
    sendStatus: jest.fn(),
    send: jest.fn()
};

describe('get users', ()=>{
    it('should get user by id', ()=>{
        getUserByIdHandler(mockRequest, mockResponse);
        expect(mockResponse.send).toHaveBeenCalled();
        expect(mockResponse.send).toHaveBeenCalledWith({
            id: 2,
            username:'chandan',
            displayName: 'CHANDAN',
            password:"hello124"
        });
        expect(mockResponse.send).toHaveBeenCalledTimes(1);
    })

    it("should call status 404 if user not found", ()=>{
        const copyMockRequest = { ...mockRequest, findUserIndex:100};
        getUserByIdHandler(copyMockRequest,mockResponse);
        expect(mockResponse.sendStatus).toHaveBeenCalled();
        expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
        expect(mockResponse.sendStatus).toHaveBeenCalledTimes(1);
        expect(mockResponse.send).not.toHaveBeenCalled();
    })
})