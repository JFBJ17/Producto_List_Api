import { Request, Response, NextFunction } from 'express'
import { Output } from '@hapi/boom'
import { ValidationError } from 'sequelize'

export function logErrors (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  next(err)
}

export function errorHandler (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

export function boomErrorHandler (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.isBoom) {
    const { output }: { output: Output } = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

export function ormErrorHandler (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    })
  }

  next(err)
}
