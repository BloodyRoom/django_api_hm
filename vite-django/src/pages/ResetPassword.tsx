import {Button, Form, Input} from "antd";
import type {ILoginUser} from "../types/account/ILoginUser.ts";
import axios, { AxiosError } from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import type {ILoginError} from "../types/account/ILoginError.ts";

import { useParams } from "react-router";

const ResetPassword = () => {
    const [form] = Form.useForm<ILoginUser>();
    const { uid, token } = useParams();

    const [error, setError] = useState<string | null>();
    const [sended, setSended] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("access") !== null || localStorage.getItem("refresh") !== null) {
            navigate("/me");
        }
    }, []);

    const onFinish = async (values: ILoginUser) => {
        setError(null);

        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/users/password-reset-confirm/`,
                {
                    new_password: values.password,
                    token: token,
                    uid: uid,
                }
            ).then(() => setSended(true));

            navigate("/me");
        } catch (error) {
            const err = error as AxiosError<ILoginError>;

            if (err.response) {
                const {status, data} = err.response;

                if (status === 400 && data) {
                    if (data.non_field_errors) {
                        setError(data.non_field_errors);
                    }
                }
            }
        }
    };

    return (
        <div className={"min-h-screen xl:flex"}>
            <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
                    Відновлення пароля
                </h1>

                <div className="overflow-hidden rounded-2xl
                    border border-gray-200 bg-white px-4 pb-3 pt-4
                    dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">

                    <div className="max-w-full overflow-x-auto">
                        <Form onFinish={onFinish}
                            // className={"w-full"}
                              form={form}
                              layout={"vertical"}
                        >
                            {!sended && (
                                <>
                                    {error && (
                                        <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-3">
                                            <p className={"text-red-600"}>{error}</p>
                                        </div>
                                    )}

                                    <Form.Item<ILoginUser>
                                        label={"Новий пароль"}
                                        name={"password"}
                                        rules={[{
                                            required: true,
                                            message: "Вкажіть пароль"
                                        },
                                            {max: 20, message:"Пароль не може містити більше 20 символів"},
                                            {
                                                pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                                message: "Пароль має містити 1 велику, 1 маленьку букву, 1 цифру і 1 спеціальний символ"
                                            }]}
                                    >
                                        <Input.Password/>
                                    </Form.Item>

                                    <Form.Item<ILoginUser>
                                        label={"Підтвердження паролю"}
                                        name={"confirmPassword"}
                                        rules={[
                                            {required: true, message: "Вкажіть підтвердження пароль"},
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Паролі не збігаються!'));
                                                },
                                            }),
                                            {max:20, message:"Пароль не може містити більше ніж 20 символів"}
                                        ]}
                                    >
                                        <Input.Password/>
                                    </Form.Item>

                                    <div className={"flex items-center gap-3"}>
                                        <Form.Item label={null} className={"m-0"}>
                                            <Button type="primary" htmlType="submit">
                                                Змінити пароль
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </>
                            )}

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;