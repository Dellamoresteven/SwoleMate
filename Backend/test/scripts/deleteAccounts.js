const app = require('../../app');
const Accounts = require('./Accounts.js');

Accounts.delete(20, "t@t", () => {
    process.exit(0);
});