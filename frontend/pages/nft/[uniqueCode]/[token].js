
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'

import axios from 'axios'

import { useAddress, useMarketplace } from '@thirdweb-dev/react'

export default function nftid()
{

    const address = useAddress()
    const marketplace = useMarketplace('0xAf666C1D362ffD413E0dc70a5593faBB9eB89988');

    const router = useRouter()
    const { uniqueCode, token } = router.query

    const [data, setData] = useState()
    const [myNft, setMyNft] = useState(false)
    const [listings, setListings] = useState([]);

    const getListings = async () => {

        const list = await marketplace.getActiveListings();
        setListings(list);

    };

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

    useEffect( async () =>
    {
        if(!address) return;
        if(!data) return;

        getListings();

        if(data.owned.metaMaskToken === address)
        {
            setMyNft(true)
        }

    }, [address, data])

    const buyAsset = async () =>
    {
        if (listings.length === 0) return;
        console.log('ehlej bn')

        const checkIndex = (element) => element.id==data.listingId;

        const index = listings.findIndex(checkIndex)

        await marketplace.buyoutListing(listings[index]?.id, 1);
        alert('ta avlaa')

        const endpoint = 'http://192.168.0.145:9000/api/v1/nft/profile/' + uniqueCode + '/' + token
        var formData = {
            'adress': address
        }
        const response = await axios.post(
			endpoint,
            formData
		)

        console.log(response.data.data)


    }

    console.log('listings', listings)

    const isLoading = listings.length === 0

    return (
        <>
            <div className='relative h-156 bg-[#F2F2F2]'>
                <img className='h-138 block ml-auto mr-auto pt-16' src={'http://192.168.0.145:9000/' + data?.image} />
            </div>

            <div className='flex flex-row flex-wrap container mx-auto pb-32'>
                <div className='basis-1/2 px-5'>
                    <p className='text-5xl font-semibold mt-24 mb-14'>{data?.name}</p>


                        <div className='text-gray-700 font-medium text-lg mb-4 ml-4'>
                            Эзэмшигч
                        </div>
                        <div className=''>
                            <Link href={'/profile/'+data?.owned.uniqueName}>
                                <button className='rounded-full flex flex-row justify-center shadow-xl transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none hover:cursor-pointer'>
                                    <img className='w-8 h-8 rounded-full object-cover mx-3 my-2' src={'http://192.168.0.145:9000/' + data?.owned.profileImage} />
                                    <p className='ml-1 pr-4 mt-3'>@{data?.owned.uniqueName}</p>
                                </button>
                            </Link>
                        </div>


                        <div className=' text-gray-700 font-medium text-lg mb-4 ml-4 mt-4'>
                            Collection
                        </div>
                        <div className=''>
                            <Link href={'/collection/'+data?.by_collection.contract_address}>
                                <button className='rounded-full flex flex-row justify-center shadow-xl transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none hover:cursor-pointer'>
                                    <img className='w-8 h-8 rounded-full object-cover mx-3 my-2' src={'http://192.168.0.145:9000/' + data?.by_collection.logo} />
                                    <p className='ml-1 pr-4 mt-3'>{data?.by_collection.username}</p>
                                </button>
                            </Link>
                        </div>



                </div>

                <div className='basis-1/2 px-5 mt-24 font-semibold text-3xl'>
                    <p>Дэлгэрэнгүй</p>
                    <a className='text-gray-500 inline hover:text-black' href={'https://rinkeby.etherscan.io/tx/'+data?.transactionHash} target="_blank">
                        <svg className='inline' width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.36444 9.99861C4.36442 9.88134 4.38756 9.76521 4.43254 9.65691C4.47752 9.5486 4.54344 9.45026 4.62652 9.36752C4.70961 9.28478 4.80821 9.21927 4.91668 9.17477C5.02514 9.13026 5.14133 9.10763 5.25856 9.10818L6.74093 9.11304C6.97729 9.11304 7.20397 9.20697 7.3711 9.37416C7.53823 9.54135 7.63212 9.7681 7.63212 10.0045V15.6119C7.79911 15.5624 8.01328 15.5096 8.24789 15.4546C8.41079 15.4162 8.55596 15.3239 8.65988 15.1927C8.76379 15.0615 8.82036 14.899 8.8204 14.7316V7.77617C8.82039 7.65908 8.84344 7.54313 8.88822 7.43495C8.93301 7.32676 8.99866 7.22846 9.08142 7.14566C9.16418 7.06285 9.26243 6.99717 9.37057 6.95235C9.47871 6.90753 9.59461 6.88446 9.71167 6.88445H11.197C11.4333 6.88449 11.66 6.97843 11.8271 7.14561C11.9942 7.31279 12.0881 7.53953 12.0882 7.77596V14.2318C12.0882 14.2318 12.4599 14.0812 12.8222 13.9282C12.9568 13.8713 13.0716 13.776 13.1524 13.6542C13.2331 13.5324 13.2762 13.3895 13.2764 13.2434V5.54701C13.2764 5.42994 13.2994 5.31401 13.3442 5.20585C13.389 5.09768 13.4546 4.99941 13.5373 4.91662C13.6201 4.83384 13.7183 4.76817 13.8265 4.72336C13.9346 4.67856 14.0505 4.6555 14.1675 4.6555H15.6528C15.8891 4.6555 16.1158 4.74942 16.283 4.91661C16.4501 5.0838 16.544 5.31056 16.544 5.54701V11.8845C17.8318 10.951 19.1368 9.82806 20.1725 8.47789C20.3228 8.28191 20.4222 8.05176 20.4619 7.80799C20.5016 7.56421 20.4804 7.31439 20.4002 7.08081C19.6994 5.03788 18.385 3.26132 16.6366 1.99407C14.8882 0.72681 12.7912 0.0307121 10.6323 0.000951922C4.81072 -0.0772794 -0.0005215 4.6766 5.03732e-05 10.501C-0.00566572 12.344 0.475188 14.1558 1.39399 15.7533C1.5207 15.9718 1.70711 16.1496 1.93133 16.2658C2.15554 16.382 2.40825 16.4318 2.65976 16.4093C2.94076 16.3845 3.29061 16.3496 3.7065 16.3007C3.88752 16.2801 4.05464 16.1936 4.17604 16.0577C4.29743 15.9218 4.36461 15.746 4.3648 15.5638V9.99861" fill="currentColor"></path>
                            <path d="M4.33235 18.991C5.89799 20.1303 7.74818 20.8142 9.67825 20.967C11.6083 21.1197 13.543 20.7354 15.2683 19.8565C16.9935 18.9776 18.4421 17.6384 19.4538 15.9871C20.4655 14.3357 21.0007 12.4366 21.0004 10.4998C21.0004 10.2581 20.9892 10.019 20.9731 9.78125C17.1385 15.502 10.0584 18.1765 4.33228 18.9912" fill="currentColor"></path>
                        </svg>
                        <p className='inline-block text-sm ml-2  mt-8'>Etherscan дээр үзэх</p>
                    </a>
                    <br />
                    <a className='text-gray-500 inline hover:text-black' href={data?.ipfs} target="_blank">
                        <svg className='inline' viewBox="0 0 26 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.39568 9.5353C3.30085 9.67169 3.25 9.83384 3.25 10C3.25 10.1662 3.30085 10.3283 3.39569 10.4647C4.14458 11.5246 5.42522 13.1219 7.10604 14.4442C8.79099 15.7697 10.7883 16.75 12.9997 16.75C15.211 16.75 17.2083 15.7697 18.8933 14.4442C20.5741 13.1219 21.8548 11.5245 22.6037 10.4647C22.6985 10.3283 22.7493 10.1661 22.7493 10C22.7493 9.83385 22.6985 9.67171 22.6037 9.53533C21.8548 8.47546 20.5741 6.8781 18.8933 5.55581C17.2083 4.23027 15.211 3.25 12.9997 3.25C10.7883 3.25 8.79099 4.23027 7.10604 5.55581C5.42522 6.87809 4.14458 8.47542 3.39568 9.5353ZM5.5603 3.59094C7.50035 2.06473 10.03 0.75 12.9997 0.75C15.9693 0.75 18.499 2.06473 20.439 3.59094C22.3817 5.11922 23.8233 6.9287 24.6477 8.09584L24.651 8.10054C25.0404 8.65738 25.2493 9.32048 25.2493 10C25.2493 10.6795 25.0404 11.3426 24.651 11.8994L24.6477 11.9042C23.8233 13.0713 22.3817 14.8808 20.439 16.4091C18.499 17.9353 15.9693 19.25 12.9997 19.25C10.03 19.25 7.50035 17.9353 5.5603 16.4091C3.61763 14.8808 2.17606 13.0713 1.35167 11.9042L1.34835 11.8995L1.34836 11.8994C0.958888 11.3426 0.75 10.6795 0.75 10C0.75 9.32048 0.958888 8.65738 1.34836 8.10055L1.35166 8.09583L1.35167 8.09584C2.17606 6.9287 3.61763 5.11922 5.5603 3.59094Z" fill="currentColor"></path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.9998 7.25C11.481 7.25 10.2498 8.48122 10.2498 10C10.2498 11.5188 11.481 12.75 12.9998 12.75C14.5185 12.75 15.7498 11.5188 15.7498 10C15.7498 8.48122 14.5185 7.25 12.9998 7.25ZM7.74976 10C7.74976 7.1005 10.1003 4.75 12.9998 4.75C15.8993 4.75 18.2498 7.1005 18.2498 10C18.2498 12.8995 15.8993 15.25 12.9998 15.25C10.1003 15.25 7.74976 12.8995 7.74976 10Z" fill="currentColor"></path>
                        </svg>
                        <p className='inline-block text-sm ml-2  mt-2'>IPFS дээр үзэх</p>
                    </a>

                </div>

                <div className='basis-1/2 px-5 mt-16 font-semibold text-3xl'>
                    Тайлбар
                    <hr className='my-4' />
                    <p className='text-base font-normal pr-32'>{data?.description}</p>
                </div>
                <div className='basis-1/2 px-5'>
                    <div className='border border-gray-200 rounded-xl'>
                        {
                            data?.marketPlace
                            ?
                            <div className='px-8 py-6'>
                                <p className='font-medium text-gray-500'>Одоогийн тендер</p>
                                <p className='font-semibold text-3xl'>{data?.price} ETH</p>
                                {/* {
                                    listings.length == 0
                                    ?
                                    <button onClick={buyAsset} className='p-2 bg-gray-300 text-white w-full mt-3 rounded-full ' disabled>
                                        Худалдаж авах
                                    </button>
                                    :
                                    <button onClick={buyAsset} className='p-2 bg-black text-white w-full mt-3 rounded-full transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none hover:cursor-pointer'>
                                        Худалдаж авах
                                    </button>
                                } */}
                                    <button onClick={!isLoading && buyAsset} className='p-2 bg-gray-300 text-white w-full mt-3 rounded-full ' disabled={isLoading}>
                                        Худалдаж авах
                                    </button>
                            </div>
                            :
                            myNft
                            ?
                            <div className='px-8 py-10 relative'>
                                <span className='text-lg font-medium'>Үүсгэсэн огноо:</span>
                                <span className='absolute right-10'>{data?.createdAt}</span>
                                <Link href={'/marketplace/'+uniqueCode+'/'+token} >
                                    <button className='p-2 bg-black text-white w-full mt-5 rounded-full transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none hover:cursor-pointer'>
                                        Marketplace дээр тавих
                                    </button>
                                </Link>
                            </div>
                            :
                            <div className='px-8 py-10 relative'>
                                <span className='text-lg font-medium'>Үүсгэсэн огноо:</span>
                                <span className='absolute right-10'>{data?.createdAt}</span>
                            </div>
                        }
                     </div>
                </div>
            </div>
        </>
    )
}
