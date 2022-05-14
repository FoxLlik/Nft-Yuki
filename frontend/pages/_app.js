
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react'

import Header from '../components/website/header'

import '../styles/globals.css'

function MyApp({ Component, pageProps })
{
    return (
        <ThirdwebProvider desiredChainId={ChainId.Mainnet} >
            <Header />
            <Component {...pageProps} />
        </ThirdwebProvider>
    )
}

export default MyApp
