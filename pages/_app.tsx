import Head from 'next/head'
import Header from '../src/components/shared/Header'
import Footer from '../src/components/shared/Footer'

import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '../src/styles/main.scss'
import { Toaster } from '@blueprintjs/core'
import { refHandlers, state } from '../src/components/shared/toasts'
import { RecoilRoot } from 'recoil'

const MyApp = ({ Component, pageProps }: { Component: any; pageProps: any }): JSX.Element => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0"
        />
        <meta name="description" content="A comprehensive Serum Dex." />

        <title>fermi</title>
        <meta name="image" content="https://fermi.io/images/fermi-meta-square.png" />
        <meta itemProp="name" content="A comprehensive Serum Dex" />
        <meta itemProp="image" content="https://fermi.io/images/fermi-meta-square.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="A comprehensive Serum Dex" />
        <meta name="twitter:site" content="@fermieos" />
        <meta name="twitter:image:src" content="https://fermi.io/images/fermi-meta-square.png" />
        <meta name="og:title" content="A comprehensive Serum Dex" />
        <meta name="og:image" content="https://fermi.io/images/fermi-meta-square.png" />
        <meta name="og:url" content="https://fermi.io" />
        <meta name="og:site_name" content="A comprehensive Serum Dex" />
        <meta name="og:type" content="website" />
        <link rel="icon" type="image/ico" href="/images/favicon.ico" sizes="16x16 32x32 64x64 128x128" />
      </Head>
      <div className="site-wrapper">
        <RecoilRoot>
          <Header />
          <Component {...pageProps} />
          <Footer />
          <Toaster {...state} ref={refHandlers.toaster} />
        </RecoilRoot>
      </div>
    </>
  )
}

// MyApp.getInitialProps = async (appContext) => ({
//   ...(await App.getInitialProps(appContext)),
// })

export default MyApp
