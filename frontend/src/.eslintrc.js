module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: 'airbnb-base',
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'no-console': 'off', // Allow console.log statements
        'no-underscore-dangle': 'off', // Allow dangling underscores in identifiers
        'linebreak-style': 'off', // Disable linebreak style checking (useful for Windows)
    },
};
