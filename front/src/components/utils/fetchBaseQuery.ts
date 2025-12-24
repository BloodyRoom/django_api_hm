import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import APP_ENV from "../../env/index.ts";

export const serverBaseQuery = (path: string) => {
    return fetchBaseQuery({
            baseUrl: `${APP_ENV.API_URL}/api/${path}`
        }); 
}