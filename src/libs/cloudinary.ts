import { v2 as cloudinary } from 'cloudinary'
import { config } from '../config/index'

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
  secure: true
})

export async function uploadImage (filePath: string) {
  return await cloudinary.uploader.upload(filePath, { folder: 'products' })
}

export async function deleteImage (publicId: string) {
  return await cloudinary.uploader.destroy(publicId)
}
