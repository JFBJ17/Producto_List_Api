import boom from '@hapi/boom'
import { CategoryInput } from '../interfaces/category.interface'
import { sequelize } from '../libs/sequelize'

const { models } = sequelize

export default class CategoryService {
  async create (data: CategoryInput) {
    const newCategory = await models.Category.create(data)
    return newCategory
  }

  async find () {
    const categories = await models.Category.findAll()
    return categories
  }

  async findOne (id: string) {
    const category = await models.Category.findByPk(id)
    if (!category) throw boom.notFound('category not found')
    return category
  }

  async update (id: string, changes: CategoryInput) {
    const category = await this.findOne(id)
    const updatedCategory = await category.update(changes)
    return updatedCategory
  }

  async delete (id: string) {
    const category = await this.findOne(id)
    await category.destroy()
    return { id, message: 'Deleted category' }
  }
}
