
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'

import axios from 'axios'

import { useAddress, useMarketplace } from '@thirdweb-dev/react'
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

export default function postMarketPlace()
{

    const address = useAddress()
    const marketplace = useMarketplace('0xAf666C1D362ffD413E0dc70a5593faBB9eB89988');

    const router = useRouter()
    const { uniqueCode, token } = router.query

    const [data, setData] = useState()

    useEffect( async () =>
    {
        if(!uniqueCode) return;
        if(!token) return;

        const endpoint = 'http://192.168.0.145:9000/api/v1/nft/' + uniqueCode + '/' + token
		const response = await axios.get(
			endpoint
		)
        setData(response.data.data)

    }, [uniqueCode, token])

    console.log('uniqueCode', uniqueCode)

    const handleSubmit = async (event) =>
    {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        const listing = {
            assetContractAddress: uniqueCode,
            tokenId: token,
            startTimestamp: new Date(),
            listingDurationInSeconds: 86400,
            quantity: 1,
            currencyContractAddress: NATIVE_TOKEN_ADDRESS,
            buyoutPricePerToken: event.target.price.value
        }

        const tx = await marketplace.direct.createListing(listing)
        const receipt = tx.receipt
        var listingId = tx.id;

        var formData = {
            'price': event.target.price.value,
            'listingId': listingId._hex
        }

        // API endpoint where we send form data.
        const endpoint = 'http://192.168.0.145:9000/api/v1/nft/marketplace/' + uniqueCode + '/' + token

        const response = await axios.post(
            endpoint,
            formData
        )

        if (response.data.info.code === 1)
        {
            router.push('/collection/'+uniqueCode)
        }

    }

    return (
        <>
            <div>
                <div className="container mx-auto w-1/3 mt-10 mb-12">
                    <div className="">
                        <div className='text-center pb-16 text-3xl font-semibold'>
                            Marketplace нэмэх
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="given-name"
                                            defaultValue={data?.name || ''}
                                            className="mt-2 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                            placeholder='Нэр'
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Background photo</label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">

                                        {
                                            data?.image
                                            ?
                                            <>
                                                <img src={"http://192.168.0.145:9000/" + data?.image} alt="nft image" />
                                            </>
                                            :
                                            <></>
                                        }

                                        </div>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                            Үнэ өртөг
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            autoComplete="given-name"
                                            className="mt-2 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                            placeholder='ETH'
                                            step='any'
                                        />
                                    </div>

                                </div>

                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="bg-black text-white px-10 py-3 rounded-full font-medium hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300 border-2 border-white "
                                    >
                                        MarketPlace-д нэмэх
                                    </button>

                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
