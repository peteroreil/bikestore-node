'use strict'

const path = require('path');
const fs = require('fs');
const util = require('util');

const Jimp = require('jimp');

const writeFile = util.promisify(fs.writeFile);
const targetDir = path.join(__dirname, '../public/pics')

function ImageWriter() {
    this.createFilenames = function(name, format) {
        const _name = name.replace(/ /g, '_');
        const thumbnail = `${_name}_thumbnail.${format}`;
        const picture = `${_name}.${format}`;
        return { picture, thumbnail };
    }

    function writeFilePromise(filepath, base64Data) {
        return writeFile(filepath, base64Data, {encoding: 'base64'});
    }

    function writeThumbnail(filepath, thumbnail) {
        return Jimp.read(filepath)
            .then(file => file.resize(98, 65))
            .then(file => file.write(thumbnail));
    }

    this.writeImages = function(base64image, filenames) {
        const picture = path.join(targetDir, filenames.picture);
        const thumbnail = path.join(targetDir, filenames.thumbnail);
        const base64Data = base64image.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        writeFilePromise(picture, base64Data)
            .then(() => writeThumbnail(picture, thumbnail))
            .catch((e) => console.log(e));
    }
}

module.exports = ImageWriter;
