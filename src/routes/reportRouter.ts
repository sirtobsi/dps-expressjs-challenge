import { Router } from 'express'
import asyncWrapper from '../middleware/errorhandler/asyncWrapper'
import { getReports } from '../controllers/reportController'

/**
 * The router for the report resource.
 */
const reportRouter = () => {
  const router = Router()

  router.get('/reports', asyncWrapper(getReports))

  return router
}

export default reportRouter
