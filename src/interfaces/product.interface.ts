import { UploadedFile } from 'express-fileupload'

export interface Product {
  id: number
  name: string
  description?: string
  image?: string | UploadedFile | UploadedFile[]
  price: number
  dueDate: Date
  isStock: boolean
  createdAt: Date
  categoryId: number
  imageId: string
}

export type ProductInput = Omit<Product, 'id' | 'createdAt' | 'imageId'>
