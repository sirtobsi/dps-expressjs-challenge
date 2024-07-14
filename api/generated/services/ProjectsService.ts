/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProjectDto } from '../models/ProjectDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProjectsService {
    /**
     * Get all projects
     * Get all projects
     * @returns ProjectDto OK
     * @throws ApiError
     */
    public static getProjects(): CancelablePromise<Array<ProjectDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects',
        });
    }
    /**
     * Create a project
     * Create a project
     * @param requestBody
     * @returns ProjectDto Created
     * @throws ApiError
     */
    public static postProjects(
        requestBody: ProjectDto,
    ): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get a project
     * Get a project
     * @param projectId ID of the project to get
     * @returns ProjectDto OK
     * @throws ApiError
     */
    public static getProjects1(
        projectId: string,
    ): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{projectId}',
            path: {
                'projectId': projectId,
            },
        });
    }
    /**
     * Update a project
     * Update a project
     * @param projectId ID of the project to update
     * @param requestBody
     * @returns ProjectDto OK
     * @throws ApiError
     */
    public static putProjects(
        projectId: string,
        requestBody: ProjectDto,
    ): CancelablePromise<ProjectDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/projects/{projectId}',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a project
     * Delete a project
     * @param projectId ID of the project to delete
     * @returns void
     * @throws ApiError
     */
    public static deleteProjects(
        projectId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/projects/{projectId}',
            path: {
                'projectId': projectId,
            },
        });
    }
}
