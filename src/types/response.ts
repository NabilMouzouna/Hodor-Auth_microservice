import { userType } from "./user";


export type SuccessResponseType = {
    message : string,
    user : userType,
    accessToken? : string
}