
import Link from "next/link"

export default function NewsCard({
    _id='',
    createdAt='PUBLISHED 27 MAY 2020',
    description='',
    image='',
    title=''
})
{

    return (
        <>
            {/* <Link href={'/blog/'+_id}> */}
            <Link href={'/blog'}>
                <a>
                    <div className={"w-full border-2 border-black hover:shadow-2xl hover:transition-shadow"
                + "transition ease-in-out duration-150 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"}>
                        <img src={'http://192.168.0.145:9000/'+image} className="border-b-2 border-black object-cover w-full h-80" />

                        <div className="p-8 h-72 relative">
                            {/* Title */}
                            <p className="font-semibold text-2xl mb-2">{title}</p>
                            <p className="mb-6">{description}</p>
                            <p className="text-sm tracking-widest absolute bottom-10">Нийтэлсэн 02 MAY 2022</p>
                        </div>

                    </div>
                </a>
            </Link>
        </>
    )
}
