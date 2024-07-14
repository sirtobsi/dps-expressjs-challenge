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

  router.get(
    '/projects/:projectId/reports',
    asyncWrapper(getProjectsByProjectIdReports),
  )
  router.post(
    '/projects/:projectId/reports',
    asyncWrapper(postProjectsByProjectIdReports),
  )

  router.get(
    '/projects/:projectId/reports/:reportId',
    asyncWrapper(getProjectsByProjectIdReportsByReportId),
  )
  router.put(
    '/projects/:projectId/reports/:reportId',
    asyncWrapper(putProjectsByProjectIdReportsByReportId),
  )
  router.delete(
    '/projects/:projectId/reports/:reportId',
    asyncWrapper(deleteProjectsByProjectIdReportsByReportId),
  )

  return router
}

export default projectReportRouter
