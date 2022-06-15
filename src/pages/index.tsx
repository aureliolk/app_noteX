import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { Headers } from '../components/HeaderComponents'
import jwt from 'jsonwebtoken';

import { Notes } from '../components/NotesPrivateComponents';
import { Auth } from '../components/AuthComponents';
import { NotesPublicComponents } from '../components/NotesPublicComponents';

const axios = require("axios").default

export type UserProps = {
  id: string | undefined
  notesPrivate: NotesProps
  notesPublic: NotesProps
  firstName: string | undefined
  lastName: string | undefined
}

export type NotesProps = {
  id?: string
  title?: string
  notes?: string
  color?: string
  bgcolor?: string
}

export function Home({ id, firstName, lastName, notesPrivate, notesPublic }: UserProps) {
  console.log(notesPublic)

  return (
    <div >
      <Head>
        <title>FullStacks Notes</title>
      </Head>
      <div>
        <Headers id={id} firstName={firstName} lastName={lastName } />
      </div>
      <div className="flex flex-col items-center justify-center p-8 ">
        <h1 className="text-3xl  font-extrabold tracking-tight text-slate-200">FullStack NoteX</h1>
        <h3 className="text-base tracking-tight text-slate-200">Adicione e Remova Notas Facilmente</h3>
        <div className="flex justify-between m-8 p-8  w-full gap-2">
          {id ? (
            <div className="w-full ring-1 ring-inset ring-white/10 rounded-xl p-8 ">
              <Notes userId={id} listNotes={notesPrivate} />
            </div>
          ) : (
            <>
              <div className="w-2/5">
                <Auth />
              </div>
              <div className="w-full ring-1 ring-inset ring-white/10 rounded-xl p-8 rounded-br-none">
                <NotesPublicComponents listNotes={notesPublic} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'c.token': token } = parseCookies(ctx)
  
  if (!token) {
    return { props: {} }
  }

  const user: any = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as any)
  const notesPrivate = await axios.get(`${process.env.BASE_URL}/api/notes`, {
    params: { id: user.id }
  })
    .then(function (res: any) {
      return res.data.listNotes
    })
  if (!notesPrivate) {
    return { props: { ...user } }
  }

  const notesPublic = await axios.get(`${process.env.BASE_URL}/api/notes`, {
    params: { id: "33642c93-f681-4220-a8cd-53b86fadfedc" } })
    .then(function (res: any) {
      return res.data.listNotes
    })

    console.log(user.id)

  if(!notesPublic){
    return {props:{...user, notesPrivate}}
  }  

  return {
    props: { ...user, notesPrivate, notesPublic }
  }
}
