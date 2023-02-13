import moment from 'moment'
import { Model, DataTypes, Sequelize } from 'sequelize'

export const IMAGE_TABLE = 'images'

export const ImageSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING
  },
  publicId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'public_id'
  },
  url: {
    allowNull: false,
    type: DataTypes.STRING
  },
  secureUrl: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'secure_url'
  },
  folder: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: moment().format()
  }
}

export class Image extends Model {
  static associate (models: any) {
    this.hasOne(models.Product, {
      as: 'products',
      foreignKey: 'imageId'
    })
  }

  static config (sequelize: Sequelize) {
    return {
      sequelize,
      tableName: IMAGE_TABLE,
      modelName: 'Image',
      timestamps: false
    }
  }
}
