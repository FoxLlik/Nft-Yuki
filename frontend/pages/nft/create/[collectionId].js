import { useEffect, useState } from "react";

import { useRouter } from 'next/router'

import axios from "axios";

import { useNFTCollection, useAddress } from "@thirdweb-dev/react"



export default function CreateNft()
{

    const router = useRouter()
    const { collectionId } = router.query

    const address = useAddress()
    // const nftCollection = useNFTCollection(collectionId)
    const nftCollection = useNFTCollection('0x965B95D50b6e8035e3ADc1cc4821C28BE4B97a41')

    const [NFTimage, setNFTimage] = useState(null)

    const onImageChange = (event) =>
    {
        if (event.target.files && event.target.files[0])
        {
            setNFTimage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleSubmit = (async (event) =>
    {
        event.preventDefault()

        var formData = new FormData()

        var metadata = {
            name: event.target.name.value,
            description: event.target.description.value || '',
        };

        const walletAddress = address;

        if (event.target.nftImage.files[0])
        {
            metadata.image = event.target.nftImage.files[0]
            formData.append('image', event.target.nftImage.files[0])
        }
        console.log('dsa')

        const tx = await nftCollection.mintTo('0xAa5f8a5e58a84b8aD52861D33ED7E1e59C001587', metadata);
        const receipt = tx.receipt; // the transaction receipt
        const tokenId = tx.id; // the id of the NFT minted
        const nft = await tx.data(); // (optional) fetch details of minted NFT

        console.log('uusej bn')
        await nftCollection.transfer(walletAddress, tokenId)
        console.log('uussen')



        // API endpoint where we send form data.
        const endpoint = `http://${process.env.DOMAIN_NAME}:9000/api/v1/nft`

        formData.append('name', event.target.name.value)
        formData.append('description', event.target.description.value)
        formData.append('by_collection', collectionId)
        formData.append('tokenId', tokenId)
        formData.append('transactionHash', receipt.transactionHash || '')
        formData.append('ipfs', nft.metadata.uri)

        const response = await axios.post(
            endpoint,
            formData
        )

        if (response.data.info.code === 1)
        {
            router.push('/')
        }

    })

    return (
        <>
            <div>
                <div className="container mx-auto w-1/3 mt-10 mb-12">
                    <div className="">
                        <div className='text-center pb-16 text-3xl font-semibold'>
                            NFT үүсгэх
                        </div>
                        <form method="POST" onSubmit={handleSubmit}>
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
                                            className="mt-2 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                            placeholder='Нэр'
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                id="description"
                                                name="description"
                                                rows={3}
                                                className="p-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                placeholder="Enter a short bio"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Background photo</label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="nftImage"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input
                                                            id="nftImage"
                                                            name="nftImage"
                                                            type="file"
                                                            onChange={onImageChange}
                                                            className="sr-only"
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">

                                        {
                                            NFTimage
                                            ?
                                            <>
                                                <img src={NFTimage} alt="nft image" />
                                            </>
                                            :
                                            <></>
                                        }

                                        </div>
                                    </div>

                                </div>

                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="bg-black text-white px-10 py-3 rounded-full font-medium hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300 border-2 border-white "
                                    >
                                        Save
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
