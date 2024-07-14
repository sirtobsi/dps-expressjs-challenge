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

export const getProjectsByProjectIdReports = async (
  req: Request<any, any, any, { projectId: string }>,
  res: Response<ReportDto[]>,
) => {
  const projectId = validateProjectId(req.query.projectId)

  const reportDaos: ReportDao[] = await findReportsByProjectId(projectId)
  const reportDtos: ReportDto[] = reportDaos.map(convertReportDaoToDto)

  res.status(200).json(reportDtos)
}

export const postProjectsByProjectIdReports = async (
  req: Request<any, any, ReportDto, { projectId: string }>,
  res: Response<ReportDto>,
) => {
  const projectId = validateProjectId(req.query.projectId)
  const newReportDto: ReportDto = validateNewReport(req.body)
  // ensure consistency between project_id in the request body and the project_id in the URL
  newReportDto.project_id = projectId

  const createdReportDao: ReportDao = await createReport(newReportDto)
  const createdReportDto: ReportDto = convertReportDaoToDto(createdReportDao)

  res.status(201).json(createdReportDto)
}

export const getProjectsByProjectIdReportsByReportId = async (
  req: Request<any, any, any, { projectId: string; reportId: string }>,
  res: Response<ReportDto>,
) => {
  const projectId = validateProjectId(req.query.projectId)
  const reportId = validateReportId(req.query.reportId)
  await checkIfReportBelongsToProject(reportId, projectId)

  const reportDao: ReportDao = await findReportById(reportId)
  const reportDto: ReportDto = convertReportDaoToDto(reportDao)

  res.status(200).json(reportDto)
}

export const putProjectsByProjectIdReportsByReportId = async (
  req: Request<any, any, ReportDto, { projectId: string; reportId: string }>,
  res: Response<ReportDto>,
) => {
  const projectId = validateProjectId(req.query.projectId)
  const reportId = validateReportId(req.query.reportId)
  await checkIfReportBelongsToProject(reportId, projectId)

  const toUpdateReportDto: ReportDto = validateNewReport(req.body)
  // ensure consistency between report_id in the request body and the report_id in the URL
  toUpdateReportDto.id = reportId

  const updatedReportDao: ReportDao = await updateReport(toUpdateReportDto)
  const updatedReportDto: ReportDto = convertReportDaoToDto(updatedReportDao)

  res.status(200).json(updatedReportDto)
}

export const deleteProjectsByProjectIdReportsByReportId = async (
  req: Request<any, any, any, { projectId: string; reportId: string }>,
  res: Response,
) => {
  const projectId = validateProjectId(req.query.projectId)
  const reportId = validateReportId(req.query.reportId)
  await checkIfReportBelongsToProject(reportId, projectId)

  await deleteReport(reportId)

  res.status(204).send()
}
