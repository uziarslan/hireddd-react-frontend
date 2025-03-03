module.exports = {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest",
    },
    // Transform modules like axios, react-slick, slick-carousel, and enquire.js
    transformIgnorePatterns: [
      "node_modules/(?!(@toolz/allow-react|axios|react-slick|slick-carousel|enquire.js)/)"
    ],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

    moduleNameMapper: {
      // Mock all CSS imports
      "\\.(css|scss)$": "identity-obj-proxy",
    },
  };

