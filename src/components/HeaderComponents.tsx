import { useState } from "react"
import { FaUserCircle } from "react-icons/fa"
import { destroyCookie } from "nookies"
import { useRouter } from "next/router"
import { UserProps } from "../pages"

export const Headers = (user: UserProps) => {
    const [userMenu, setUserMenu] = useState(false)
    const router = useRouter()
    async function signOut() {
        destroyCookie(undefined, "c.token")
        router.reload()
    }
    return (
        <div className="sticky top-0 z-40 backdrop-blur transition-colors duration-500 w-full bg-slate-900/75 border-b border-slate-50/[0.06] py-4" onMouseLeave={() => setUserMenu(false)}>
            <div className="w-11/12 m-auto flex items-center justify-center">
                <div className="w-1/5">
                </div>
                <div className="w-full flex items-center justify-center">
                    <p className=" text-xs leading-5 font-medium text-sky-400 bg-sky-400/10 rounded-full py-1  px-3 hidden xl:flex items-center hover:bg-sky-400/20"><strong>Primeira nota aqui</strong></p>
                </div>
                <div className="w-1/5 text-2xl flex justify-end items-center flex-col relative ">
                    {user.firstName && (
                        <>
                            <FaUserCircle className={`cursor-pointer ${userMenu ? "text-slate-200" : "text-slate-400"}`} onMouseEnter={() => setUserMenu(true)} />
                            {userMenu && (
                                <div className="absolute top-7 shadow-xl flex bg-slate-900/70 backdrop-blur ring-1 ring-inset ring-white/10 text-xs p-2 text-slate-200 w-32 justify-center rounded cursor-pointer hover:underline" onClick={() => signOut()} >
                                    Sair
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
