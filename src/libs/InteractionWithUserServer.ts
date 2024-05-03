import axios from 'axios';
import { SuccessResponseType } from '../types/response';

/**
 * Sets user information.
 * @param {object} userInformation - The information of the user to be set.
 * @returns {Promise<SuccessResponseType | undefined>} undefined if the user already exists, otherwise returns the user information
 */
export async function setUser(userInformation: any): Promise<SuccessResponseType | undefined> {
    try {
        const response = await axios.post(`${process.env.USERS_SERVER!}/users`, userInformation);
        if (response.status !== 200) return undefined;
        return response.data;
    } catch (error) {
        console.error('Error setting user:', error);
        return undefined;
    }
}

/**
 * Gets user information by user ID.
 * @param {string} queryParams - user's email
 * @returns {Promise<SuccessResponseType | undefined>} A promise that resolves with the response data if successful, otherwise undefined.
 */
export async function getUserWithQueryParams( queryParams: string): Promise<SuccessResponseType | undefined> {
    try {
        const response = await axios.get(`${process.env.USERS_SERVER!}/users?email=${queryParams}`);
        if (response.status !== 200) return undefined;
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error getting user with query parameters:', error);
        return undefined;
    }
}