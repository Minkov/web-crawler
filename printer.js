const { writeFile } = require('fs');

const print = (filePath, lines) => {
    const content = lines.join('\n');
    return new Promise((resolve, reject) => {
        writeFile(filePath, content, 'utf8', (err) => {
            if (err) {
                return reject(err);
            }

            return resolve();
        });
    });
};

module.exports = { print };