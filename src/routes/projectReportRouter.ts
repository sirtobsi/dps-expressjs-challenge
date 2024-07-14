import { Router } from 'express'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import asyncWrapper from '../middleware/errorhandler/asyncWrapper'
import {
  deleteProjectsByProjectIdReportsByReportId,
  getProjectsByProjectIdReports,
  getProjectsByProjectIdReportsByReportId,
  postProjectsByProjectIdReports,
  putProjectsByProjectIdReportsByReportId,
} from '../controllers/reportController'

/**
 * The router for the report within project resource.
 */
const projectReportRouter = () => {
  const router = Router()

  router.get('/', asyncWrapper(getProjectsByProjectIdReports))
  router.post('/', asyncWrapper(postProjectsByProjectIdReports))

  router.get(
    '/:reportId',
    asyncWrapper(getProjectsByProjectIdReportsByReportId),
  )
  router.put(
    '/:reportId',
    asyncWrapper(putProjectsByProjectIdReportsByReportId),
  )
  router.delete(
    '/:reportId',
    asyncWrapper(deleteProjectsByProjectIdReportsByReportId),
  )

  return router
}

export default projectReportRouter
