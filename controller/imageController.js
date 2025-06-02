
const uploadImages = require('../helpers/cloudinaryHelper');
const Image = require('../models/image')
const fs = require('fs')
const cloudinary = require('../config/cloudinary')

const uploadImage = async (req,res) =>{
    try {
        if(!req.file){
            return res.status(400).json({success:false,message:"No file uploaded"})
        }
        
        const {url,public_id} = await uploadImages(req.file.path)
        const newImage = await Image.create({url:url,public_id:public_id})

        fs.unlinkSync(req.file.path)
       
        res.status(200).json({success:true,data:newImage})
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

const getImage = async(req,res) =>{
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit

        const sortBy = req.query.sort || 'createdAt'
        const sortOrder = req.query.order === 'asc' ? 1 : -1
        const totalImages = await Image.countDocuments()
        const totalPages = Math.ceil(totalImages / limit)
        const sortObj = {}
        sortObj[sortBy] = sortOrder


        const images = await Image.find().sort(sortObj).skip(skip).limit(limit)
        res.status(200).json({success:true,data:images,
            pagination:{
                currentPage:page,
                limit:limit,
                totalPages:totalPages,
                totalImages:totalImages
            }
        })
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

const deleteImage = async(req,res) =>{
    try {
        const getImageId = req.params.id
        const image = await Image.findById(getImageId)
        if(!image){
            return res.status(404).json({success:false,message:"Image not found"})
        }

        await cloudinary.uploader.destroy(image.public_id)
        await Image.findByIdAndDelete(getImageId)
        res.status(200).json({success:true,data:image})
       
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

module.exports = {uploadImage,getImage,deleteImage}