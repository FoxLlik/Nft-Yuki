
import { useEffect, useState } from "react"

import Link from "next/link"

import axios from 'axios'

import NersCard from "../../components/website/newsCard"

export default function Blog()
{

    const [data, setData] = useState([])

    useEffect(
    async () =>
    {

        const url = 'http://192.168.0.145:9000/api/v1/news/'

        const response = await axios.get(
            url
        ).catch((error) =>
        {
            console.log(error)
        })

        setData(response.data.data)
    },
    [])

    return (
        <>
            <div className="flex flex-row flex-wrap justify-center mt-10">

                {
                    data.map((data) =>
                    {
                        return (
                            <div className="basis-1/4 mx-4 mb-8" key={data?._id}>
                                <NersCard title={data?.title} image={data?.image} description={data?.description} _id={data?._id} createdAt={data?.createdAt} />
                            </div>
                        )
                    })
                }


            </div>

        </>
    )
}
