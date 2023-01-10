module.exports = {
    clearMocks: true,
    preset: 'js-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/models/prisma/singleton.js'],
}