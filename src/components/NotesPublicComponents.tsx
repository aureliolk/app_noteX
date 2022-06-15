
import { Formik } from "formik"
import { useContext, useEffect, useState } from "react"
import { AiFillPlusCircle } from "react-icons/ai"
import { RiCheckboxBlankCircleFill } from "react-icons/ri"
import { FaTelegramPlane, FaEdit } from "react-icons/fa"
import { TiArrowBack } from "react-icons/ti"
import { BsTrashFill } from "react-icons/bs"
import { NotesProps } from "../pages"
import { Loading } from "./LoadingComponents"
import { AuthContext } from "../contexts/AuthContext"
const axios = require("axios").default;


type NotesProp = {
    id?: string
    notes?: NotesProps | any
    grid?: string
}

export const NotesPublicComponents = () => {
    const {userId} = useContext(AuthContext)
    const [selectColor, setSelectColor] = useState<string | undefined>("text-[#0f172a]")
    const [selectBG, setSelectBg] = useState<string | undefined>('bg-slate-800')
    const [isForm, setIsForm] = useState(false)
    const [idButton, setIdButton] = useState<string | undefined>()
    const [isUpdate, setIsUpdate] = useState(true)
    const [notes, setNotes] = useState<any>()
    const [isLoading, setIsLoading] = useState(false)

    // useEffect(() => {
    //     async function getUser() {
    //       await axios.get('/api/notes', {
    //             params: {
    //               id:userId
    //             }
    //           })
    //           .then(function (res:any) {
    //             setNotes(res.data.listNotes);
    //           })
    //           .catch(function (error:any) {
    //             console.log(error);
    //           })  
    //     }
    //     getUser()
    // }, [isLoading])

   
    console.log(notes)

    const color = ["text-[#0f172a]", "text-yellow-700", "text-green-700", "text-red-700"]
    function setColorIndex(colorIndex: number) {
        if (colorIndex === 0) {
            setSelectColor("text-[#0f172a]")
            setSelectBg("bg-slate-800")
        } else if (colorIndex === 1) {
            setSelectColor("text-yellow-700")
            setSelectBg("bg-yellow-200")
        } else if (colorIndex === 2) {
            setSelectColor("text-green-700")
            setSelectBg(`bg-green-200`)
        } else if (colorIndex === 3) {
            setSelectColor("text-red-700")
            setSelectBg(`bg-red-200`)
        }
    }

    async function UpdateNote(id: string | undefined) {
        setIsForm(true)
        setIdButton(id)
        setIsUpdate(false)
    }


    //DELETE NOTES
    async function DeleteNote(id: string | undefined) {
        setIsLoading(true)
        setIdButton(id)
        const deleteNote = await axios.delete(`/api/notes/?id=${id}`)
        console.log(deleteNote)
        setIsLoading(false)
        return
    }

    return (
        <div className="w-full ">
            <div className={`grid grid-cols-3 gap-4`}>
                {notes?.map((note: NotesProps) => {
                    return (
                        <div key={note.id}>
                            {isForm && note.id === idButton ? (
                                <>
                                    <Formik
                                        initialValues={{ title: note.title, notes: note.notes }}
                                        onSubmit={async (values) => {
                                            setIsLoading(true)
                                            const udpdateNotes = await axios.patch("/api/notes", {
                                                id: note.id,
                                                title: values.title,
                                                notes: values.notes,
                                                color: selectColor,
                                                bgcolor: selectBG
                                            })
                                            console.log(udpdateNotes)
                                            setIsLoading(false)
                                            setIsUpdate(true)
                                            return
                                        }}
                                    >
                                        {({
                                            values,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit,
                                            isSubmitting,
                                        }) => (
                                            <div key={note.id} className={`${selectBG} p-2 rounded-xl rounded-bl-none min-h-[180px] min-w-[250px] ring-1 ring-inset ring-white/10 relative`}>
                                                <form onSubmit={handleSubmit} className="rounded-xl rounded-bl-none h-full w-full ring-1 ring-inset ring-white/10 relative flex flex-col">
                                                    <input
                                                        placeholder="Titulo (opcional)"
                                                        type="text"
                                                        name="title"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.title}
                                                        className={`${selectColor} font-semibold text-center  min-h-[26px] w-full outline-none`}
                                                    />
                                                    <textarea
                                                        placeholder="Escreva sua nota"
                                                        name="notes"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.notes}
                                                        className={`${selectColor} text-sm  mt-2 h-full w-full p-1 text-center `}
                                                    />

                                                    <button type="submit" disabled={isSubmitting} className="absolute bottom-3 right-3 z-10">
                                                        {isLoading ? <Loading /> : <FaTelegramPlane className={`${selectColor} text-2xl`} />}
                                                    </button>
                                                    <div className="flex items-center justify-center gap-0 text-base absolute w-full bottom-3">
                                                        {color.map((color, i) => {
                                                            return (
                                                                <button type="button" key={i} onClick={() => { setColorIndex(i) }}><RiCheckboxBlankCircleFill className={color} /></button>
                                                            )
                                                        })}
                                                    </div>
                                                    <button type="button" onClick={() => { setIsForm(false),setIsUpdate(true) }} className="absolute bottom-3 left-3 z-10 ">
                                                        <TiArrowBack className={`${selectColor} text-2xl`} />
                                                    </button>
                                                </form>
                                            </div>
                                        )}
                                    </Formik>
                                </>
                            ) : (
                                <div key={note.id} className={`${note.bgcolor} p-2 rounded-xl rounded-bl-none min-h-[180px] min-w-[250px] ring-1 ring-inset ring-white/10 relative`}>
                                    <div className={`bg-white ${note.color} font-semibold text-center overflow-hidden min-h-[26px] min-w-[235px]`}>{note.title}</div>
                                    <div className={`bg-white ${note.color} text-sm text-center mt-2 min-h-[125px] p-1 min-w-[235px]`}>{note.notes}</div>
                                    <div className="flex justify-between items-center mt-1 text-slate-500">
                                        <button type="button" onClick={() => { UpdateNote(note.id), setSelectColor(note.color), setSelectBg(note.bgcolor) }}>{isLoading && note.id === idButton ? <Loading /> : <FaEdit className="text-2x1" />}</button>
                                        <button type="button" onClick={() => { DeleteNote(note.id) }}>{isLoading && note.id === idButton ? <Loading /> : <BsTrashFill className="text-2x1" />}</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
                {isUpdate && (
                    <>
                        <div className={`${selectBG} relative p-2 rounded-xl min-h-[180px] min-w-[250px] ring-1 ring-inset ring-white/10 flex flex-col items-center justify-center`}>
                            {isForm && idButton === "1234" ? (
                                <>
                                    <Formik
                                        initialValues={{ title: '', notes: '' }}
                                        onSubmit={async (values) => {
                                            setIsLoading(true)
                                            const addNotes = await axios.post("/api/notes", {
                                                id: userId,
                                                title: values.title,
                                                notes: values.notes,
                                                color: selectColor,
                                                bgcolor: selectBG
                                            })
                                            console.log(addNotes)
                                            setIsLoading(false)
                                            setIsForm(false)
                                            return
                                        }}
                                    >
                                        {({
                                            values,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit,
                                            isSubmitting,
                                        }) => (
                                            <form onSubmit={handleSubmit} className="rounded-xl rounded-bl-none h-full w-full ring-1 ring-inset ring-white/10 relative flex flex-col">
                                                <input
                                                    placeholder="Titulo (opcional)"
                                                    type="text"
                                                    name="title"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.title}
                                                    className={`${selectColor} font-semibold text-center  min-h-[26px] w-full outline-none`}
                                                />
                                                <textarea
                                                    placeholder="Escreva sua nota"
                                                    name="notes"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.notes}
                                                    className={`${selectColor} text-sm  mt-2 h-full w-full p-1 text-center `}
                                                />
                                                <button type="submit" disabled={isSubmitting} className="absolute bottom-3 right-3 ">
                                                    {isLoading ? <Loading /> : <FaTelegramPlane className={`${selectColor} text-2xl`} />}
                                                </button>
                                                <button type="button" onClick={() => { setIsForm(false) }} className="absolute bottom-3 left-3 ">
                                                    <TiArrowBack className={`${selectColor} text-2xl`} />
                                                </button>
                                            </form>
                                        )}
                                    </Formik>
                                </>
                            ) :
                                <>
                                    <div className="flex items-center justify-center gap-0 text-3xl absolute top-5">
                                        {color.map((color, i) => {
                                            return (
                                                <button key={i} onClick={() => { setColorIndex(i) }}><RiCheckboxBlankCircleFill className={color} /></button>
                                            )
                                        })}
                                    </div>
                                    <button onClick={() => { setIsForm(true), setIdButton("1234") }}><AiFillPlusCircle className={`text-6xl ${selectColor}`} /></button>
                                </>
                            }
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}