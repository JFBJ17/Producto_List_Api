import express, { NextFunction, Request, Response } from 'express'
import CategoryService from '../services/category.service'

const categoriesRouter = express.Router()
const service = new CategoryService()

categoriesRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await service.find()
      res.json(categories)
    } catch (error) {
      next(error)
    }
  }
)

categoriesRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const category = await service.findOne(id)
      res.json(category)
    } catch (error) {
      next(error)
    }
  }
)

categoriesRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body
      const newCategory = await service.create(body)
      res.status(201).json(newCategory)
    } catch (error) {
      next(error)
    }
  }
)

categoriesRouter.patch(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const body = req.body
      const updatedCategory = await service.update(id, body)
      res.json(updatedCategory)
    } catch (error) {
      next(error)
    }
  }
)

categoriesRouter.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const rta = await service.delete(id)
      res.json(rta)
    } catch (error) {
      next(error)
    }
  }
)

export default categoriesRouter
