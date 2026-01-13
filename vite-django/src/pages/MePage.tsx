import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { type IUser } from "../types/account/IUser.ts";

import {Button} from "antd";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const MePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const effectAxios = async () => {
            const access = localStorage.getItem("access");
            const refresh = localStorage.getItem("refresh");

            if (!access || !refresh) {
                navigate("/login");
                return;
            }

            try {
                await axios.get(`${API_URL}/api/users/me/`, {
                    headers: {
                        Authorization: `Bearer ${access}`,
                    },
                }).then(res => {
                    console.log(res);
                    setUser(res.data);
                })
            } catch (error) {
                const err = error as AxiosError;

                if (err.response?.status === 401) {
                    try {
                        const refreshRes = await axios.post(
                            `${API_URL}/api/users/refresh/`,
                            {refresh}
                        );

                        const newAccess = refreshRes.data.access;

                        localStorage.setItem("access", newAccess);

                        await axios.get(`${API_URL}/api/users/me/`, {
                            headers: {
                                Authorization: `Bearer ${newAccess}`,
                            },
                        }).then(res => {
                            setUser(res.data);
                        });
                    } catch {
                        localStorage.removeItem("access");
                        localStorage.removeItem("refresh");
                        navigate("/login");
                    }
                } else {
                    navigate("/login");
                }
            }
        };

        effectAxios();
    }, []);

    return (
        <div className={"flex justify-center items-center flex-col h-screen gap-4"}>
            {user?.image_small !== null && (
                <img src={`${import.meta.env.VITE_API_BASE_URL}${user?.image_small}`} alt=""/>
            )}

            <div className={"flex items-center gap-3"}>
                <h1>{user?.last_name} {user?.first_name}, {user?.username}</h1>

                <Button type="primary" onClick={() => {
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    navigate("/login");
                }}>
                    Вихід
                </Button>
            </div>
        </div>
    );
};

export default MePage;
