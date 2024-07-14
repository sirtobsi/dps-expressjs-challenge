import { Router } from 'express'
import asyncWrapper from '../middleware/errorhandler/asyncWrapper'
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

  router.get('/projects', asyncWrapper(getProjects))
  router.post('/projects', asyncWrapper(postProjects))
  router.get('/projects/:projectId', asyncWrapper(getProjectsByProjectId))
  router.put('/projects//:projectId', asyncWrapper(putProjectsByProjectId))
  router.delete('/projects/:projectId', asyncWrapper(deleteProjectsByProjectId))

  return router
}

export default reportRouter
