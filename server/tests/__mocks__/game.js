
const mockGames = [
    { _id: '1', title: 'Test Game 1', category: '2' },
    { _id: '2', title: 'Test Game 2', category: '1' },
];

const mockGame = { _id: '1', title: 'Test Game', category: '2' };

const Game = {
    find: jest.fn().mockResolvedValue(mockGames),
    findOne: jest.fn().mockImplementation((filter) => {
        const game = mockGames.find(g => g.title === filter.title);
        return Promise.resolve(game);
    }),
    findById: jest.fn().mockImplementation((id) => {
        const game = mockGames.find(g => g._id === id);
        return Promise.resolve(game);
    }),
    findByIdAndUpdate: jest.fn().mockImplementation((id, update) => {
        const index = mockGames.findIndex(g => g._id === id);
        if (index !== -1) {
            mockGames[index] = { ...mockGames[index], ...update };
            return Promise.resolve(mockGames[index]);
        }
        return Promise.resolve(null);
    }),

};

module.exports = Game;
