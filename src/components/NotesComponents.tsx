import { Login } from "./LoginComponents"

export const NotesList = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl  font-extrabold tracking-tight text-slate-200">FullStack NoteX</h1>
            <h3 className="text-base tracking-tight text-slate-200">Adicione e Remova Notas Facilmente</h3>

            <div className="flex justify-between m-8 p-8  w-full gap-2">
                <div className="w-2/5">
                    <Login />
                </div>
                <div className="w-full">
                    <p>Notes List</p>
                </div>
            </div>
        </div>
    )
}
