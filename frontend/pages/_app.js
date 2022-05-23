
import { ThirdwebProvider } from '@thirdweb-dev/react'

import Header from '../components/website/header'

import '../styles/globals.css'

const chainId = 4;

function MyApp({ Component, pageProps })
{
    return (
        <ThirdwebProvider desiredChainId={chainId} >
            <Header />
            <Component {...pageProps} />
        </ThirdwebProvider>
    )
}

export default MyApp
