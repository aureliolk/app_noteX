import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { Headers } from '../components/HeaderComponents'
import { List } from '../components/ListComponents'
import jwt from 'jsonwebtoken';
const axios = require("axios").default



type UserProps = {
  id: string
  firstName: string
  lastName: string
  email: string
  color: string
}

export function Home(data: UserProps){

  console.log(data.firstName)
  return (
    <div >
      <Head>
        <title>FullStacks Notes</title>
      </Head>
      <div>
        <Headers firstName={data.firstName} />
        <List id={data.id} firstName={data.firstName}/>

        <div className='h-[100vh]'>

        </div>
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

  // console.log(user.id)
  const listNotes =  await axios.get(`${process.env.BASE_URL}/api/notes/?id=${user.id}`)
  const note = listNotes.data.listNotes

  return {
      props: { ...user, notes }
  }
}
