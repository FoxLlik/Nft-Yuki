import {
    useState,
    useRef,
    useEffect
} from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import axios from 'axios'

import {
    useConnect,
    useAddress
} from '@thirdweb-dev/react'

import globe from '../../assets/logo/globe-outline.svg'
import discord from '../../assets/logo/logo-discord.svg'
import facebook from '../../assets/logo/logo-facebook.svg'
import instagram from '../../assets/logo/logo-instagram.svg'
import twitter from '../../assets/logo/logo-twitter.svg'
import youtube from '../../assets/logo/logo-youtube.svg'

export default function CreateProfile()
{

    const router = useRouter()

    const [backimage, setBackimage] = useState(null)
    const [proimage, setProimage] = useState(null)
    const [token, setToken] = useState('')
    const [profileData, setProfileData] = useState()
    const [checkName, setCheckName] = useState('')

    const address = useAddress()
    const connect = useConnect()

    // Нэютэрсэн хэрэглэгчийн token avah
    const getMetaToken = async () =>
    {
        // const accounts = await window.ethereum.request({
        //     method: "eth_requestAccounts",
        // })
        setToken(address)
    }

    useEffect( () =>
    {
        if (connect[0].loading == false)
        {
            if (!address) return (router.push('/'))
            getMetaToken()
        }

    }, [connect[0].loading])

    const onImageChange = (event) =>
    {
        if (event.target.files && event.target.files[0])
        {
            setBackimage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const onProfileImageChange = (event) =>
    {
        if (event.target.files && event.target.files[0])
        {
            setProimage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const checkUniqueName = async (event) =>
    {
        const uniqueName = event.target.value

        const endpoint = 'http://192.168.0.145:9000/api/v1/user/' + uniqueName

        const data = {

        }

        const response = await axios.get(
            endpoint
        )

        console.log(response.data.data)

        if (response.data.data)
        {
            setCheckName('border-red-500')
        }
        else
        {
            setCheckName('')
        }
    }

    const handleSubmit = async (event) =>
    {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        var formData = new FormData()

        if (event.target.profileImage.files[0])
        {
            formData.append('profileImage', event.target.profileImage.files[0])
        }
        if (event.target.backgroundImage.files[0])
        {
            formData.append('backgroundImage', event.target.backgroundImage.files[0])
        }

        formData.append('username', event.target.username.value)
        formData.append('uniqueName', event.target.uniquename.value)
        formData.append('bio', event.target.about.value)
        formData.append('website', event.target.website.value)
        formData.append('discord', event.target.discord.value)
        formData.append('facebook', event.target.facebook.value)
        formData.append('instagram', event.target.instagram.value)
        formData.append('twitter', event.target.twitter.value)
        formData.append('youtube', event.target.youtube.value)
        formData.append('metaMaskToken', token)

        // API endpoint where we send form data.
        const endpoint = 'http://192.168.0.145:9000/api/v1/user'

        const response = await axios.put(
            endpoint,
            formData
        )

        if (response.data.info.code === 2)
        {
            router.push('/')
        }

    }

    const getData = async () =>
    {
        const endpoint = 'http://192.168.0.145:9000/api/v1/user/token/' + token

        const response = await axios.get(
            endpoint
        )

        setProfileData(response.data.data)
    }

    useEffect(() =>
    {
        if (connect[0].loading == false)
        {
            getData()
        }
    }, [token])

    return (
    <>
        <div>
            <div className="container mx-auto w-1/3 mt-10 mb-12">
                <div className="">
                    <div className='text-center pb-16 text-3xl font-semibold'>
                        Өөрийн мэдээллээ оруулах
                    </div>
                    <form method="POST" onSubmit={handleSubmit}>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Нэр
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        defaultValue={profileData?.username}
                                        autoComplete="given-name"
                                        className="mt-2 py-3 px-4 border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder='Name'
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="uniquename" className="block text-sm font-medium text-gray-700">
                                        Дахин давтагдашгүй нэр
                                    </label>
                                    <input
                                        type="text"
                                        name="uniquename"
                                        id="uniquename"
                                        defaultValue={profileData?.uniqueName}
                                        onBlur={checkUniqueName}
                                        autoComplete="given-name"
                                        className={`mt-2 py-3 px-4 border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${checkName}`}
                                        placeholder='Unique name'
                                    />
                                    {
                                        checkName == 'border-red-500'
                                        ?
                                            <label className='text-xs text-red-500'>
                                                Аль хэдийнээ бүртгэгдсэн байна
                                            </label>
                                        :
                                        <></>
                                    }

                                </div>

                                <div>
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                        Өөрийн тухай дэлгэрэнгүй
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="about"
                                            name="about"
                                            defaultValue={profileData?.bio || ''}
                                            rows={3}
                                            className="shadow-sm mt-1 py-3 px-4 block w-full sm:text-sm border border-gray-300 rounded-md"
                                            placeholder="Enter a short bio"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Профайл зураг</label>
                                    <div className="mt-1 flex items-center">
                                        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">

                                            {
                                                profileData?.profileImage
                                                ?
                                                    proimage
                                                    ?
                                                    <>
                                                        <img src={proimage} alt="preview image" />
                                                    </>
                                                    :
                                                    <><img src={"http://192.168.0.145:9000/" + profileData?.profileImage} alt="preview image" /></>
                                                :
                                                proimage
                                                ?
                                                <>
                                                    <img src={proimage} alt="preview image" />
                                                </>
                                                :
                                                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            }

                                        </span>
                                        <input
                                            id='profileImage'
                                            name='profileImage'
                                            type="file"
                                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onChange={onProfileImageChange}
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
                                                    htmlFor="backgroundImage"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="backgroundImage"
                                                        name="backgroundImage"
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
                                        profileData?.backgroundImage
                                        ?
                                            backimage
                                            ?
                                            <>
                                                <img src={backimage} alt="preview image" />
                                            </>
                                            :
                                            <><img src={"http://192.168.0.145:9000/" + profileData?.backgroundImage} alt="preview image" /></>
                                        :
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

                                <div className="grid">
                                    <div className="col-span-3 sm:col-span-3">
                                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                                            Website
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                <Image src={globe} width={20} height={20} />
                                            </span>
                                            <input
                                                type="text"
                                                name="website"
                                                id="website"
                                                defaultValue={profileData?.website || ''}
                                                className="px-4 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 border"
                                                placeholder="www.example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-3">
                                        <label htmlFor="discord" className="block text-sm font-medium text-gray-700">
                                            Discord
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                <Image src={discord} width={20} height={20} />
                                            </span>
                                            <input
                                                type="text"
                                                name="discord"
                                                id="discord"
                                                defaultValue={profileData?.discord || ''}
                                                className="px-4 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 border"
                                                placeholder="name#code"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-3">
                                        <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
                                            Facebook
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                <Image src={facebook} width={20} height={20} />
                                            </span>
                                            <input
                                                type="text"
                                                name="facebook"
                                                id="facebook"
                                                defaultValue={profileData?.facebook || ''}
                                                className="px-4 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 border"
                                                placeholder="www.facebook.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-3">
                                        <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                                            Instagram
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                            <Image src={instagram} width={20} height={20} />
                                            </span>
                                            <input
                                                type="text"
                                                name="instagram"
                                                id="instagram"
                                                defaultValue={profileData?.instagram || ''}
                                                className="px-4 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 border"
                                                placeholder="www.instagram.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-3">
                                        <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                                            Twitter
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                            <Image src={twitter} width={20} height={20} />
                                            </span>
                                            <input
                                                type="text"
                                                name="twitter"
                                                id="twitter"
                                                defaultValue={profileData?.twitter || ''}
                                                className="px-4 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 border"
                                                placeholder="www.twitter.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-3">
                                        <label htmlFor="youtube" className="block text-sm font-medium text-gray-700">
                                            Youtube
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                            <Image src={youtube} width={20} height={20} />
                                            </span>
                                            <input
                                                type="text"
                                                name="youtube"
                                                id="youtube"
                                                defaultValue={profileData?.youtube || ''}
                                                className="px-4 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 border"
                                                placeholder="www.youtube.com"
                                            />
                                        </div>
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
