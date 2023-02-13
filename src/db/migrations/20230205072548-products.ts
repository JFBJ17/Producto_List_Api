import { QueryInterface } from 'sequelize'
import { CategorySchema, CATEGORY_TABLE } from '../models/category.model'
import { ImageSchema, IMAGE_TABLE } from '../models/image.model'
import { PRODUCT_TABLE, ProductSchema } from '../models/product.model'

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema)
    await queryInterface.createTable(IMAGE_TABLE, ImageSchema)
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema)
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.dropTable(PRODUCT_TABLE)
    await queryInterface.dropTable(IMAGE_TABLE)
    await queryInterface.dropTable(CATEGORY_TABLE)
  }
}
