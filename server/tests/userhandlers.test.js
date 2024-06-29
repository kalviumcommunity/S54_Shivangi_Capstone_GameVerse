const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { createUser, loginUser, getAllUsers, getUserById, updateUser } = require('../handlers/userHandlers');
const User = require('../models/user');

// Mock the User model
jest.mock('../models/user');

describe('User Handlers', () => {
    // Load environment variables before all tests
    beforeAll(() => {
        require('dotenv').config({ path: "./.env" });
    });

    // Clear mocks after each test to ensure clean state
    afterEach(() => {
        jest.clearAllMocks();
    });

    // 1. Test case for creating user when user already exists
    test('should not create user if user already exists', async () => {
        User.find.mockResolvedValue([{ username: 'testuser' }]);

        const req = {
            body: {
                username: 'testuser',
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'testpass'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createUser(req, res);

        // Assertions
        expect(User.find).toHaveBeenCalledWith({ $or: [{ username: 'testuser' }, { email: 'testuser@example.com' }] });
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'User already exists',
            data: expect.any(Array)
        }));
    });

    // 2. Test case for successful user login
    test('should login user', async () => {
        User.findOne.mockResolvedValue({ _id: '123', username: 'testuser', password: crypto.createHash('sha256').update('testpass').digest('hex') });

        const req = {
            body: {
                username: 'testuser',
                password: 'testpass'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await loginUser(req, res);

        // Assertions
        expect(User.findOne).toHaveBeenCalledWith({
            username: 'testuser',
            password: crypto.createHash('sha256').update('testpass').digest('hex')
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Login successful',
            token: expect.any(String)
        }));
    });

    // 3. Test case for user login with wrong credentials
    test('should not login user with wrong credentials', async () => {
        User.findOne.mockResolvedValue(null);

        const req = {
            body: {
                username: 'testuser',
                password: 'wrongpass'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await loginUser(req, res);

        // Assertions
        expect(User.findOne).toHaveBeenCalledWith({
            username: 'testuser',
            password: crypto.createHash('sha256').update('wrongpass').digest('hex')
        });
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Invalid username or password'
        }));
    });

    // 4. Test case for getting all users
    test('should get all users', async () => {
        User.find.mockResolvedValue([{ username: 'testuser' }]);

        const req = {};
        const res = {
            json: jest.fn()
        };

        await getAllUsers(req, res);

        // Assertions
        expect(User.find).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([{ username: 'testuser' }]);
    });

    // 5. Test case for getting one user by ID
    test('should get one user', async () => {
        User.findById.mockResolvedValue({ _id: '123', username: 'testuser', name: 'Test User', email: 'testuser@example.com' });

        const req = {
            params: { id: '123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getUserById(req, res);

        // Assertions
        expect(User.findById).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ _id: '123', username: 'testuser', name: 'Test User', email: 'testuser@example.com' });
    });
});
