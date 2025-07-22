import multer from "multer";
import path from 'path'
import { fileURLToPath } from "url";

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const productPath = path.join(__dirname, '../productImages')

        cb(null, productPath)
    },

    filename: (req, file, cb) => {

        const fileName = file.originalname.split('.')[0]

        const imageName = Date.now() + ' ' + fileName + path.extname(file.originalname)

        cb(null, imageName)
    }
})

const imageUpload = multer({ storage })

export default imageUpload