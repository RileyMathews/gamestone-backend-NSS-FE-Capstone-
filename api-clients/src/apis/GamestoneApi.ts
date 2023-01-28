/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  PatchedUser,
  PatchedUserGame,
  User,
  UserGame,
} from '../models';
import {
    PatchedUserFromJSON,
    PatchedUserToJSON,
    PatchedUserGameFromJSON,
    PatchedUserGameToJSON,
    UserFromJSON,
    UserToJSON,
    UserGameFromJSON,
    UserGameToJSON,
} from '../models';

export interface GamestoneApiUserCreateRequest {
    user: User;
}

export interface GamestoneApiUserDestroyRequest {
    id: number;
}

export interface GamestoneApiUserPartialUpdateRequest {
    id: number;
    patchedUser?: PatchedUser;
}

export interface GamestoneApiUserRetrieveRequest {
    id: number;
}

export interface GamestoneApiUserUpdateRequest {
    id: number;
    user: User;
}

export interface GamestoneApiUsergameCreateRequest {
    userGame: UserGame;
}

export interface GamestoneApiUsergameDestroyRequest {
    id: number;
}

export interface GamestoneApiUsergamePartialUpdateRequest {
    id: number;
    patchedUserGame?: PatchedUserGame;
}

export interface GamestoneApiUsergameRetrieveRequest {
    id: number;
}

export interface GamestoneApiUsergameUpdateRequest {
    id: number;
    userGame: UserGame;
}

/**
 * 
 */
export class GamestoneApi extends runtime.BaseAPI {

    /**
     * viewset for the user model
     */
    async gamestoneApiUserCreateRaw(requestParameters: GamestoneApiUserCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.user === null || requestParameters.user === undefined) {
            throw new runtime.RequiredError('user','Required parameter requestParameters.user was null or undefined when calling gamestoneApiUserCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/gamestone/api/user/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserToJSON(requestParameters.user),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * viewset for the user model
     */
    async gamestoneApiUserCreate(requestParameters: GamestoneApiUserCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.gamestoneApiUserCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * viewset for the user model
     */
    async gamestoneApiUserDestroyRaw(requestParameters: GamestoneApiUserDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling gamestoneApiUserDestroy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/gamestone/api/user/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * viewset for the user model
     */
    async gamestoneApiUserDestroy(requestParameters: GamestoneApiUserDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.gamestoneApiUserDestroyRaw(requestParameters, initOverrides);
    }

    /**
     * viewset for the user model
     */
    async gamestoneApiUserListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<User>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/gamestone/api/user/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserFromJSON));
    }

    /**
     * viewset for the user model
     */
    async gamestoneApiUserList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<User>> {
        const response = await this.gamestoneApiUserListRaw(initOverrides);
        return await response.value();
    }

    /**
     * viewset for the user model
     */
    async gamestoneApiUserPartialUpdateRaw(requestParameters: GamestoneApiUserPartialUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling gamestoneApiUserPartialUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/gamestone/api/user/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: PatchedUserToJSON(requestParameters.patchedUser),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * viewset for the user model
     */
    async gamestoneApiUserPartialUpdate(requestParameters: GamestoneApiUserPartialUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.gamestoneApiUserPartialUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * viewset for the user model
     */
    async gamestoneApiUserRetrieveRaw(requestParameters: GamestoneApiUserRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling gamestoneApiUserRetrieve.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/gamestone/api/user/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * viewset for the user model
     */
    async gamestoneApiUserRetrieve(requestParameters: GamestoneApiUserRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.gamestoneApiUserRetrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * viewset for the user model
     */
    async gamestoneApiUserUpdateRaw(requestParameters: GamestoneApiUserUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling gamestoneApiUserUpdate.');
        }

        if (requestParameters.user === null || requestParameters.user === undefined) {
            throw new runtime.RequiredError('user','Required parameter requestParameters.user was null or undefined when calling gamestoneApiUserUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/gamestone/api/user/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UserToJSON(requestParameters.user),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * viewset for the user model
     */
    async gamestoneApiUserUpdate(requestParameters: GamestoneApiUserUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.gamestoneApiUserUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * class for user game viewset
     */
    async gamestoneApiUsergameCreateRaw(requestParameters: GamestoneApiUsergameCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserGame>> {
        if (requestParameters.userGame === null || requestParameters.userGame === undefined) {
            throw new runtime.RequiredError('userGame','Required parameter requestParameters.userGame was null or undefined when calling gamestoneApiUsergameCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/gamestone/api/usergame/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserGameToJSON(requestParameters.userGame),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserGameFromJSON(jsonValue));
    }

    /**
     * class for user game viewset
     */
    async gamestoneApiUsergameCreate(requestParameters: GamestoneApiUsergameCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserGame> {
        const response = await this.gamestoneApiUsergameCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * class for user game viewset
     */
    async gamestoneApiUsergameDestroyRaw(requestParameters: GamestoneApiUsergameDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling gamestoneApiUsergameDestroy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/gamestone/api/usergame/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * class for user game viewset
     */
    async gamestoneApiUsergameDestroy(requestParameters: GamestoneApiUsergameDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.gamestoneApiUsergameDestroyRaw(requestParameters, initOverrides);
    }

    /**
     * class for user game viewset
     */
    async gamestoneApiUsergameListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<UserGame>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/gamestone/api/usergame/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserGameFromJSON));
    }

    /**
     * class for user game viewset
     */
    async gamestoneApiUsergameList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<UserGame>> {
        const response = await this.gamestoneApiUsergameListRaw(initOverrides);
        return await response.value();
    }

    /**
     * class for user game viewset
     */
    async gamestoneApiUsergamePartialUpdateRaw(requestParameters: GamestoneApiUsergamePartialUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserGame>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling gamestoneApiUsergamePartialUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/gamestone/api/usergame/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: PatchedUserGameToJSON(requestParameters.patchedUserGame),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserGameFromJSON(jsonValue));
    }

    /**
     * class for user game viewset
     */
    async gamestoneApiUsergamePartialUpdate(requestParameters: GamestoneApiUsergamePartialUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserGame> {
        const response = await this.gamestoneApiUsergamePartialUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * class for user game viewset
     */
    async gamestoneApiUsergameRetrieveRaw(requestParameters: GamestoneApiUsergameRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserGame>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling gamestoneApiUsergameRetrieve.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/gamestone/api/usergame/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserGameFromJSON(jsonValue));
    }

    /**
     * class for user game viewset
     */
    async gamestoneApiUsergameRetrieve(requestParameters: GamestoneApiUsergameRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserGame> {
        const response = await this.gamestoneApiUsergameRetrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * class for user game viewset
     */
    async gamestoneApiUsergameUpdateRaw(requestParameters: GamestoneApiUsergameUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserGame>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling gamestoneApiUsergameUpdate.');
        }

        if (requestParameters.userGame === null || requestParameters.userGame === undefined) {
            throw new runtime.RequiredError('userGame','Required parameter requestParameters.userGame was null or undefined when calling gamestoneApiUsergameUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // tokenAuth authentication
        }

        const response = await this.request({
            path: `/gamestone/api/usergame/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UserGameToJSON(requestParameters.userGame),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserGameFromJSON(jsonValue));
    }

    /**
     * class for user game viewset
     */
    async gamestoneApiUsergameUpdate(requestParameters: GamestoneApiUsergameUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserGame> {
        const response = await this.gamestoneApiUsergameUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
