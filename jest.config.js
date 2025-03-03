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

module.exports = {
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>src/setupTests.ts"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  },
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/file.js",
  }
};