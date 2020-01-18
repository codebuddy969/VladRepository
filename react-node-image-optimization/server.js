const express = require('express');
const app = express();
const fs = require('fs');
const host_listen = "0.0.0.0";
const host = "io.usalinksystem.net";
const port = process.env.PORT || 4000;
const zipFolder = require('zip-a-folder');
const imagemin = require('imagemin');
const fsExtra = require('fs-extra');
const path = require('path');
const glob = require('glob');
const cron = require("node-cron");

let destination_folder;
const jpegoptim = require('imagemin-jpegoptim');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const sharp = require('sharp');

var multer = require('multer');

cron.schedule("0 17 * * 1-5", function () {
    if (!fs.existsSync(`archives`)) {
        fs.mkdirSync(`archives`);
    }
    fsExtra.emptyDirSync('archives');
    fsExtra.emptyDirSync('public/api_images');
});

app.listen(port, host_listen, () => console.log(`Listening on port ${port}`));

app.use('/static', express.static('public'));
app.use('/archives', express.static('archives'));

app.use('*/public/api_images',express.static('public/api_images'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    express.urlencoded({extended: true});
    express.json();
    fsExtra.ensureDirSync(`public/temp`);
    next();
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, destination_folder)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage,
    limits: {
        files: 5
    },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    }
}).array('uploads[]', 5);

app.post('/express_backend', function (req, res) {
    destination_folder = 'public/temp';
    upload(req, res, function (err) {
        if (err) {
            res.status(400).send({response: err.message}).end();
        } else {
            let globPromise = [];
            const date = new Date();
            const max_width = 2000;
            const microtime = date.getTime();
            const PNGImages = 'public/temp/*.png';
            const JPEGImages = 'public/temp/*.{jpg,jpeg}';
            const WEBPImages = 'public/temp/*.webp';
            const destination = `public/${microtime}`;

            const formatJpeg = req.body.formatJpeg;
            const formatPng = req.body.formatPng;
            const formatWebp = req.body.formatWebp;
            const smallSize = req.body.smallSize;
            const mediumSize = req.body.mediumSize;
            const largeSize = req.body.largeSize;

            fsExtra.emptyDirSync(`public`);

            !fs.existsSync(`public/${microtime}`) ? fs.mkdirSync(`public/${microtime}`) : false;
            !fs.existsSync(`archives`) ? fs.mkdirSync(`archives`) : false;

            async function asyncLoop(array, callback) {
                for (let index = 0; index < array.length; index++) {
                    await callback(array[index], index, array);
                }
            }

            globPromise.push(new Promise((resolveGlob) => {
                glob(JPEGImages, (er, files) => {
                    if (files && files.length) {
                        (async () => {
                            await asyncLoop(files, (file) => {
                                const image = sharp(file);
                                const directory = path.dirname(file);
                                const extension = path.extname(file);
                                const fileName = path.basename(file, extension);

                                const imageResult = image.metadata()
                                    .then((metadata) => {
                                        return {width: metadata.width, height: metadata.height}
                                    })
                                    .then((data) => {
                                        if (data.width > max_width) {
                                            fsExtra.emptyDirSync(`public`);
                                            res.status(400)
                                                .send({response: `${fileName}${extension} is larger than 2000px`}).end();
                                        }
                                        let JpegPromises = [];
                                        const jpegImage = image.withMetadata();
                                        const type = extension === ".jpeg" ? ".jpeg" : ".jpg";
                                        const small_condition = smallSize && (smallSize < data.width);
                                        const medium_condition = mediumSize && mediumSize < data.width;
                                        const large_condition = largeSize && largeSize < data.width;

                                        const small_suffix = small_condition ? '_small' : '';
                                        const medium_suffix = medium_condition ? '_medium' : '';
                                        const large_suffix = large_condition ? '_large' : '';

                                        if (formatPng) {
                                            JpegPromises.push(new Promise((resolve) => {
                                                jpegImage
                                                    .toFormat('png')
                                                    .toFile(`${directory}/${fileName}.png`, () => resolve());
                                            }));
                                        }
                                        if (formatWebp) {
                                            JpegPromises.push(new Promise((resolve) => {
                                                jpegImage
                                                    .toFormat('webp')
                                                    .toFile(`${directory}/${fileName}.webp`, () => resolve());
                                            }));
                                        }

                                        // ---------------------------- Small Conditions

                                        if (small_condition) {
                                            jpegImage.resize(parseInt(smallSize), data.height);
                                        }
                                        if (formatJpeg && small_suffix != '') {
                                            JpegPromises.push(new Promise((resolve) => {
                                                jpegImage
                                                    .toFormat('jpg')
                                                    .toFile(`${directory}/${fileName}${small_suffix}${type}`, () => resolve());
                                            }));
                                        }
                                        if (formatPng && small_suffix != '') {
                                            JpegPromises.push(new Promise((resolve) => {
                                                jpegImage
                                                    .toFormat('png')
                                                    .toFile(`${directory}/${fileName}${small_suffix}.png`, () => resolve());
                                            }));
                                        }
                                        if (formatWebp && small_suffix != '') {
                                            JpegPromises.push(new Promise((resolve) => {
                                                jpegImage
                                                    .toFormat('webp')
                                                    .toFile(`${directory}/${fileName}${small_suffix}.webp`, () => resolve());
                                            }));
                                        }

                                        // ---------------------------- Medium Conditions

                                        if (medium_condition) {
                                            jpegImage.resize(parseInt(mediumSize), data.height);
                                        }
                                        if (formatJpeg && medium_suffix != '') {
                                            JpegPromises.push(new Promise((resolve) => {
                                                jpegImage
                                                    .toFormat('jpg')
                                                    .toFile(`${directory}/${fileName}${medium_suffix}${type}`, () => resolve());
                                            }));
                                        }
                                        if (formatPng && medium_suffix != '') {
                                            JpegPromises.push(new Promise((resolve) => {
                                                jpegImage
                                                    .toFormat('png')
                                                    .toFile(`${directory}/${fileName}${medium_suffix}.png`, () => resolve());
                                            }));
                                        }
                                        if (formatWebp && medium_suffix != '') {
                                            JpegPromises.push(new Promise((resolve) => {
                                                jpegImage
                                                    .toFormat('webp')
                                                    .toFile(`${directory}/${fileName}${medium_suffix}.webp`, () => resolve());
                                            }));
                                        }

                                        // ---------------------------- Large Conditions

                                        if (large_condition) {
                                            jpegImage.resize(parseInt(largeSize), data.height);
                                        }
                                        if (formatJpeg && large_suffix != '') {
                                            JpegPromises.push(new Promise((resolve) => {
                                                jpegImage
                                                    .toFormat('jpg')
                                                    .toFile(`${directory}/${fileName}${large_suffix}${type}`, () => resolve());
                                            }));
                                        }
                                        if (formatPng && large_suffix != '') {
                                            JpegPromises.push(new Promise((resolve) => {
                                                jpegImage
                                                    .toFormat('png')
                                                    .toFile(`${directory}/${fileName}${large_suffix}.png`, () => resolve());
                                            }));
                                        }
                                        if (formatWebp && large_suffix != '') {
                                            JpegPromises.push(new Promise((resolve) => {
                                                jpegImage
                                                    .toFormat('webp')
                                                    .toFile(`${directory}/${fileName}${large_suffix}.webp`, () => resolve());
                                            }));
                                        }

                                        return Promise
                                            .all(JpegPromises)
                                            .then(() => {
                                                return true;
                                            })
                                            .catch((e) => {
                                                console.log(e)
                                            });
                                    });

                                Promise.resolve(imageResult).then((results) => {
                                    if (results) {
                                        resolveGlob();
                                    }
                                });
                            });
                        })();
                    } else {
                        resolveGlob();
                    }
                });
            }));

            globPromise.push(new Promise((resolveGlob) => {
                glob(PNGImages, (er, files) => {
                    if (files && files.length) {
                        (async () => {
                            await asyncLoop(files, (file) => {
                                const image = sharp(file);
                                const directory = path.dirname(file);
                                const extension = path.extname(file);
                                const fileName = path.basename(file, extension);

                                const imageResult = image.metadata()
                                    .then((metadata) => {
                                        return {width: metadata.width, height: metadata.height}
                                    })
                                    .then((data) => {
                                        if (data.width > max_width) {
                                            fsExtra.emptyDirSync(`public`);
                                            res.status(400)
                                                .send({response: `${fileName}${extension} is larger than 2000px`}).end();
                                        }

                                        let PngPromises = [];

                                        const pngImage = image.withMetadata();

                                        const small_condition = smallSize && (smallSize < data.width);
                                        const medium_condition = mediumSize && mediumSize < data.width;
                                        const large_condition = largeSize && largeSize < data.width;

                                        const small_suffix = small_condition ? '_small' : '';
                                        const medium_suffix = medium_condition ? '_medium' : '';
                                        const large_suffix = large_condition ? '_large' : '';

                                        if (formatJpeg) {
                                            PngPromises.push(new Promise((resolve) => {
                                                pngImage
                                                    .toFormat('jpg')
                                                    .toFile(`${directory}/${fileName}.jpg`, () => resolve());
                                            }));

                                        }
                                        if (formatWebp) {
                                            PngPromises.push(new Promise((resolve) => {
                                                pngImage
                                                    .toFormat('webp')
                                                    .toFile(`${directory}/${fileName}.webp`, () => resolve());
                                            }));
                                        }

                                        // ---------------------------- Small Conditions

                                        if (small_condition) {
                                            pngImage.resize(parseInt(smallSize), data.height);
                                        }
                                        if (formatPng && small_suffix != '') {
                                            PngPromises.push(new Promise((resolve) => {
                                                pngImage
                                                    .toFormat('png')
                                                    .toFile(`${directory}/${fileName}${small_suffix}.png`, () => resolve());
                                            }));
                                        }
                                        if (formatJpeg && small_suffix != '') {
                                            PngPromises.push(new Promise((resolve) => {
                                                pngImage
                                                    .toFormat('jpg')
                                                    .toFile(`${directory}/${fileName}${small_suffix}.jpg`, () => resolve());
                                            }));
                                        }
                                        if (formatWebp && small_suffix != '') {
                                            PngPromises.push(new Promise((resolve) => {
                                                pngImage
                                                    .toFormat('webp')
                                                    .toFile(`${directory}/${fileName}${small_suffix}.webp`, () => resolve());
                                            }));
                                        }

                                        // ---------------------------- Medium Conditions

                                        if (medium_condition) {
                                            pngImage.resize(parseInt(mediumSize), data.height);
                                        }
                                        if (formatJpeg && medium_suffix != '') {
                                            PngPromises.push(new Promise((resolve) => {
                                                pngImage
                                                    .toFormat('jpg')
                                                    .toFile(`${directory}/${fileName}${medium_suffix}.jpg`, () => resolve());
                                            }));
                                        }
                                        if (formatPng && medium_suffix != '') {
                                            PngPromises.push(new Promise((resolve) => {
                                                pngImage
                                                    .toFormat('png')
                                                    .toFile(`${directory}/${fileName}${medium_suffix}.png`, () => resolve());
                                            }));
                                        }
                                        if (formatWebp && medium_suffix != '') {
                                            PngPromises.push(new Promise((resolve) => {
                                                pngImage
                                                    .toFormat('webp')
                                                    .toFile(`${directory}/${fileName}${medium_suffix}.webp`, () => resolve());
                                            }));
                                        }

                                        // ---------------------------- Large Conditions

                                        if (large_condition) {
                                            pngImage.resize(parseInt(largeSize), data.height);
                                        }
                                        if (formatJpeg && large_suffix != '') {
                                            PngPromises.push(new Promise((resolve) => {
                                                pngImage
                                                    .toFormat('jpg')
                                                    .toFile(`${directory}/${fileName}${large_suffix}.jpg`, () => resolve());
                                            }));
                                        }
                                        if (formatPng && large_suffix != '') {
                                            PngPromises.push(new Promise((resolve) => {
                                                pngImage
                                                    .toFormat('png')
                                                    .toFile(`${directory}/${fileName}${large_suffix}.png`, () => resolve());
                                            }));
                                        }
                                        if (formatWebp && large_suffix != '') {
                                            PngPromises.push(new Promise((resolve) => {
                                                pngImage
                                                    .toFormat('webp')
                                                    .toFile(`${directory}/${fileName}${large_suffix}.webp`, () => resolve());
                                            }));
                                        }

                                        return Promise
                                            .all(PngPromises)
                                            .then(() => {
                                                return true;
                                            })
                                            .catch((e) => {
                                                console.log(e)
                                            });
                                    });

                                Promise.resolve(imageResult).then((results) => {
                                    if (results) {
                                        resolveGlob();
                                    }
                                });
                            });
                        })();
                    } else {
                        resolveGlob();
                    }
                });
            }));

            globPromise.push(new Promise((resolveGlob) => {
                glob(WEBPImages, (er, files) => {
                    if (files && files.length) {
                        (async () => {
                            await asyncLoop(files, (file) => {
                                const image = sharp(file);
                                const directory = path.dirname(file);
                                const extension = path.extname(file);
                                const fileName = path.basename(file, extension);

                                const imageResult = image.metadata()
                                    .then((metadata) => {
                                        return {width: metadata.width, height: metadata.height}
                                    })
                                    .then((data) => {
                                        if (data.width > max_width) {
                                            fsExtra.emptyDirSync(`public`);
                                            res.status(400)
                                                .send({response: `${fileName}${extension} is larger than 2000px`}).end();
                                        }

                                        let WebpPromises = [];

                                        const WebpImage = image.withMetadata();

                                        const small_condition = smallSize && (smallSize < data.width);
                                        const medium_condition = mediumSize && mediumSize < data.width;
                                        const large_condition = largeSize && largeSize < data.width;

                                        const small_suffix = small_condition ? '_small' : '';
                                        const medium_suffix = medium_condition ? '_medium' : '';
                                        const large_suffix = large_condition ? '_large' : '';

                                        if (formatJpeg) {
                                            WebpPromises.push(new Promise((resolve) => {
                                                WebpImage
                                                    .toFormat('jpg')
                                                    .toFile(`${directory}/${fileName}.jpg`, () => resolve());
                                            }));
                                        }
                                        if (formatPng) {
                                            WebpPromises.push(new Promise((resolve) => {
                                                WebpImage
                                                    .toFormat('png')
                                                    .toFile(`${directory}/${fileName}.png`, () => resolve());
                                            }));
                                        }


                                        // ---------------------------- Small Conditions

                                        if (small_condition) {
                                            WebpImage.resize(parseInt(smallSize), data.height);
                                        }
                                        if (formatPng && small_suffix != '') {
                                            WebpPromises.push(new Promise((resolve) => {
                                                WebpImage
                                                    .toFormat('png')
                                                    .toFile(`${directory}/${fileName}${small_suffix}.png`, () => resolve());
                                            }));
                                        }
                                        if (formatJpeg && small_suffix != '') {
                                            WebpPromises.push(new Promise((resolve) => {
                                                WebpImage
                                                    .toFormat('jpg')
                                                    .toFile(`${directory}/${fileName}${small_suffix}.jpg`, () => resolve());
                                            }));
                                        }
                                        if (formatWebp && small_suffix != '') {
                                            WebpPromises.push(new Promise((resolve) => {
                                                WebpImage
                                                    .toFormat('webp')
                                                    .toFile(`${directory}/${fileName}${small_suffix}.webp`, () => resolve());
                                            }));
                                        }

                                        // ---------------------------- Medium Conditions

                                        if (medium_condition) {
                                            WebpImage.resize(parseInt(mediumSize), data.height);
                                        }
                                        if (formatJpeg && medium_suffix != '') {
                                            WebpPromises.push(new Promise((resolve) => {
                                                WebpImage
                                                    .toFormat('jpg')
                                                    .toFile(`${directory}/${fileName}${medium_suffix}.jpg`, () => resolve());
                                            }));
                                        }
                                        if (formatPng && medium_suffix != '') {
                                            WebpPromises.push(new Promise((resolve) => {
                                                WebpImage
                                                    .toFormat('png')
                                                    .toFile(`${directory}/${fileName}${medium_suffix}.png`, () => resolve());
                                            }));
                                        }
                                        if (formatWebp && medium_suffix != '') {
                                            WebpPromises.push(new Promise((resolve) => {
                                                WebpImage
                                                    .toFormat('webp')
                                                    .toFile(`${directory}/${fileName}${medium_suffix}.webp`, () => resolve());
                                            }));
                                        }

                                        // ---------------------------- Large Conditions

                                        if (large_condition) {
                                            WebpImage.resize(parseInt(largeSize), data.height);
                                        }
                                        if (formatJpeg && large_suffix != '') {
                                            WebpPromises.push(new Promise((resolve) => {
                                                WebpImage
                                                    .toFormat('jpg')
                                                    .toFile(`${directory}/${fileName}${large_suffix}.jpg`, () => resolve());
                                            }));
                                        }
                                        if (formatPng && large_suffix != '') {
                                            WebpPromises.push(new Promise((resolve) => {
                                                WebpImage
                                                    .toFormat('png')
                                                    .toFile(`${directory}/${fileName}${large_suffix}.png`, () => resolve());
                                            }));
                                        }
                                        if (formatWebp && large_suffix != '') {
                                            WebpPromises.push(new Promise((resolve) => {
                                                WebpImage
                                                    .toFormat('webp')
                                                    .toFile(`${directory}/${fileName}${large_suffix}.webp`, () => resolve());
                                            }));
                                        }

                                        return Promise
                                            .all(WebpPromises)
                                            .then(() => {
                                                return true;
                                            })
                                            .catch((e) => {
                                                console.log(e)
                                            });
                                    });

                                Promise.resolve(imageResult).then((results) => {
                                    if (results) {
                                        resolveGlob();
                                    }
                                });
                            });
                        })();
                    } else {
                        resolveGlob();
                    }
                });
            }));

            const optimiseJPEGImages = () => imagemin([JPEGImages], {
                destination: destination,
                plugins: [
                    jpegoptim({progressive: true, max: 80})
                ]
            });

            const optimisePNGImages = () => imagemin([PNGImages], {
                destination: destination,
                plugins: [
                    imageminPngquant({quality: [0.6, 0.8]})
                ],
            });

            const optimiseWebpImages = () => imagemin([WEBPImages], {
                destination: destination,
                plugins: [
                    imageminWebp({quality: 85})
                ],
            });

            const zipImages = () => {
                zipFolder.zipFolder(`public/${microtime}`, `archives/${microtime}.zip`, (err) => {
                    if (err) {
                        console.log('Something went wrong!', err);
                    } else {
                        res.status(200).send({
                            response: `Download http://${host}:4000/archives/${microtime}.zip`,
                            link: `http://${host}:4000/archives/${microtime}.zip`,
                            message: 'Archive will be still available for download till 17:00'
                        });
                    }
                });
            };

            Promise.all(globPromise).then(() => {
                setTimeout(() => {
                    optimiseJPEGImages()
                        .then(() => optimisePNGImages())
                        .then(() => optimiseWebpImages())
                        .then(() => zipImages());
                }, 1000);
            }).catch((e) => {
                console.log(e)
            });
        }
    });
});

app.post('/image_processing', function (req, res) {

    const date = new Date();
    const microtime = date.getTime();
    fsExtra.ensureDirSync(`public/api_images/${microtime}`);

    destination_folder = `public/api_images/${microtime}`;

    upload(req, res, function (err) {
        if (err) {
            res.status(400).send({response: err.message}).end();
        } else {
            process_images(req, res, microtime);
        }
    })
});

function process_images(req, res, microtime) {
    let globPromise = [];
    const max_width = 2000;
    const PNGImages = `public/api_images/${microtime}/*.png`;
    const JPEGImages = `public/api_images/${microtime}/*.{jpg,jpeg}`;
    const WEBPImages = `public/api_images/${microtime}/*.webp`;
    const destination = `public/api_images/${microtime}`;

    const formatJpeg = req.body.formatJpeg;
    const formatPng = req.body.formatPng;
    const formatWebp = req.body.formatWebp;

    !fs.existsSync(`public/api_images/${microtime}`) ? fs.mkdirSync(`public/api_images/${microtime}`) : false;

    async function asyncLoop(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    globPromise.push(new Promise((resolveGlob) => {
        glob(JPEGImages, (er, files) => {
            if (files && files.length) {
                (async () => {
                    await asyncLoop(files, (file) => {
                        const image = sharp(file);
                        const directory = path.dirname(file);
                        const extension = path.extname(file);
                        const fileName = path.basename(file, extension);

                        const imageResult = image.metadata()
                            .then((metadata) => {
                                return {width: metadata.width, height: metadata.height}
                            })
                            .then((data) => {
                                if (data.width > max_width) {
                                    res.status(400).send({response: `${fileName}${extension} is larger than 2000px`}).end();
                                }
                                let JpegPromises = [];
                                const jpegImage = image.withMetadata();

                                if (formatPng) {
                                    JpegPromises.push(new Promise((resolve) => {
                                        jpegImage
                                            .toFormat('png')
                                            .toFile(`${directory}/${fileName}.png`, () => resolve());
                                    }));
                                }
                                if (formatWebp) {
                                    JpegPromises.push(new Promise((resolve) => {
                                        jpegImage
                                            .toFormat('webp')
                                            .toFile(`${directory}/${fileName}.webp`, () => resolve());
                                    }));
                                }

                                return Promise
                                    .all(JpegPromises)
                                    .then(() => {
                                        return true;
                                    })
                                    .catch((error) => {
                                        res.status(400).send({error: error}).end();
                                    });
                            });

                        Promise.resolve(imageResult).then((results) => {
                            if (results) {
                                resolveGlob();
                            }
                        });
                    });
                })();
            } else {
                resolveGlob();
            }
        });
    }));

    globPromise.push(new Promise((resolveGlob) => {
        glob(PNGImages, (er, files) => {
            if (files && files.length) {
                (async () => {
                    await asyncLoop(files, (file) => {
                        const image = sharp(file);
                        const directory = path.dirname(file);
                        const extension = path.extname(file);
                        const fileName = path.basename(file, extension);

                        const imageResult = image.metadata()
                            .then((metadata) => {
                                return {width: metadata.width, height: metadata.height}
                            })
                            .then((data) => {
                                if (data.width > max_width) {
                                    res.status(400).send({response: `${fileName}${extension} is larger than 2000px`}).end();
                                }

                                let PngPromises = [];

                                const pngImage = image.withMetadata();

                                if (formatJpeg) {
                                    PngPromises.push(new Promise((resolve) => {
                                        pngImage
                                            .toFormat('jpg')
                                            .toFile(`${directory}/${fileName}.jpg`, () => resolve());
                                    }));

                                }
                                if (formatWebp) {
                                    PngPromises.push(new Promise((resolve) => {
                                        pngImage
                                            .toFormat('webp')
                                            .toFile(`${directory}/${fileName}.webp`, () => resolve());
                                    }));
                                }

                                return Promise
                                    .all(PngPromises)
                                    .then(() => {
                                        return true;
                                    })
                                    .catch((error) => {
                                        res.status(400).send({error: error}).end();
                                    });
                            });

                        Promise.resolve(imageResult).then((results) => {
                            if (results) {
                                resolveGlob();
                            }
                        });
                    });
                })();
            } else {
                resolveGlob();
            }
        });
    }));

    const optimiseJPEGImages = () => imagemin([JPEGImages], {
        destination: destination,
        plugins: [
            jpegoptim({progressive: true, max: 80})
        ]
    });

    const optimisePNGImages = () => imagemin([PNGImages], {
        destination: destination,
        plugins: [
            imageminPngquant({quality: [0.6, 0.8]})
        ],
    });

    const optimiseWebpImages = () => imagemin([WEBPImages], {
        destination: destination,
        plugins: [
            imageminWebp({quality: 85})
        ],
    });

    Promise.all(globPromise).then(() => {
        setTimeout(() => {
            optimiseJPEGImages()
                .then(() => optimisePNGImages())
                .then(() => optimiseWebpImages())
                .then(() => {
                    let allImages = [];
                    req.files.map((file) => {
                        const extension = path.extname(file.filename);
                        const fileName = path.basename(file.filename, extension);

                        if (fs.existsSync(file.destination + '/' + fileName + '.jpg')) {
                            allImages.push(req.get('host') + '/' + file.destination + '/' + fileName + '.jpg');
                        }

                        if (fs.existsSync(file.destination + '/' + fileName + '.png')) {
                            allImages.push(req.get('host') + '/' + file.destination + '/' + fileName + '.png');
                        }

                        if (fs.existsSync(file.destination + '/' + fileName + '.webp')) {
                            allImages.push(req.get('host') + '/' + file.destination + '/' + fileName + '.webp');
                        }
                    });
                    res.status(200).send({response: allImages}).end();
                });
        }, 1000);
    }).catch((error) => {
        res.status(400).send({error: error}).end();
    });
}