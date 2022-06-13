import { NextPage } from 'next'
import Head from 'next/head'
import { Headers } from '../components/HeaderComponents'
import { NotesList } from '../components/NotesComponents'

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>FullStacks Notes</title>
      </Head>
      <div>
        <Headers />
        <NotesList />

        <div className='h-[100vh]'>

        </div>
      </div>
    </>
  )
}

export default Home
