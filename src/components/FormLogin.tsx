import { Formik } from 'formik';
import { setCookie } from 'nookies';
import { useState } from 'react';
const axios = require("axios").default

export const FormLogin = () => {
    const [msg, setMsg] = useState("")
    const [status, setStatus] = useState(Number)

    return (
        <Formik
            initialValues={{ email: '', password: '' }}

            validate={values => {
                const errors: any = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}

            onSubmit={async (values) => {
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
                    return
                }
                setMsg(loginUser.data.msg)
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
                    <input
                        className='code-highlight bg-code-highlight p-2 outline-none'
                        type="email"
                        name="email"
                        placeholder='Email'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    <div className='text-xs text-red-600'>{errors.email && touched.email && errors.email}</div>
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
                        className='rounded-md p-2 text-xs text-slate-200 bg-sky-500 font-semibold  hover:shadow-sky-200 hover:bg-sky-400'
                        type="submit" disabled={isSubmitting}
                    >
                        Entrar
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