import { Formik } from "formik"
import { useState } from "react"
import { FaTelegramPlane } from "react-icons/fa"
import { RiCheckboxBlankCircleFill } from "react-icons/ri"
import { TiArrowBack } from "react-icons/ti"
import { Loading } from "./LoadingComponents"


export const FormUpdateNotes = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isUpdate, setIsUpdate] = useState(true)

    return (
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
                            <button type="button" onClick={() => { setIsForm(false), setIsUpdate(true) }} className="absolute bottom-3 left-3 z-10 ">
                                <TiArrowBack className={`${selectColor} text-2xl`} />
                            </button>
                        </form>
                    </div>
                )}
            </Formik>
        </>
    )
}