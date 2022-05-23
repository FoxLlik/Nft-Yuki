
import { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'

import axios from 'axios'

import ProfileCard from '../components/website/profileCard'
import CollectionCard from '../components/website/collectionCard'

const Home = () => {

    const [profiles, setProfiles] = useState([])
    const [collection, setCollection] = useState([])

    useEffect(async () =>
    {
        const profileUrl = 'http://192.168.0.145:9000/api/v1/user'
        const profileResponse = await axios.get(
            profileUrl
        )
        setProfiles(profileResponse.data.data)

        const collectionUrl = 'http://192.168.0.145:9000/api/v1/collection'
        const collectionResponse = await axios.get(
            collectionUrl
        )
        setCollection(collectionResponse.data.data)

    }, [])

    return (
        <>
            <div className='container mx-auto mb-16'>
                <p className='font-medium text-2xl'>Онцлох хэрэглэгчид</p>
                <hr className='my-4 mb-6' />
                <div className='grid grid-cols-4 gap-8'>

                    {
                        profiles.map((profile) => {
                            return (
                                <ProfileCard
                                    key={profile._id}
                                    backgroundImage={profile.backgroundImage}
                                    profileImage={profile.profileImage}
                                    followers={profile.followersCount}
                                    username={profile.username}
                                    uniqueName={profile.uniqueName}
                                />
                            )
                        })
                    }

                </div>

                <p className='font-medium text-2xl mt-16'>Collections</p>
                <hr className='my-4 mb-6' />
                <div className='grid grid-cols-3 gap-16'>

                    {
                        collection.map((collection) => {
                            return (
                                <CollectionCard
                                    key={collection._id}
                                    backgroundImage={collection.backgroundImage}
                                    profileImage={collection.logo}
                                    userProfileImage={collection.profile.profileImage}
                                    name={collection.username}
                                    uniqueName={collection.profile.uniqueName}
                                    contract_address={collection.contract_address}
                                />
                            )
                        })
                    }

                </div>
            </div>

        </>
    )
}

export default Home
