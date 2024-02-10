import '@/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import nextI18NextConfig from '../../next-i18next.config.js'
import '../styles/email.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default appWithTranslation(App,nextI18NextConfig )