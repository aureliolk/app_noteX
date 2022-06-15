import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { Headers } from '../components/HeaderComponents'
import { List } from '../components/ListComponents'
import jwt from 'jsonwebtoken';
import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
const axios = require("axios").default

export type UserProps = {
  id?: any
  firstName?: string
  lastName?: string
  email?: string
  color?: string
  notes?: NotesProps
}

export type NotesProps = {
  id?: string
  title?: string
  notes?: string
  color?: string
  bgcolor?: string
}

export function Home({id,firstName}: any) {
  const {setUser,user,setUserId, userId} = useContext(AuthContext)
  
  useEffect(()=>{
    setUserId(id)
    setUser(firstName)
  },[])

  return (
    <div >
      <Head>
        <title>FullStacks Notes</title>
      </Head>
      <div>
        <Headers  />
        <List  />
      </div>
    </div>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'c.token': token } = parseCookies(ctx)
  if (!token) {
    return {
      props: {}
    }
  }
  const user: any = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as any)
  
  return {
    props: { ...user }
  }
}
