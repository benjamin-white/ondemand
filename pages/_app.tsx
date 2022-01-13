import { AppProps } from 'next/app'
import '../assets/global.css'

const App = ({ Component, pageProps }: AppProps) => 
  <Component {...pageProps} />

export default App
