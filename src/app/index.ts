import morgan from 'morgan'
import { routerApi } from '../routes'
import express, { Express } from 'express'
import fileUpload from 'express-fileupload'
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
  ormErrorHandler
} from '../middlewares/error.handler'

export default class App {
  private app: Express

  constructor (private port?: string | number) {
    this.app = express()
    this.settings()
    this.middlewares()
    this.routes()
    this.errorMiddlewares()
  }

  settings () {
    this.app.set('port', this.port || process.env.PORT || 5000)
  }

  middlewares () {
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: './uploads'
      })
    )
  }

  errorMiddlewares () {
    this.app.use(logErrors)
    this.app.use(ormErrorHandler)
    this.app.use(boomErrorHandler)
    this.app.use(errorHandler)
  }

  routes () {
    routerApi(this.app)
  }

  listen () {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server running on port ${this.app.get('port')}`)
    })
  }
}
