
import React, {
    useEffect,
    useRef,
    useState
} from 'react'

import axios from 'axios'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAddress } from '@thirdweb-dev/react'

// Components
// import NftCard from '../../components/website/nftCard'

// Зураг
import backgournd from '../../assets/logo/5418410.jpg'
import logo from '../../assets/logo/5418410.gif'

import facebook from '../../assets/logo/logo-facebook.svg'
import discord from '../../assets/logo/logo-discord.svg'
import instagram from '../../assets/logo/logo-instagram.svg'
import twitter from '../../assets/logo/logo-twitter.svg'
import youtube from '../../assets/logo/logo-youtube.svg'
import globe from '../../assets/logo/globe-outline.svg'


// API : https://testnets-api.opensea.io/api/v1/assets?owner=
export default function Profile()
{
	const router = useRouter()
	const { uniquename } = router.query

    const address = useAddress()

	const [copy, setCopy] = useState(true)
	const [openTab, setOpenTab] = React.useState(1);
	const [nfts, setNfts] = useState([])
	const [profileData, setProfileData] = useState([])
    const [myProfile, setMyProfile] = useState(false)

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

		if(!uniquename) return;

		const endpoint = 'http://192.168.0.145:9000/api/v1/user/' + uniquename

		const response = await axios.get(
			endpoint
		)

		setProfileData(response.data.data)

	}, [uniquename])

  	// useEffect(
    //     () =>
    //     {
    //         axios.get('https://testnets-api.opensea.io/api/v1/assets?owner=' + uniquename)
    //             .then(function (response) {
    //             setNfts(response.data.assets)
    //         })
    //     },
    //     [uniquename]
	// )

    useEffect(
        () =>
        {
            if (profileData.metaMaskToken == address?.toLocaleLowerCase())
            {
                setMyProfile(true)
            }
        },
        [address, profileData.metaMaskToken]
    )

	useEffect(
		() =>
		{
			setTimeout(() => setCopy(true), 2 * 1000)
		},
		[copy]
    );


    return(
        <>
            <div className='h-128 relative'>
                <div>
                    <Image className='object-cover' src={profileData?.backgroundImage ? "http://192.168.0.145:9000/" + profileData?.backgroundImage : backgournd} layout='fill' unoptimized={true} />
                </div>
            </div>
            <div className='relative bg-white h-screen'>
                <div className='h-40 w-40 absolute -mt-28 ml-32 rounded-full border-8 border-white'>
                    <Image src={profileData?.profileImage ? "http://192.168.0.145:9000/" + profileData?.profileImage : logo} className='rounded-full object-cover' layout='fill'  unoptimized={true} />
                </div>
                <div className='container mx-auto px-12 flex flex-row'>
                    <div className='basis-1/4 mt-24'>

                        {/* NFT Token */}

                        <div className='flex shadow-xl shadow-black/10 w-52 h-8 rounded-full justify-center'>
                            <p className='text-ellipsis overflow-hidden w-24 whitespace-nowrap text-sm'>
                                {profileData?.metaMaskToken}
                            </p>

                            <button
                                className='text-gray-500 flex ml-4 relative group justify-center hover:text-black' onClick={() => {navigator.clipboard.writeText('0xA80E429EC276DC7FD438DB594cb8F8155d3C746c'); setCopy(false)}}
                            >
                                {
                                    copy
                                    ?
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                }

                                <div className="absolute bottom-3 flex-col items-center hidden mb-8 group-hover:flex ">
                                    <span className="relative w-24 z-10 p-2 py-3 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded-3xl">Copy address</span>
                                </div>
                            </button>

                        </div>

                        {/* Нэр */}
                        <div className='mt-8'>
                            <p className='font-semibold text-4xl'>{profileData?.username || ''}</p>
                        </div>

                        {/* Нэр (unique) */}
                        <div className='mt-2'>
                            <p className='font-semibold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-700 to-blue-600'>@{profileData?.uniqueName || ''}</p>
                        </div>

                        {/* Дагагч болон дагуулагч */}
                        <div className='mt-6 flex flex-row'>
                            <div className='basis-1/3'>
                                <p className='font-bold text-2xl'>{profileData?.followingCount}</p>
                                <p className='text-gray-600 font-semibold'>Following</p>
                            </div>
                            <div className='basis-1/3'>
                                <p className='font-bold text-2xl'>{profileData?.followersCount}</p>
                                <p className='text-gray-600 font-semibold'>Follewers</p>
                            </div>
                            <div className='basis-1/3'>
                                {
                                    myProfile
                                    ?
                                    <button className='p-3 rounded-full hover:bg-black hover:text-white font-bold bg-white text-black border-solid border-2 border-gray-300 mt-0 px-6 hover:border-black'>
                                        <Link href='/profile/create'>
                                            <a>
                                                Edit
                                            </a>
                                        </Link>
                                    </button>
                                    :
                                    <button className='p-3 rounded-full hover:bg-black hover:text-white font-bold bg-white text-black border-solid border-2 border-gray-300 mt-0 px-6 hover:border-black'>
                                        Follow
                                    </button>
                                }
                            </div>
                        </div>

                        {/* Facebook */}
                        {
                            profileData?.facebook
                            ?
                            <Link href="/">
                                <a className='mt-6 flex px-4 text-sm py-2 shadow-xl shadow-black/5 w-64 rounded-full hover:shadow-black/10'>
                                    <p className='font-medium'>@{profileData?.facebook || ''}</p>
                                    <div className='flex w-6 h-6 font-medium ml-5'>
                                        <Image src={facebook} />
                                    </div>
                                </a>
                            </Link>
                            :
                            <></>
                        }


                        {/* instagram */}
                        {
                            profileData?.instagram
                            ?
                            <Link href="/">
                                <a className='mt-1 flex px-4 text-sm py-2 shadow-xl shadow-black/5 w-64 rounded-full hover:shadow-black/10'>
                                    <p className='font-medium'>@{profileData?.instagram || ''}</p>
                                    <div className='flex w-6 h-6 font-medium ml-5'>
                                        <Image src={instagram} />
                                    </div>
                                </a>
                            </Link>
                            :
                            <></>
                        }


                        {
                            profileData?.youtube
                            ?
                            <Link href="https://www.youtube.com/">
                                <a target="_blank" className='mt-1 flex px-4 text-sm py-2 shadow-xl shadow-black/5 w-64 rounded-full hover:shadow-black/10'>
                                    <p className='font-medium'>@{profileData?.youtube || ''}</p>
                                    <div className='flex w-6 h-6 font-medium ml-5'>
                                        <Image src={youtube} />
                                    </div>
                                </a>
                            </Link>
                            :
                            <></>
                        }

                        {/* twitter */}
                        {
                            profileData?.twitter
                            ?
                                <Link href="/">
                                    <a className='mt-1 flex px-4 text-sm py-2 shadow-xl shadow-black/5 w-64 rounded-full hover:shadow-black/10'>
                                            <p className='font-medium'>@{profileData?.twitter || ''}</p>
                                            <div className='flex w-6 h-6 font-medium ml-5'>
                                                <Image src={twitter} />
                                            </div>
                                    </a>
                                </Link>
                            :
                            <></>
                        }


                        {/* Bio */}
                        {
                            profileData?.bio
                            ?
                            <>
                                <div className='mt-6'>
                                    <p className='font-medium text-xl'>Bio</p>
                                </div>
                                <hr className='my-3' />
                                <p className='text-sm'>{profileData?.bio || ''}</p>

                            </>
                            :
                            <></>
                        }
                        <div className='mt-6'>
                            <p className='font-medium text-xl'>Links</p>
                        </div>

                        <hr className='my-3' />

                        {
                          profileData?.website
                          ?
                          <Link href="/">
                            <a className='flex'>
                                <div className='flex w-7 h-7'>
                                    <Image src={globe} />
                                </div>
                                <p className='flex font-medium text-base ml-6'>{profileData?.website || ''}</p>
                            </a>
                          </Link>
                          :
                          <></>
                        }

                        {
                          profileData?.discord
                          ?
                          <Link href="/">
                            <a className='flex mt-3'>
                                <div className='flex w-7 h-7'>
                                    <Image src={discord} />
                                </div>
                                <p className='flex font-medium text-base ml-6'>{profileData?.discord || ''}</p>
                            </a>
                          </Link>
                          :
                          <></>
                        }


                        <hr className='my-3' />

                        <div className='flex relative'>
                            <p className='flex font-medium text-xl'>Joined</p>
                            <p className='flex font-normal absolute text-base right-0'>{profileData?.createdAt?.slice(0.6)}</p>
                        </div>

                        <hr className='my-3' />

                    </div>
                    <div className='basis-3/4'>

                        {/* tab */}
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <ul
                                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                                role="tablist"
                                >
                                <li className="-mb-px mr-2 last:mr-0 flex text-center basis-5">
                                    <a
                                        className={
                                            "text-base font-bold uppercase px-5 py-3 " +
                                            (openTab === 1
                                            ?
                                            "border-b-2 border-solid border-black"
                                            :
                                            ""
                                            )
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(1);
                                        }}
                                        data-toggle="tab"
                                        href="#link1"
                                        role="tablist"
                                    >
                                        Created
                                    </a>
                                </li>
                                    <li className="-mb-px mr-2 last:mr-0 flex text-center basis-5">
                                        <a
                                            className={
                                                "text-base font-bold uppercase px-5 py-3 " +
                                                (openTab === 2
                                                ? "border-b-2 border-solid border-black"
                                                : "")
                                            }
                                            onClick={e => {
                                                e.preventDefault();
                                                setOpenTab(2);
                                            }}
                                            data-toggle="tab"
                                            href="#link2"
                                            role="tablist"
                                        >
                                        Owned
                                        </a>
                                    </li>
                                </ul>
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
                                    <div className="px-4 py-5">
                                        <div className="tab-content tab-space">
                                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                                <div className='flex flex-wrap w-full'>

                                                {/* {
                                                    nfts.map((nft) =>
                                                    {
                                                    return (<div className='basis-1/3 px-6 mt-5'>
                                                        <NftCard image={nft?.image_url} />
                                                    </div>)
                                                    })
                                                } */}
                                                {/* <div className='basis-1/3 px-6 mt-5'>
                                                    <NftCard />
                                                </div>
                                                <div className='basis-1/3 px-6 mt-5'>
                                                    <NftCard />
                                                </div>
                                                <div className='basis-1/3 px-6 mt-5'>
                                                    <NftCard />
                                                </div>
                                                <div className='basis-1/3 px-6 mt-5'>
                                                    <NftCard />
                                                </div> */}

                                                </div>
                                            </div>
                                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                                <p>
                                                    Completely synergize resource taxing relationships via
                                                    premier niche markets. Professionally cultivate one-to-one
                                                    customer service with robust ideas.
                                                    <br />
                                                    <br />
                                                    Dynamically innovate resource-leveling customer service for
                                                    state of the art customer service.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
