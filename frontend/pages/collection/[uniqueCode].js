
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import axios from 'axios'

import { useAddress } from '@thirdweb-dev/react'

import NftCard from '../../components/website/nftCard'

import backgournd from '../../assets/logo/5418410.jpg'
import logo from '../../assets/logo/5418410.gif'

export default function CollectionById()
{

    const router = useRouter()
    const { uniqueCode } = router.query

    const address = useAddress()

    const [collection, setCollection] = useState({})
    const [nfts, setNfts] = useState([])
    const [myCollection, setMyCollection] = useState(false)

    // huudas joohon dooroos ehluuleh
    useEffect(
        () =>
        {
            window.scrollTo(0, 120)
        },
        []
    )

    useEffect(async () =>
	{

        if(!uniqueCode) return;

		const endpoint = `http://${process.env.DOMAIN_NAME}:9000/api/v1/collection/` + uniqueCode
		const response = await axios.get(
			endpoint
		)
        setCollection(response.data.data)

        const nftendpoint = `http://${process.env.DOMAIN_NAME}:9000/api/v1/nft/collec/` + uniqueCode

		const nftResponse = await axios.get(
			nftendpoint
		)

		setNfts(nftResponse.data.data)

	}, [uniqueCode])

    useEffect(async () =>
    {
        if(!address) return;
        if(!collection.metaMaskToken) return;

        if (collection.metaMaskToken === address)
        {
            setMyCollection(true)
        }
    }, [address, collection])

    console.log('collection', collection)

    return (
        <>
            <div className='h-156 relative'>
                <div>
                    <Image className='object-cover' src={collection?.backgroundImage ? `http://${process.env.DOMAIN_NAME}:9000/` + collection?.backgroundImage : backgournd} layout='fill' unoptimized={true} />
                </div>
                <div className='flex flex-col absolute -bottom-14 left-44'>
                    <div className='bg-gray-200 rounded-xl bg-opacity-40 p-2 h-40 w-40 mb-32'>
                        <Image className='object-cover rounded-xl' src={collection?.logo ? `http://${process.env.DOMAIN_NAME}:9000/` + collection?.logo : logo} width={145} height={145} unoptimized={true} />
                    </div>
                    <a target="_blank" href="https://www.google.com/" className={'p-2 px-4 mb-10 w-fit tracking-widest right-auto transition bg-black text-white rounded-full bg-opacity-80 hover:bg-white hover:text-black ease-in-out duration-150 hover:-translate-y-1 flex flex-row'}>
                        {collection?.username}&nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                    <p className='text-white text-5xl mb-10 font-bold'>{collection?.username}</p>
                    <Link href={'/profile/'+collection?.profile?.uniqueName}>
                        <button className={'p-2 px-4 w-fit mb-28 right-auto transition bg-black text-white rounded-full bg-opacity-80 hover:bg-white hover:text-black ease-in-out duration-150 hover:-translate-y-1 flex flex-row'}>
                            @{collection?.profile?.username}&nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </button>
                    </Link>
                    <div className='px-12 py-10 w-fit bg-white shadow-xl rounded-lg text-xl font-medium '>
                        NFTs &nbsp;<span className='text-gray-400 text-sm'>({collection?.nftCount})</span>
                        {
                            myCollection
                            ?
                            <Link href={'/nft/create/'+uniqueCode}>
                                <button className='rounded-full bg-black text-white text-sm px-5 py-3 ml-10 transition border duration-150 hover:text-black hover:bg-white hover:shadow-2xl hover:border'>
                                    NFT шинээр үүсгэх
                                </button>
                            </Link>
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>

            <div className='container mx-auto mt-32'>
                <div className='flex flex-row flex-wrap'>

                    {
                        nfts.map((nft) =>
                        {
                            return (
                                <div className='basis-1/4 px-5' key={nft?._id}>
                                    <NftCard
                                        token={nft?.tokenId}
                                        price={nft?.price}
                                        uniqueName={nft?.owned?.uniqueName}
                                        name={nft?.name}
                                        marketPlace={nft?.marketPlace}
                                        image={nft?.image}
                                        metaMaskToken={nft?.by_collection?.metaMaskToken}
                                        username={nft?.by_collection?.username}
                                        contract_address={collection?.contract_address}
                                    />
                                </div>
                            )
                        })
                    }



                </div>
            </div>
        </>
    )
}
