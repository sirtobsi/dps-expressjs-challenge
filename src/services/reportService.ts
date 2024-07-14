/**
 * The report service provides methods to create, retrieve and update reports.
 */

import { ReportDto } from '@api/generated'
import { ReportDao } from '@prisma/client'
import { prisma } from '../index'
import { convertReportDtoToDao } from './converters/reportConverterService'
import { ApiError, ApiErrorCodes } from '../middleware/errorhandler/APIError'

/**
 * Creates a new report.
 * @param {ReportDto} reportDto The report DTO to create.
 * @returns {Promise<ReportDao>} The created report DAO.
 * @throws {ApiError} If the report with the given ID already exists/is invalid.
 */
export const createReport = async (
  reportDto: ReportDto,
): Promise<ReportDao> => {
  const newReport = convertReportDtoToDao(reportDto)
  try {
    const createdReport = await prisma.reportDao.create({
      data: newReport,
    })
    return createdReport
  } catch (error) {
    throw new ApiError(
      ApiErrorCodes.BUSINESS_LOGIC_ERROR,
      'A report with this ID already exists in the system.',
    )
  }
}

/**
 * Retrieves a report by its ID.
 * @param {string} id The ID of the report to retrieve.
 * @returns {Promise<ReportDao>} The retrieved report DAO.
 */
export const findReportById = async (id: string): Promise<ReportDao> => {
  const retrievedReport = await prisma.reportDao.findUnique({
    where: { id },
  })
  if (!retrievedReport) {
    throw new ApiError(
      ApiErrorCodes.NOT_FOUND,
      `Report with ID ${id} not found.`,
    )
  }
  return retrievedReport
}

/**
 * Retrieves all reports for a project id.
 * @param {string} projectId The ID of the project to retrieve reports for.
 * @returns {Promise<ReportDao[]>} The retrieved reports.
 */
export const findReportsByProjectId = async (
  projectId: string,
): Promise<ReportDao[]> => {
  const retrievedReports = await prisma.reportDao.findMany({
    where: { projectId },
  })
  return retrievedReports
}

/**
 * Retrieves all reports.
 * @returns {Promise<ReportDao[]>} The retrieved reports.
 */
export const findAllReports = async (): Promise<ReportDao[]> => {
  const reports = await prisma.reportDao.findMany()
  return reports
}

/**
 * Updates a report by its ID.
 * @param {ReportDto} reportDto
 * @returns {Promise<ReportDao>} The updated report DAO.
 */
export const updateReport = async (
  reportDto: ReportDto,
): Promise<ReportDao> => {
  const updatedReport = convertReportDtoToDao(reportDto)
  try {
    const report = await prisma.reportDao.update({
      where: { id: reportDto.id },
      data: updatedReport,
    })
    return report
  } catch (error) {
    throw new ApiError(
      ApiErrorCodes.BUSINESS_LOGIC_ERROR,
      `The report with ID ${reportDto.id} could not be updated.`,
    )
  }
}

/**
 * Deletes a report by its ID.
 * @param {string} id The ID of the report to update.
 * @returns {Promise<ReportDao>} The deleted report DAO.
 */
export const deleteReport = async (id: string): Promise<ReportDao> => {
  const deletedReport = await prisma.reportDao.delete({
    where: { id },
  })
  return deletedReport
}

/**
 * Retrieves all reports that contain the query word at least 3 times.
 * @param {string} queryWord The query word to search for.
 * @returns {Promise<ReportDao[]>} The reports that contain the query word at least 3 times.
 */
export const getReportsWithQueryWord3Times = async (
  queryWord: string,
): Promise<ReportDao[]> => {
  const reports: ReportDao[] = await findAllReports()
  const reportsWithQueryWord3Times = reports.filter(report => {
    const { text } = report
    // Count the number of times the query word appears in the text by splitting at
    // the word and counting the number of parts - 1
    const queryWordCount = text.split(queryWord).length - 1
    return queryWordCount >= 3
  })
  return reportsWithQueryWord3Times
}
