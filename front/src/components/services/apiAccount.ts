import {createApi} from "@reduxjs/toolkit/query/react";
import {serverBaseQuery} from "../utils/fetchBaseQuery.ts";
import { type IAccountRegister } from "../types/account/IAccountRegister.type.ts";
import { type IRegisterResponse } from "../types/account/IRegisterRespose.ts";
import {serialize} from "object-to-formdata";

export const apiAccount = createApi({
    reducerPath: "apiAccount",
    baseQuery: serverBaseQuery("users"),
    endpoints: (builder) => ({
        register: builder.mutation<IRegisterResponse, IAccountRegister>({
            query: (model) => {
                try {
                    const formData = serialize(model);

                    return {
                        method: "POST",
                        url: "register/",
                        body: formData
                    }
                } catch {
                    throw new Error("Помилка перетворення данних");
                }
            },
        }),
    })
})

export const {
    useRegisterMutation
} = apiAccount;