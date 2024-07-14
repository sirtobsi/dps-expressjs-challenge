/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReportDto } from '../models/ReportDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReportsService {
    /**
     * Get all reports of a project
     * Get all reports of a project
     * @param projectId ID of the project to get reports
     * @returns ReportDto OK
     * @throws ApiError
     */
    public static getProjectsReports(
        projectId: string,
    ): CancelablePromise<Array<ReportDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectId}/reports',
            path: {
                'projectId': projectId,
            },
        });
    }
    /**
     * Create a report for a project
     * Create a report for a project
     * @param projectId ID of the project to create report for
     * @param requestBody
     * @returns ReportDto Created
     * @throws ApiError
     */
    public static postProjectsReports(
        projectId: string,
        requestBody: ReportDto,
    ): CancelablePromise<ReportDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{projectId}/reports',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get a report of a project
     * Get a report of a project
     * @param projectId ID of the project to get report from
     * @param reportId ID of the report to get
     * @returns ReportDto OK
     * @throws ApiError
     */
    public static getProjectsReports1(
        projectId: string,
        reportId: string,
    ): CancelablePromise<ReportDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectId}/reports/{reportId}',
            path: {
                'projectId': projectId,
                'reportId': reportId,
            },
        });
    }
    /**
     * Update a report of a project
     * Update a report of a project
     * @param projectId ID of the project to update report from
     * @param reportId ID of the report to update
     * @param requestBody
     * @returns ReportDto OK
     * @throws ApiError
     */
    public static putProjectsReports(
        projectId: string,
        reportId: string,
        requestBody: ReportDto,
    ): CancelablePromise<ReportDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/projects/{projectId}/reports/{reportId}',
            path: {
                'projectId': projectId,
                'reportId': reportId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a report of a project
     * Delete a report of a project
     * @param projectId ID of the project to delete report from
     * @param reportId ID of the report to delete
     * @returns void
     * @throws ApiError
     */
    public static deleteProjectsReports(
        projectId: string,
        reportId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/projects/{projectId}/reports/{reportId}',
            path: {
                'projectId': projectId,
                'reportId': reportId,
            },
        });
    }
    /**
     * Get all reports where the given query word occurs at least 3x
     * Get all reports
     * @param query Query word that needs to occur at least 3x
     * @returns ReportDto OK
     * @throws ApiError
     */
    public static getReports(
        query: string,
    ): CancelablePromise<Array<ReportDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/reports',
            query: {
                'query': query,
            },
        });
    }
}
