import {Button, Form, Input} from "antd";
import type {ILoginUser} from "../types/account/ILoginUser.ts";
import axios, { AxiosError } from "axios";
import {useState} from "react";
import type {ILoginError} from "../types/account/ILoginError.ts";

const LoginPage = () => {
    const [form] = Form.useForm<ILoginUser>();

    const [error, setError] = useState<string | null>();
    const [sended, setSended] = useState<boolean>(false);

    const onFinish = async (values: ILoginUser) => {
        setError(null);

        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/users/password-reset/`,
                values
            ).then(() => setSended(true));
        } catch (error) {
            const err = error as AxiosError<ILoginError>;

            if (err.response) {
                const {status, data} = err.response;

                if (status === 400 && data) {
                    if (data.non_field_errors) {
                        setError(data.non_field_errors);
                    }

                    if (data.email) {
                        setError(data.email);
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
                                        label={"Електронна пошта"}
                                        name={"email"}
                                        rules={[{ required: true, message: 'Вкажіть пошту'}]}
                                    >
                                        <Input/>
                                    </Form.Item>

                                    <div className={"flex items-center gap-3"}>
                                        <Form.Item label={null} className={"m-0"}>
                                            <Button type="primary" htmlType="submit">
                                                Надіслати
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </>
                            )}

                            {sended && (
                                <>
                                    <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-1">
                                        <p className={"text-green-600"}>На пошту {form.getFieldValue("email")} відправлено лист</p>
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

export default LoginPage;