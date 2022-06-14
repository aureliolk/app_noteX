
import { Formik } from "formik"
import { useState } from "react"
import { AiFillPlusCircle } from "react-icons/ai"
import { RiCheckboxBlankCircleFill } from "react-icons/ri"
import {FaTelegramPlane} from "react-icons/fa"
import {TiArrowBack} from "react-icons/ti"

type NotesProps = {
    id?: string
    title?: string
    notes?: string
    grid?: string
}




export const Notes = ({grid,id}: NotesProps) => {
    const [selectColor, setSelectColor] = useState("text-[#0f172a]")
    const [selectBG, setSelectBg] = useState('bg-slate-800')
    const [isFrom, setIsForm] = useState(false)

    function setColorIndex(colorIndex: number) {
        console.log(color, colorIndex)
        if (colorIndex === 0) {
            setSelectColor("text-[#0f172a]")
            setSelectBg("bg-slate-800")
        } else if (colorIndex === 1) {
            setSelectColor("text-yellow-700")
            setSelectBg(`bg-yellow-200`)
        } else if (colorIndex === 2) {
            setSelectColor("text-green-700")
            setSelectBg(`bg-green-200`)
        } else if (colorIndex === 3) {
            setSelectColor("text-red-700")
            setSelectBg(`bg-red-200`)
        }

    }

    const note = [
        {
            id: "1231m23k123m1km231",
            title: "Title Nota Teste",
            notes: "Essa descrição da nota teste, ela precisa conter varios caracteres para simular uma nota de um usuario real. E por esse motivo sugiro que digite"
        },
        // {
        //     id: "1231m23k123m1km213131",
        //     title: "Title Nota Teste",
        //     notes: "Essa descrição da nota teste, ela precisa conter varios caracteres para simular uma nota de um usuario real. E por esse motivo sugiro que digite"
        // },
        // {
        //     id: "1231m23k121231231km231",
        //     title: "Title Nota Teste",
        //     notes: "Essa descrição da nota teste, ela precisa conter varios caracteres para simular uma nota de um usuario real. E por esse motivo sugiro que digite"
        // },
        // {
        //     id: "1231m23k11231231231",
        //     title: "Title Nota Teste",
        //     notes: "Essa descrição da nota teste, ela precisa conter varios caracteres para simular uma nota de um usuario real. E por esse motivo sugiro que digite"
        // },
        // {
        //     id: "1231m23k12123123dasd",
        //     title: "Title Nota Teste",
        //     notes: "Essa descrição da nota teste, ela precisa conter varios caracteres para simular uma nota de um usuario real. E por esse motivo sugiro que digite"
        // },
        // {
        //     id: "1231m23k123masd231123",
        //     title: "Title Nota Teste",
        //     notes: "Essa descrição da nota teste, ela precisa conter varios caracteres para simular uma nota de um usuario real. E por esse motivo sugiro que digite"
        // }
    ]

    const color = ["text-[#0f172a]", "text-yellow-700", "text-green-700", "text-red-700"]

    return (
        <div className="w-full ">
            <div className={`grid ${grid} gap-4`}>
                {note.map((note: NotesProps) => {
                    return (
                        <div key={note.id} className="bg-slate-800 p-2 rounded-xl rounded-bl-none min-h-[180px] min-w-[250px] ring-1 ring-inset ring-white/10 ">
                            <div className="text-slate-200 font-semibold text-center overflow-hidden border min-h-[26px] min-w-[235px]">{note.title}</div>
                            <div className="text-slate-300 text-sm text-center mt-2 min-h-[125px] min-w-[235px]">{note.notes}</div>
                        </div>
                    )
                })}
                <div className={`${selectBG} relative p-2 rounded-xl min-h-[180px] min-w-[250px] ring-1 ring-inset ring-white/10 flex flex-col items-center justify-center`}>
                    {isFrom ? (
                        <>
                            <Formik
                                initialValues={{ title: '', notes: '', color:'', bgcolor:'',id:'' }}
                                validate={values => {
                                    const errors:any = {};
                                    if (!values.notes) {
                                        errors.email = 'Insira uma nota';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        alert(JSON.stringify(values, null, 2));
                                        setSubmitting(false);
                                    }, 400);
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
                                        {errors.notes}
                                        <button type="submit" disabled={isSubmitting} className="absolute bottom-3 right-3 ">
                                            <FaTelegramPlane className={`${selectColor} text-2xl`}/>
                                        </button>
                                        <button type="button" onClick={()=>{setIsForm(false)}} className="absolute bottom-3 left-3 ">
                                            <TiArrowBack className={`${selectColor} text-2xl`}/>
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
                            <button onClick={() => { setIsForm(true) }}><AiFillPlusCircle className={`text-6xl ${selectColor}`} /></button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}