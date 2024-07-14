/**
 * Utility methods to convert report data DTOs to DAOs and vice versa.
 */

import { ReportDto } from '@api/generated'
import { ReportDao } from '@prisma/client'

/**
 * Converts a report DTO to a report DAO.
 * @param {ReportDto} reportDto The report DTO to convert.
 * @returns {ReportDao} The converted report DAO.
 */
export const convertReportDtoToDao = (reportDto: ReportDto): ReportDao => {
  return {
    id: reportDto.id || '',
    text: reportDto.text,
    projectId: reportDto.project_id,
  }
}

/**
 * Converts a report DAO to a report DTO.
 * @param {ReportDao} reportDao The report DAO to convert.
 * @returns {ReportDto} The converted report DTO.
 */
export const convertReportDaoToDto = (reportDao: ReportDao): ReportDto => {
  return {
    id: reportDao.id,
    text: reportDao.text,
    project_id: reportDao.projectId,
  }
}
