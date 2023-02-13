import express, { Express } from 'express'
import categoriesRouter from './categories.router'
import productsRouter from './products.router'

export function routerApi (app: Express) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/products', productsRouter)
  router.use('/categories', categoriesRouter)
}
