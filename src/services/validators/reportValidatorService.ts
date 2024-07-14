import { ApiError, ApiErrorCodes } from '@/middleware/errorhandler/APIError'
import { ReportDto } from '@api/generated'
import { z } from 'zod'

/**
 * This is a zod schema for the id object used to validate the id of a report.
 */
const reportIdValidator = z.string()

/**
 * This is a zod schema for the report object used to validate the object on creation.
 */
export const newReportValidator = z.object({
  id: z.optional(reportIdValidator),
  text: z.string(),
  project_id: z.string(),
})

/**
 * This is a zod schema for the report object used to validate the object on updates.
 */
export const updateReportValidator = z.object({
  id: reportIdValidator,
  text: z.string(),
  project_id: z.string(),
})

/**
 * Validates a report object on creation.
 * @param {ReportDto} report The report object to validate.
 * @returns {ReportDto} The validated report object.
 * @throws {ApiError} If the report object is invalid.
 */
export const validateNewReport = (report: ReportDto): ReportDto => {
  try {
    return newReportValidator.parse(report)
  } catch (error) {
    throw new ApiError(ApiErrorCodes.BAD_REQUEST, String(error))
  }
}

/**
 * Validates a report object on update.
 * @param {ReportDto} report The report object to validate.
 * @returns {ReportDto} The validated report object.
 * @throws {ApiError} If the report object is invalid.
 */
export const validateUpdateReport = (report: ReportDto): ReportDto => {
  try {
    return updateReportValidator.parse(report)
  } catch (error) {
    throw new ApiError(ApiErrorCodes.BAD_REQUEST, String(error))
  }
}

/**
 * Validates a report id.
 * @param {string} id the id to validate.
 * @returns {string} The validated id.
 * @throws {ApiError} If the id is invalid.
 */
export const validateReportId = (id: string | undefined): string => {
  try {
    return reportIdValidator.parse(id)
  } catch (error) {
    throw new ApiError(ApiErrorCodes.BAD_REQUEST, String(error))
  }
}
