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

import { exists, mapValues } from '../runtime';
/**
 * serializer for user game
 * @export
 * @interface PatchedUserGame
 */
export interface PatchedUserGame {
    /**
     * 
     * @type {number}
     * @memberof PatchedUserGame
     */
    readonly id?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PatchedUserGame
     */
    isFavorited?: boolean;
    /**
     * 
     * @type {number}
     * @memberof PatchedUserGame
     */
    giantbombGame?: number;
}

/**
 * Check if a given object implements the PatchedUserGame interface.
 */
export function instanceOfPatchedUserGame(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PatchedUserGameFromJSON(json: any): PatchedUserGame {
    return PatchedUserGameFromJSONTyped(json, false);
}

export function PatchedUserGameFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatchedUserGame {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'isFavorited': !exists(json, 'isFavorited') ? undefined : json['isFavorited'],
        'giantbombGame': !exists(json, 'giantbomb_game') ? undefined : json['giantbomb_game'],
    };
}

export function PatchedUserGameToJSON(value?: PatchedUserGame | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'isFavorited': value.isFavorited,
        'giantbomb_game': value.giantbombGame,
    };
}

