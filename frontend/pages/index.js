
import { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'

import axios from 'axios'

import ProfileCard from '../components/website/profileCard'

const Home = () => {

    const [profiles, setProfiles] = useState([])

    useEffect(async () =>
    {
        const profileUrl = 'http://192.168.0.145:9000/api/v1/user'

        const profileResponse = await axios.get(
            profileUrl
        )
        setProfiles(profileResponse.data.data)

    }, [])

    return (
        <>
            <div className='container mx-auto'>
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
            </div>
        </>
    )
}

export default Home
