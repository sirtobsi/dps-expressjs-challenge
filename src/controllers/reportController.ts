/* eslint-disable  @typescript-eslint/no-explicit-any */
/**
 * Report controller handling the report routes.
 */

import { Request, Response } from 'express'
import { ReportDto } from '@api/generated'
import { ReportDao } from '@prisma/client'
import {
  checkIfReportBelongsToProject,
  createReport,
  deleteReport,
  findAllReports,
  findReportById,
  findReportsByProjectId,
  getReportsWithQueryWord3Times,
  updateReport,
} from '../services/reportService'
import {
  validateNewReport,
  validateReportId,
  validateReportText,
} from '../services/validators/reportValidatorService'
import { convertReportDaoToDto } from '../services/converters/reportConverterService'
import { validateProjectId } from '../services/validators/projectValidatorService'

/**
 * Retrieves all reports (possibly filtered by content).
 * @param {Request<any, any, any, { query: string }>} req The incoming request including the query string to search for.
 * @param {Response<ReportDto[]>} res The outgoing response with the reports.
 */
export const getReports = async (
  req: Request<any, any, any, { query: string }>,
  res: Response<ReportDto[]>,
) => {
  if (req.query.query === undefined) {
    const reportDaos: ReportDao[] = await findAllReports()
    const reportDtos: ReportDto[] = reportDaos.map(convertReportDaoToDto)

    res.status(200).json(reportDtos)
  } else {
    const queryString = validateReportText(req.query.query)

    const reportDaosWithText: ReportDao[] =
      await getReportsWithQueryWord3Times(queryString)
    const reportDtosWithText: ReportDto[] = reportDaosWithText.map(
      convertReportDaoToDto,
    )

    res.status(200).json(reportDtosWithText)
  }
}

/**
 * Get all reports for a project.
 * @param {Request<any, any, { projectId: string }>} req The incoming request with the project ID.
 * @param {Response<ReportDto[]>} res The outgoing response with the reports.
 */
export const getProjectsByProjectIdReports = async (
  req: Request<any, any, { projectId: string }>,
  res: Response<ReportDto[]>,
) => {
  const projectId = validateProjectId(req.params.projectId)

  const reportDaos: ReportDao[] = await findReportsByProjectId(projectId)
  const reportDtos: ReportDto[] = reportDaos.map(convertReportDaoToDto)

  res.status(200).json(reportDtos)
}

/**
 * Creates a new report for a project.
 * @param {Request<any, any, ReportDto, { projectId: string }>} req The incoming request with the new report data.
 * @param {Response<ReportDto>} res The outgoing response with the created report.
 */
export const postProjectsByProjectIdReports = async (
  req: Request<any, any, ReportDto, { projectId: string }>,
  res: Response<ReportDto>,
) => {
  const projectId = validateProjectId(req.params.projectId)
  const newReportDto: ReportDto = validateNewReport(req.body)
  // ensure consistency between project_id in the request body and the project_id in the URL
  newReportDto.project_id = projectId

  const createdReportDao: ReportDao = await createReport(newReportDto)
  const createdReportDto: ReportDto = convertReportDaoToDto(createdReportDao)

  res.status(201).json(createdReportDto)
}

/**
 * Retrieves a report by its ID.
 * @param {Request<any, any, { projectId: string; reportId: string }>} req The incoming request with the project and report ID.
 * @param {Response<ReportDto>} res The outgoing response with the retrieved report.
 */
export const getProjectsByProjectIdReportsByReportId = async (
  req: Request<any, any, { projectId: string; reportId: string }>,
  res: Response<ReportDto>,
) => {
  const projectId = validateProjectId(req.params.projectId)
  const reportId = validateReportId(req.params.reportId)
  await checkIfReportBelongsToProject(reportId, projectId)

  const reportDao: ReportDao = await findReportById(reportId)
  const reportDto: ReportDto = convertReportDaoToDto(reportDao)

  res.status(200).json(reportDto)
}

/**
 * Updates a report by its ID.
 * @param {Request<any, any, ReportDto, { projectId: string; reportId: string }>} req The incoming request with the project and report ID and the updated report data.
 * @param {Response<ReportDto>} res The outgoing response with the updated report.
 */
export const putProjectsByProjectIdReportsByReportId = async (
  req: Request<any, any, ReportDto, { projectId: string; reportId: string }>,
  res: Response<ReportDto>,
) => {
  const projectId = validateProjectId(req.params.projectId)
  const reportId = validateReportId(req.params.reportId)
  await checkIfReportBelongsToProject(reportId, projectId)

  const toUpdateReportDto: ReportDto = validateNewReport(req.body)
  // ensure consistency between report_id in the request body and the report_id in the URL
  toUpdateReportDto.id = reportId

  const updatedReportDao: ReportDao = await updateReport(toUpdateReportDto)
  const updatedReportDto: ReportDto = convertReportDaoToDto(updatedReportDao)

  res.status(200).json(updatedReportDto)
}

/**
 * Deletes a report by its ID.
 * @param {Request<any, any, { projectId: string; reportId: string }>} req The incoming request with the project and report ID.
 * @param {Response} res The outgoing response.
 */
export const deleteProjectsByProjectIdReportsByReportId = async (
  req: Request<any, any, { projectId: string; reportId: string }>,
  res: Response,
) => {
  const projectId = validateProjectId(req.params.projectId)
  const reportId = validateReportId(req.params.reportId)
  await checkIfReportBelongsToProject(reportId, projectId)

  await deleteReport(reportId)

  res.status(204).send()
}
