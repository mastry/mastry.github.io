import '../styles/bulma.min.css'
import '../styles/theme.css'
import { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Prism from 'prismjs'
import 'prismjs/plugins/custom-class/prism-custom-class'
import 'prismjs/themes/prism-tomorrow.min.css'
import 'prismjs/components/prism-rust'

Prism.plugins.customClass.map({ number: 'prism-number', tag: 'prism-tag' })

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    )
}

export default App
