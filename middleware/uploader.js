const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: 'resumes/',
    filename: (req, file, cb) =>{
        const uniqueSuffix = Date.now() + '-' + Math.fround(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname  )
    }
})

const uploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /pdf/;
        console.log(supportedImage)
        const extension = path.extname(file.originalname);
        console.log(extension)
        if(supportedImage.test(extension)){
            cb(null, true)
        }else{
            cb(new Error('Must be a  pdf'));
        }
    },
    limits: {
        fileSize: 5000000,
    }
})

module.exports = uploader;