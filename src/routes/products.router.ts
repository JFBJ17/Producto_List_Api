import express, { NextFunction, Request, Response } from 'express'
import ProductService from '../services/product.service'

const productsRouter = express.Router()
const service = new ProductService()

productsRouter.get('/', async (req: Request, res: Response) => {
  const products = await service.find()
  res.json(products)
})

productsRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const product = await service.findOne(id)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

productsRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body
      const productBody = {
        ...body,
        image: req.files?.image
      }
      const newProduct = await service.create(productBody)
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  }
)

productsRouter.patch(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const body = req.body
      const updatedProduct = await service.update(id, body)
      res.json(updatedProduct)
    } catch (error) {
      next(error)
    }
  }
)

productsRouter.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const deletedProduct = await service.delete(id)
      res.json(deletedProduct)
    } catch (error) {
      next(error)
    }
  }
)

export default productsRouter
