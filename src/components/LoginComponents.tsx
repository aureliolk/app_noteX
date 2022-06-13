import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { FormLogin } from './FormLogin';
import { FormSignIn } from './FormSignIn';


export const Login = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const select: any = "mt-2 text-sky-300 border border-b border-slate-200/5 border-b-sky-300 px-4 py-1 items-center outline-none rounded"



    console.log(selectedIndex)

    return (
        <div className="relative z-10 -ml-10 col-span-3 bg-slate-800 rounded-xl  xl:ml-0 ring-1 ring-inset ring-white/10 p-8 w-full rounded-bl-none">
            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <Tab.List className={"text-sm font-medium tracking-tight text-slate-200 flex items-center justify-center border-b whitespace-nowrap border-slate-200/5"}>
                    <Tab className={`${selectedIndex == 0 && select} py-1 px-4 mt-2`}>
                        Entrar
                    </Tab>
                    <Tab className={`${selectedIndex == 1 && select} py-1 px-4 mt-2`}>
                        Cadastrar</Tab>
                </Tab.List>
                <Tab.Panels className={" h-60 py-4"}>
                    <Tab.Panel>
                        <FormLogin />
                    </Tab.Panel>
                    <Tab.Panel>
                        <FormSignIn />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

