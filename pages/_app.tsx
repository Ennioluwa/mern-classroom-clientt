import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NavBar } from '../components'
import { UserProvider } from '../context'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <title>E classroom</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
