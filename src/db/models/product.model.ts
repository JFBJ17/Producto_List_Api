import { Model, DataTypes, Sequelize } from 'sequelize'
import moment from 'moment'
import { CATEGORY_TABLE } from './category.model'
import { IMAGE_TABLE } from './image.model'

export const PRODUCT_TABLE = 'products'

export const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  dueDate: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'due_date'
  },
  isStock: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'is_stock',
    defaultValue: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: moment().format()
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  imageId: {
    field: 'image_id',
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    references: {
      model: IMAGE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

export class Product extends Model {
  static associate (models: any) {
    this.belongsTo(models.Image, { as: 'image' })
    this.belongsTo(models.Category, { as: 'category' })
  }

  static config (sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}
