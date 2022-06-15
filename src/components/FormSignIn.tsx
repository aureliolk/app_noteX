import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useState } from 'react';
import { Loading } from './LoadingComponents';
const axios = require("axios").default

export const FormSignIn = () => {
    const [msg, setMsg] = useState("")
    const [status, setStatus] = useState(Number)
    const [isLoading, setIsLoaging] = useState(false)
    const router = useRouter()

    return (
        <Formik
            initialValues={{ user: '', password: '', firstName: '', lastName: '', checkPassword: '' }}

            validate={values => {
                const errors: any = {};
                if (!values.firstName) {
                    errors.firstName = 'Requerido'
                } else if (!values.user) {
                    errors.user = 'Requerido';
                } else if (!values.password) {
                    errors.password = "Requerido"
                } else if (values.password !== values.checkPassword) {
                    errors.checkPassword = "As senhão não são iguais"
                }
                return errors;
            }}

            onSubmit={async (values) => {
                setIsLoaging(true)
                const data = {
                    ...values
                }
                const loginUser = await axios.post("/api/user/signin", {
                    ...data
                })
                    .catch((error: any) => {
                        if (error.response) {
                            setMsg(error.response.data.msg);
                            setStatus(error.response.status);
                        }
                        setIsLoaging(false)
                        setTimeout(() => {
                            setMsg("")
                        }, 3000);
                        return
                    });
                setStatus(loginUser.status)
                if (loginUser.data.token) {
                    setCookie(undefined, 'c.token', loginUser.data.token, {
                        maxAge: 60 * 60 * 1  //1 hour
                    })
                    setMsg(loginUser.data.msg)
                    setIsLoaging(false)
                    setTimeout(() => {
                        setMsg("")
                    }, 3000);
                    router.reload()
                }
                setMsg(loginUser.data.msg)
                setIsLoaging(false)
                setTimeout(() => {
                    setMsg("")
                }, 3000);
                return
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit} className={"flex flex-col gap-2 text-sm"}>
                    <div className='flex items-center justify-between gap-2'>
                        <input
                            className='code-highlight bg-code-highlight p-2 outline-none w-1/2'
                            type="text"
                            name="firstName"
                            placeholder='Nome'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                        />
                        <input
                            className='code-highlight bg-code-highlight p-2 outline-none w-1/2'
                            type="text"
                            name="lastName"
                            placeholder='Sobrenome'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                        />
                    </div>
                    {errors.firstName && <div className='text-xs text-red-600'>{errors.firstName}</div>}
                    <input
                        className='code-highlight bg-code-highlight p-2 outline-none'
                        type="text"
                        name="user"
                        placeholder='Nome de Usuario'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.user}
                    />
                    {errors.user && <div className='text-xs text-red-600'>{errors.user}</div>}
                    <div className='flex justify-between items-center'>
                        <input
                            className='code-highlight bg-code-highlight p-2 outline-none w-1/2'
                            type="password"
                            name="password"
                            placeholder='Senha'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        <input
                            className='code-highlight bg-code-highlight p-2 outline-none w-1/2'
                            type="password"
                            name="checkPassword"
                            placeholder='Senha'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.checkPassword}
                        />
                    </div>
                    {errors.password ? <div className='text-xs text-red-600'>{errors.password}</div> : errors.checkPassword && <div className='text-xs text-red-600'>{errors.checkPassword}</div>}

                    <button
                        className='rounded-md p-2 h-9 text-xs text-slate-200 bg-sky-500 font-semibold  hover:shadow-sky-200 hover:bg-sky-400 flex justify-center items-center'
                        type="submit" disabled={isSubmitting}
                    >
                        {isLoading ? <Loading /> : "Cadastrar"}
                    </button>

                    {status === 400 ? (
                        <div className='text-xs text-red-600'>{msg}</div>
                    ) : (
                        <div className='text-xs text-green-600'>{msg}</div>
                    )}
                </form>
            )}
        </Formik>
    )
}


