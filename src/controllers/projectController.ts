/* eslint-disable  @typescript-eslint/no-explicit-any */
/**
 * Project controller handling the project routes.
 */

import { Request, Response } from 'express'
import { ProjectDto } from '@api/generated'
import { ProjectDao } from '@prisma/client'
import {
  createProject,
  deleteProject,
  findAllProjects,
  findProjectById,
  updateProject,
} from '../services/projectService'
import {
  convertProjectDaoToDto,
  convertProjectDtoToDao,
} from '../services/converters/projectConverterService'
import {
  validateNewProject,
  validateProjectId,
  validateUpdateProject,
} from '../services/validators/projectValidatorService'

/**
 * Retrieves all projects.
 * @param {Request} req The incoming request.
 * @param {Response<ProjectDto[]>} res The outgoing response with all projects.
 */
export const getProjects = async (
  req: Request,
  res: Response<ProjectDto[]>,
) => {
  const projectDaos: ProjectDao[] = await findAllProjects()
  const projectDtos: ProjectDto[] = await Promise.all(
    projectDaos.map(async dao => convertProjectDaoToDto(dao)),
  )

  res.status(200).json(projectDtos)
}

/**
 * Creates a new project.
 * @param {Request<any, any, ProjectDto>} req The incoming request with the new project data.
 * @param {Response<ProjectDto>} res The outgoing response with the created project.
 */
export const postProjects = async (
  req: Request<any, any, ProjectDto>,
  res: Response<ProjectDto>,
) => {
  const newProjectDto: ProjectDto = validateNewProject(req.body)

  const newProjectDao: ProjectDao = convertProjectDtoToDao(newProjectDto)
  const createdProjectDao: ProjectDao = await createProject(newProjectDao)
  const createdProjectDto: ProjectDto =
    await convertProjectDaoToDto(createdProjectDao)

  res.status(201).json(createdProjectDto)
}

/**
 * Retrieves a project by its ID.
 * @param {Request<{ projectId: string }>} req The incoming request with the project ID.
 * @param {Response<ProjectDto>} res The outgoing response with the retrieved project.
 */
export const getProjectsByProjectId = async (
  req: Request<{ projectId: string }>,
  res: Response<ProjectDto>,
) => {
  const projectId: string = validateProjectId(req.params.projectId)

  const projectDao: ProjectDao = await findProjectById(projectId)
  const projectDto: ProjectDto = await convertProjectDaoToDto(projectDao)

  res.status(200).json(projectDto)
}

/**
 * Updates a project by its ID.
 * @param {Request<{ projectId: string }, any, ProjectDto>} req The incoming request with the project ID and the updated project data.
 * @param {Response<ProjectDto>} res The outgoing response with the updated project.
 */
export const putProjectsByProjectId = async (
  req: Request<{ projectId: string }, any, ProjectDto>,
  res: Response<ProjectDto>,
) => {
  const projectId: string = validateProjectId(req.params.projectId)
  const toUpdateProjectDto: ProjectDto = validateUpdateProject(req.body)
  // Ensure consistency between the project ID in the URL and the project ID in the request body
  toUpdateProjectDto.id = projectId

  const updatedProductDao: ProjectDao = await updateProject(toUpdateProjectDto)
  const updatedProjectDto: ProjectDto =
    await convertProjectDaoToDto(updatedProductDao)

  res.status(200).json(updatedProjectDto)
}

/**
 * Deletes a project by its ID.
 * @param {Request<{ projectId: string }>} req The incoming request with the project ID.
 * @param {Response} res The outgoing response.
 */
export const deleteProjectsByProjectId = async (
  req: Request<{ projectId: string }>,
  res: Response,
) => {
  const projectId: string = validateProjectId(req.params.projectId)

  await deleteProject(projectId)

  res.status(204).send()
}
