const mockUser = jest.fn();

mockUser.find = jest.fn().mockResolvedValue([]);
mockUser.findOne = jest.fn().mockResolvedValue(null);
mockUser.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

// Mock the save method to return the saved user object
mockUser.prototype.save = jest.fn().mockImplementation(function () {
    return Promise.resolve({
        username: this.username,
        name: this.name,
        email: this.email,
        password: this.password // Ensure to mock the hashed password here
    });
});

module.exports = mockUser;
