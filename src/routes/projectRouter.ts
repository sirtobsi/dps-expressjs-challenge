import { Router } from 'express'
import asyncWrapper from '../middleware/errorhandler/asyncWrapper'
import projectReportRouter from './projectReportRouter'
import {
  deleteProjectsByProjectId,
  getProjects,
  getProjectsByProjectId,
  postProjects,
  putProjectsByProjectId,
} from '../controllers/projectController'

/**
 * The router for the project resource.
 */
const reportRouter = () => {
  const router = Router()

  router.get('/', asyncWrapper(getProjects))
  router.post('/', asyncWrapper(postProjects))
  router.get('/:projectId', asyncWrapper(getProjectsByProjectId))
  router.put('/:projectId', asyncWrapper(putProjectsByProjectId))
  router.delete('/:projectId', asyncWrapper(deleteProjectsByProjectId))

  router.use('/:projectId/reports', [projectReportRouter()])
  return router
}

export default reportRouter
