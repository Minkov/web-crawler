const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const extractLinks = (html) => {
    return new Promise((resolve, reject) => {
        const dom = new JSDOM(html);
        const { window } = dom;
        var $ = require("jquery")(window);
        const links = $('a').toArray()
            .map(a => a.href)
            .reduce((set, link) => set.add(link), new Set());
        resolve([...links]);
    });
};

module.exports = { extractLinks };
