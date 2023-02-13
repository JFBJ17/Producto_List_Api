import { Sequelize } from 'sequelize'
import { Category, CategorySchema } from './category.model'
import { Product, ProductSchema } from './product.model'
import { Image, ImageSchema } from './image.model'

export function setupModels (sequelize: Sequelize) {
  Product.init(ProductSchema, Product.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize))
  Image.init(ImageSchema, Image.config(sequelize))
  // ...more models

  Product.associate(sequelize.models)
  Category.associate(sequelize.models)
  Image.associate(sequelize.models)
  // ...more associations
}
