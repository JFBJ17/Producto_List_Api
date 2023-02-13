import boom from '@hapi/boom'
import fs from 'fs-extra'
import { Model } from 'sequelize'
import { UploadedFile } from 'express-fileupload'
import { ProductInput } from '../interfaces/product.interface'
import { deleteImage, uploadImage } from '../libs/cloudinary'
import { sequelize } from '../libs/sequelize'
import { Image } from '../interfaces/image.interface'
import { Product } from '../interfaces/product.interface'

const { models } = sequelize

export default class ProductService {
  async create (data: ProductInput) {
    const { image, ...dataRest } = data
    let imageData = {} as Image
    if (image) {
      const { tempFilePath } = image as UploadedFile
      const res = await uploadImage(tempFilePath)
      imageData = {
        id: res.asset_id,
        publicId: res.public_id,
        url: res.url,
        secureUrl: res.secure_url,
        folder: res.folder,
        createdAt: res.created_at
      }
      await fs.unlink(tempFilePath)
    }
    const newImage = await models.Image.create<Model<Image>>(imageData)
    const newProduct = await models.Product.create({
      ...dataRest,
      imageId: newImage.dataValues.id
    })
    return newProduct
  }

  async find () {
    const products = await models.Product.findAll({
      include: ['image', 'category']
    })
    return products
  }

  async findOne (id: string) {
    const product = await models.Product.findByPk<
      Model<Omit<Product, 'image'> & { image: Image }>
    >(id, { include: ['image', 'category'] })
    if (!product) throw boom.notFound('product not found')
    return product
  }

  // TODO: Update products including image and category
  async update (id: string, changes: ProductInput) {
    const { image, ...changesRest } = changes
    const product = await this.findOne(id)
    let imageData = {} as Image
    let newData = {} as any
    if (image) {
      await deleteImage(product.dataValues.image.publicId)
      const { tempFilePath } = image as UploadedFile
      const res = await uploadImage(tempFilePath)
      imageData = {
        id: res.asset_id,
        publicId: res.public_id,
        url: res.url,
        secureUrl: res.secure_url,
        folder: res.folder,
        createdAt: res.created_at
      }
      await fs.unlink(tempFilePath)
      const imageRes = await models.Image.findByPk<Model<Image>>(
        product.dataValues.id
      )
      if (!imageRes) throw boom.notFound('image not found')
      const updatedImage = await imageRes.update(imageData)
      newData = { ...changesRest, imageId: updatedImage.dataValues.id }
    } else {
      newData = changesRest
    }
    const updatedProduct = await product.update(newData)
    return updatedProduct
  }

  async delete (id: string) {
    const product = await this.findOne(id)
    const image = await models.Image.findByPk(product.dataValues.image.id)
    if (!image) throw boom.notFound('image not found')
    await product.destroy()
    if (product.dataValues.image.publicId)
      await deleteImage(product.dataValues.image.publicId)
    await image.destroy()
    return { id, message: 'deleted product' }
  }
}
