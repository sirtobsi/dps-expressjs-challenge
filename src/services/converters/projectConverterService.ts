/**
 * Utility methods for converting project data DTOs to DAOs and vice versa.
 */

import { ProjectDto } from '@api/generated'
import { ProjectDao } from '@prisma/client'
import { findReportsByProjectId } from '../reportService'
import { convertReportDaoToDto } from './reportConverterService'

/**
 * Converts a project DTO to a project DAO.
 * @param {ProjectDto} projectDto The project DTO to convert.
 * @returns {ProjectDao} The converted project DAO.
 */
export const convertProjectDtoToDao = (projectDto: ProjectDto): ProjectDao => {
  return {
    id: projectDto.id || '',
    name: projectDto.name,
    description: projectDto.description,
  }
}

/**
 * Converts a project DAO to a project DTO.
 * @param {ProjectDao} projectDao The project DAO to convert.
 * @returns {Promise<ProjectDto>} The converted project DTO.
 */
export const convertProjectDaoToDto = async (
  projectDao: ProjectDao,
): Promise<ProjectDto> => {
  const reportDaos = await findReportsByProjectId(projectDao.id)
  const reportDtos = reportDaos.map(convertReportDaoToDto)
  return {
    id: projectDao.id,
    name: projectDao.name,
    description: projectDao.description,
    reports: reportDtos,
  }
}
