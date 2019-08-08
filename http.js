const fetch = require('node-fetch');

const get = async (url) => {
    const response = await fetch(url);
    return response.text();
};

module.exports = { get };