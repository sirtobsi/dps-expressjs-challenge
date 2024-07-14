import { ApiError, ApiErrorCodes } from '@/middleware/errorhandler/APIError'
import { ProjectDto } from '@api/generated'
import { z } from 'zod'
import { updateReportValidator } from './reportValidatorService'

/**
 * This is a zod schema for the id object used to validate the id of a project.
 */
const projectIdValidator = z.string()

/**
 * This is a zod schema for the project object used to validate the object on creation.
 */
const newProjectValidator = z.object({
  id: z.optional(z.string()),
  name: z.string(),
  description: z.string(),
  projects: z.optional(
    z
      .array(z.string())
      .default([])
      .refine(value => value.length === 0, {
        message:
          'You cannot create projects and assign reports to them at the same time.',
        path: ['projects'],
      }),
  ),
})

/**
 * This is a zod schema for the project object used to validate the object on updates.
 */
const updateProjectValidator = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  projects: z.array(updateReportValidator).default([]),
})

/**
 * Validates a project object on creation.
 * @param {ProjectDto} project The project object to validate.
 * @returns {ProjectDto} The validated project object.
 * @throws {ApiError} If the project object is invalid.
 */
export const validateNewProject = (project: ProjectDto): ProjectDto => {
  try {
    return newProjectValidator.parse(project)
  } catch (error) {
    throw new ApiError(ApiErrorCodes.BAD_REQUEST, String(error))
  }
}

/**
 * Validates a project object on update.
 * @param {ProjectDto} project The project object to validate.
 * @returns {ProjectDto} The validated project object.
 * @throws {ApiError} If the project object is invalid.
 */
export const validateUpdateProject = (project: ProjectDto): ProjectDto => {
  try {
    return updateProjectValidator.parse(project)
  } catch (error) {
    throw new ApiError(ApiErrorCodes.BAD_REQUEST, String(error))
  }
}

/**
 * Validates a project id.
 * @param {string} id the id to validate.
 * @returns {string} The validated id.
 * @throws {ApiError} If the id is invalid.
 */
export const validateProjectId = (id: string): string => {
  try {
    return projectIdValidator.parse(id)
  } catch (error) {
    throw new ApiError(ApiErrorCodes.BAD_REQUEST, String(error))
  }
}
