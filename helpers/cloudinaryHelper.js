const cloudinary = require('./../config/cloudinary')

const uploadImages = async (filePath) => {
    try {
      const result = await cloudinary.uploader.upload(filePath) 
      return {
        url: result.secure_url,
        public_id: result.public_id
      } 
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = uploadImages