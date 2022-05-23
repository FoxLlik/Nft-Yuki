
import Link from "next/link"

export default function NftCard({
        token='',
        price=0,
        uniqueName='',
        name='',
        marketPlace=false,
        image='',
        metaMaskToken='',
        username='',
        contract_address=''
    })
{
    return (
        <>
            <Link href={'/nft/' + contract_address + '/' + token}>
                <a>
                    <div className="border border-gray-200 rounded-xl mb-10 bg-black">
                        <img className="object-cover w-full h-80 rounded-t-xl transit duration-300 hover:opacity-70" src={`http://${process.env.DOMAIN_NAME}:9000/` + image} />

                        <p className="text-white w-full text-center my-4 text-xl">{name}</p>

                        <Link href={'/profile/' + uniqueName}>
                            <button className="mx-4 py-2 text-sm px-4 text-white rounded-full transition duration-150 border hover:bg-white hover:text-black">
                                @{uniqueName}
                            </button>
                        </Link>

                        {
                            marketPlace
                            ?
                            <p className="text-white right-auto inline">{price} ETH</p>
                            :
                            <></>
                        }

                        <Link href={'/collection/'+contract_address}>
                            <p className="pl-6 pb-4 mt-3 text-white text-sm">@{username}</p>
                        </Link>

                    </div>
                </a>
            </Link>
        </>
    )
}
