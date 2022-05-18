
import { useEffect, useState } from "react";

import Image from "next/image";

import axios from "axios"

import { useAddress, useNFTCollection, useMarketplace } from '@thirdweb-dev/react'
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { ThirdwebSDK } from "@thirdweb-dev/sdk"

import { ethers } from 'ethers';

import { XCircleIcon } from '@heroicons/react/outline'

export default function CreateCollection()
{

    const address = useAddress()

    const [backimage, setBackimage] = useState(null)

    const onImageChange = (event) =>
    {
        if (event.target.files && event.target.files[0])
        {
            setBackimage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleSubmit = async (event) =>
    {

        console.log("collection uusej baina!")
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        var formData = new FormData()

        if (event.target.image.files[0])
        {
            formData.append('image', event.target.image.files[0])
        }

        formData.append('name', event.target.name.value)
        formData.append('description', event.target.description.value)
        formData.append('symbol', event.target.symbol.value)
        formData.append('external_link', event.target.external_link.value)

        const sdk = new ThirdwebSDK(
            new ethers.Wallet(
                "baa487538be7bb9a17c3e37034bc84ff761921cba05f74080e4a922638a2c5f1",

                ethers.getDefaultProvider('https://eth-rinkeby.alchemyapi.io/v2/FU0XgFGz9hiyp8i5YJg6VVAXkCFjQLHi')
            )
        )

        let collection = await sdk.deployer.deployNFTCollection({
            name: event.target.name.value,
            description: event.target.description.value,
            symbol: event.target.symbol.value,
            external_link: event.target.external_link.value || undefined,
            primary_sale_recipient: address,
            image: event.target.image.files[0]
        })

        // API endpoint where we send form data.
        const endpoint = 'http://192.168.0.145:9000/api/v1/user'

        console.log("collection үүссэн!!! :", collection);
    }

    useEffect(() =>
    {
        if (!address) return
        console.log('123')
    },[address])

    return (
    <>
        <div>
            <div className="container mx-auto w-1/3 mt-10 mb-12">
                <div className="">
                    <div className='text-center pb-16 text-3xl font-semibold'>
                        Collection үүсгэх
                    </div>
                    <form method="POST" onSubmit={handleSubmit}>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Нэр
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="given-name"
                                        className="mt-2 py-3 px-4 border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder='Name'
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Дэлгэрэнгүй тайлбар
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={3}
                                            className="shadow-sm mt-1 py-3 px-4 block w-full sm:text-sm border border-gray-300 rounded-md"
                                            placeholder="Бescription"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Хавтасны зураг</label>
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
                                                    htmlFor="image"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="image"
                                                        name="image"
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
                                        backimage
                                        ?
                                        <>
                                            <img src={backimage} alt="preview image" />
                                        </>
                                        :
                                        <></>
                                    }

                                    </div>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
                                        NFT-ийн илэрхийлэх тэмдэг
                                    </label>
                                    <input
                                        type="text"
                                        name="symbol"
                                        id="symbol"
                                        autoComplete="given-name"
                                        className="mt-2 py-3 px-4 border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder='Symbol'
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="external_link" className="block text-sm font-medium text-gray-700">
                                        Гадаад_холбоос
                                    </label>
                                    <input
                                        type="text"
                                        name="external_link"
                                        id="external_link"
                                        autoComplete="given-name"
                                        className="mt-2 py-3 px-4 border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder='External_link'
                                    />
                                </div>



                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button
                                    type="submit"
                                    className="bg-black relative text-white px-10 py-3 rounded-full font-medium hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300 border-2 border-white pr-12"
                                >

                                    Save
                                    {/* <XCircleIcon className="h-6 w-6 text-white animate-spin absolute right-3 top-3"/> */}
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
