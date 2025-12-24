import React, {useState} from "react";
import { type IAccountRegister } from "../../components/types/account/IAccountRegister.type.ts";
import { useRegisterMutation } from "../../components/services/apiAccount.ts";
import { useNavigate } from "react-router";

const RegisterPage = () => {
    const [form, setForm] = useState<IAccountRegister>({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        image: null,
        password: "",
    })
    const [errors, setErrors] = useState<Record<string, string[]>>({});


    const [registerAccount] = useRegisterMutation();

    const navigator = useNavigate();

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value,
        })
    }

    const handlerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm({
                ...form,
                image: file,
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try
        {
            await registerAccount(form).unwrap();
            navigator("/");
        }
        catch (e : any)
        {
            if (e?.status === 400 && e?.data) {
                setErrors(e.data);
            }
            console.error("Problem with send data", e);
        }
    }

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Рєстрація
                            </h1>
                            <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Назва користувача</label>
                                    <input 
                                        type="text" 
                                        name="username" 
                                        id="username" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="qwe" 
                                        required 
                                        onChange={handlerChange}
                                        value={form.username}
                                    />
                                    {errors.username && (
                                        <div className="text-red-400">
                                            {errors.username[0]}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ім'я</label>
                                    <input 
                                        type="text" 
                                        name="first_name" 
                                        id="first_name" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Maksym" 
                                        required 
                                        onChange={handlerChange}
                                        value={form.first_name}
                                    />
                                    {errors.first_name && (
                                        <div className="text-red-400">
                                            {errors.first_name[0]}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Прізвище</label>
                                    <input 
                                        type="text" 
                                        name="last_name" 
                                        id="last_name" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Asdfg" 
                                        required 
                                        onChange={handlerChange}
                                        value={form.last_name}
                                    />
                                    {errors.last_name && (
                                        <div className="text-red-400">
                                            {errors.last_name[0]}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пошта</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="name@company.com" 
                                        required 
                                        onChange={handlerChange}
                                        value={form.email}
                                    />
                                    {errors.email && (
                                        <div className="text-red-400">
                                            {errors.email[0]}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        placeholder="••••••••" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        required 
                                        onChange={handlerChange}
                                        value={form.password}
                                    />
                                    {errors.password && (
                                        <div className="text-red-400">
                                            {errors.password[0]}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Повтор пароля</label>
                                    <input 
                                        type="confirm_password" 
                                        name="confirm_password" 
                                        id="confirm_password" 
                                        placeholder="••••••••" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        required 
                                    />
                                    {errors.confirm_password && (
                                        <div className="text-red-400">
                                            {errors.confirm_password[0]}
                                        </div>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">Аватарка</label>
                                    <input 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="image" 
                                        name="image" 
                                        type="file" 
                                        required 
                                        onChange={handlerImageChange}
                                    />
                                    {errors.image && (
                                        <div className="text-red-400">
                                            {errors.image[0]}
                                        </div>
                                    )}
                                </div>

                                <button type="submit" className="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 mt-4">Зарєструватися</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
  );
}

export default RegisterPage;