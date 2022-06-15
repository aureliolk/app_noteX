import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useState } from 'react';
import { Loading } from './LoadingComponents';
const axios = require("axios").default

export const FormLogin = () => {
    const [msg, setMsg] = useState("")
    const [status, setStatus] = useState(Number)
    const [isLoading, setIsLoaging] = useState(false)
    const router =  useRouter()

    return (
        <Formik
            initialValues={{ user: '', password: '' }}

            validate={values => {
                const errors: any = {};
                if (!values.user) {
                    errors.user = 'Required';
                }
                return errors;
            }}

            onSubmit={async (values) => {
                setIsLoaging(true)
                const data = {
                    ...values
                }
                const loginUser = await axios.post("/api/user/login", {
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
                    setTimeout(() => {
                        setMsg("")
                    }, 3000);
                    setIsLoaging(false)
                    router.reload()
                }
                setMsg(loginUser.data.msg)
                setTimeout(() => {
                    setMsg("")
                }, 3000);
                setIsLoaging(false)
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
                <div>
                    <form onSubmit={handleSubmit} className={"flex flex-col gap-2 text-sm"}>
                    <input
                        className='code-highlight bg-code-highlight p-2 outline-none'
                        type="text"
                        name="user"
                        placeholder='Nome de Usuario'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.user}
                    />
                    <div className='text-xs text-red-600'>{errors.user}</div>
                    <input
                        className='code-highlight bg-code-highlight p-2 outline-none'
                        type="password"
                        name="password"
                        placeholder='Senha'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    <div className='text-xs text-red-600'>{errors.password && touched.password && errors.password}</div>
                    <button
                        className='rounded-md h-9 p-2 text-xs text-slate-200 bg-sky-500 font-semibold  hover:shadow-sky-200 hover:bg-sky-400 flex justify-center items-center'
                        type="submit" disabled={isSubmitting}
                    >
                        {isLoading ? <Loading /> : "Entrar"}
                    </button>

                    {status === 400 ? (
                        <div className='text-xs text-red-600'>{msg}</div>
                    ) : (
                        <div className='text-xs text-green-600'>{msg}</div>
                    )}
                </form>
                <div className='py-4 text-center font-bold text-slate-200 '>
                    <h2>Cadastre-se e guarde sua nota!</h2>
                </div>
                </div>
            )}
        </Formik>
    )
}