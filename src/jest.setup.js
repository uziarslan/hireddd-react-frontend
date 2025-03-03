console.log("jest.setup.js loaded");

window.matchMedia = window.matchMedia || function() {
return {
matches : false,
addListener : function() {},
removeListener: function() {}
};
};

if (typeof setImmediate === 'undefined') {
global.setImmediate = (cb) => setTimeout(cb, 0);
}
      
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });



  // if (typeof setImmediate === 'undefined') {
// global.setImmediate = (cb) => setTimeout(cb, 0);
// }
// window.matchMedia = window.matchMedia || function() {
//     return {
//     matches : false,
//     addListener : function() {},
//     removeListener: function() {}
//     };
//     };

// Object.defineProperty(window, "matchMedia", {
// writable: true,
// value: jest.fn().mockImplementation(query => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: jest.fn(), // deprecated
//     removeListener: jest.fn(), // deprecated
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
// })),
// });

// module.exports = {
//     verbose: true,
//     setupFilesAfterEnv: ["<rootDir>src/setupTests.ts"],
//     moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
//     moduleDirectories: ["node_modules", "src"],
//     moduleNameMapper: {
//       "\\.(css|less|scss)$": "identity-obj-proxy"
//     },
//     transform: {
//       '^.+\\.(ts|tsx)?$': 'ts-jest',
//       "^.+\\.(js|jsx)$": "babel-jest",
//       "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/file.js",
//     }
//   };