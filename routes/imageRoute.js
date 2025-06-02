const express = require('express')
const { uploadImage, getImage, deleteImage } = require('../controller/imageController')
const authMiddleware = require('../middleware/auth-middleware')
const isAdminUser = require('../middleware/adminMiddleware')
const upload = require('../middleware/uploadMiddleware')
const router = express.Router()

router.post('/',authMiddleware,isAdminUser,upload.single('image'),uploadImage)
router.get('/',authMiddleware,isAdminUser,getImage)
router.get('/:id',authMiddleware,isAdminUser,deleteImage)



module.exports = router