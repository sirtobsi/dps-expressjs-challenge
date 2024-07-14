import { Router } from 'express'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import asyncWrapper from '@/middleware/errorhandler/asyncWrapper'
import projectReportRouter from './projectReportRouter'

/**
 * The router for the project resource.
 */
const reportRouter = () => {
  const router = Router()

  router.use('/:projectId/reports', [projectReportRouter()])
  return router
}

export default reportRouter
