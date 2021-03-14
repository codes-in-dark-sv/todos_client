import Head from 'next/head'
import Todos from '../components/Todos';
export default function Home() {
  return (
    <>
       <Head>
        <title>
          TODOs
        </title>
      </Head>
      <Todos />
    </>
  )
}
