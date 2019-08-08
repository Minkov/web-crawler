const { get } = require('./http');
const { extractLinks } = require('./links-extractor');

const { print } = require('./printer');

const isInSoftUniOrg = (link) => {
    return link.startsWith('/')
        || link.startsWith('https://softuni.org')
        || link.startsWith('https://auth.softuni.org');
};

const getFullLink = (path) => {
    if(path.startsWith('https://auth.softuni.org') || path.startsWith('https://auth.softuni.org')) {
        return path;
    }
    return `https://softuni.org${path}`;
};

const run = async () => {
    const links = ['/'];
    const usedLinks = new Set();
    while(links.length > 0) {
        const link = links.pop();
        if (usedLinks.has(link)) {
            continue;
        }

        usedLinks.add(link);
        const fullLink = getFullLink(link);
        console.log(`Crawling ${fullLink}`);

        try {
            const html = await get(fullLink);
            const newLinks = (await extractLinks(html))
                .filter(isInSoftUniOrg);

            links.push(...newLinks);
        } catch (err) {
            console.log(`Failed on ${fullLink}`);
            // console.error(err);
        }
    }
    print('output.txt', [...usedLinks]);
};

run();