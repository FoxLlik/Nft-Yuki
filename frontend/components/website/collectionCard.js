
import Link from 'next/link'

export default function CollectionCard({ backgroundImage='', profileImage='', name='', uniqueName='', userProfileImage='', contract_address='' })
{
    return (
        <>
            <div className="shadow-2xl rounded-2xl transition ease-in-out duration-150 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
                <Link href={'/collection/'+contract_address}>
                    <a className='rounded relative'>
                        <div className='h-1000'>
                            <img className='w-full h-full rounded-2xl object-cover' src={'http://192.168.0.145:9000/' + backgroundImage} />
                        </div>
                        <img className='w-24 h-24 rounded-lg border-8 border-white absolute left-14 top-14 object-cover' src={'http://192.168.0.145:9000/' + profileImage} />
                        <div className='absolute bottom-10 left-10 w-10/12'>
                            <p className='text-4xl font-semibold absolute text-white bottom-24 left-2'>{name}</p>
                            <Link href={'/profile/'+uniqueName}>
                                <button className='rounded-full bg-gray-300 flex flex-row bg-opacity-30'>
                                    <img src={'http://192.168.0.145:9000/' + userProfileImage} className='w-10 h-10 opacity- rounded-full m-2 ' />
                                    <p className='flex mt-4 pr-3 text-white'>{uniqueName}</p>
                                </button>
                            </Link>

                        </div>
                    </a>
                </Link>

            </div>
        </>
    )
}
