import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext";
import {  UserProps } from "../pages"
import { Auth } from "./AuthComponents"
import { Notes } from "./NotesComponents";
const axios = require("axios").default;


export const List = (data:UserProps) => {
    const {userId} = useContext(AuthContext)
   
    return (
        <div className="flex flex-col items-center justify-center p-8 ">
            <h1 className="text-3xl  font-extrabold tracking-tight text-slate-200">FullStack NoteX</h1>
            <h3 className="text-base tracking-tight text-slate-200">Adicione e Remova Notas Facilmente</h3>

            <div className="flex justify-between m-8 p-8  w-full gap-2">

                {userId ? (
                    <div className="w-full ring-1 ring-inset ring-white/10 rounded-xl p-8 ">
                        <Notes />
                    </div>
                ) : (
                    <>
                        <div className="w-2/5">
                            <Auth />
                        </div>
                        <div className="w-full ring-1 ring-inset ring-white/10 rounded-xl p-8 rounded-br-none">
                            {/* <Notes  /> */}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
