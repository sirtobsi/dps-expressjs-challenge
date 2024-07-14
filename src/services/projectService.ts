/**
 * The project service provides methods to create, retrieve and update projects.
 */

import { ProjectDto } from '@api/generated'
import { ProjectDao } from '@prisma/client'
import { convertProjectDtoToDao } from './converters/projectConverterService'
import { prisma } from '../index'
import { ApiError, ApiErrorCodes } from '../middleware/errorhandler/APIError'

/**
 * Creates a new project.
 * @param {ProjectDto} projectDto The project DTO to create.
 * @returns {Promise<ProjectDao>} The created project DAO.
 * @throws {ApiError} If the project with the given ID already exists/is invalid.
 */
export const createProject = async (
  projectDto: ProjectDto,
): Promise<ProjectDao> => {
  try {
    const createdProject = await prisma.projectDao.create({
      data: {
        id: undefined,
        name: projectDto.name,
        description: projectDto.description,
      },
    })
    return createdProject
  } catch (error) {
    throw new ApiError(
      ApiErrorCodes.BUSINESS_LOGIC_ERROR,
      `A project with ID ${projectDto.id} already exists in the system.`,
    )
  }
}

/**
 * Retrieves a project by its ID.
 * @param {string} id The ID of the project to retrieve.
 * @returns {Promise<ProjectDao>} The retrieved project DAO.
 * @throws {ApiError} If the project with the given ID does not exist.
 */
export const findProjectById = async (id: string): Promise<ProjectDao> => {
  const retrievedProject = await prisma.projectDao.findUnique({
    where: { id },
  })
  if (!retrievedProject) {
    throw new ApiError(
      ApiErrorCodes.NOT_FOUND,
      `Project with ID ${id} not found.`,
    )
  }
  return retrievedProject
}

/**
 * Retrieves all projects.
 * @returns {Promise<ProjectDao[]>} The retrieved projects.
 */
export const findAllProjects = async (): Promise<ProjectDao[]> => {
  const retrievedProjects = await prisma.projectDao.findMany()
  return retrievedProjects
}

/**
 * Updates a project.
 * @param {ProjectDto} projectDto The project DTO to update.
 * @returns {Promise<ProjectDao>} The updated project DAO.
 * @throws {ApiError} If the project with the given ID does not exist.
 */
export const updateProject = async (
  projectDto: ProjectDto,
): Promise<ProjectDao> => {
  const updatedProject = convertProjectDtoToDao(projectDto)
  try {
    const project = await prisma.projectDao.update({
      where: { id: projectDto.id },
      data: updatedProject,
    })
    return project
  } catch (error) {
    throw new ApiError(
      ApiErrorCodes.BUSINESS_LOGIC_ERROR,
      `Project with ID ${projectDto.id} not found.`,
    )
  }
}

/**
 * Deletes a project.
 * @param {string} id The ID of the project to delete.
 * @returns {Promise<ProjectDao>} The deleted project DAO.
 */
export const deleteProject = async (id: string): Promise<ProjectDao> => {
  const project = await prisma.projectDao.delete({
    where: { id },
  })
  return project
}
