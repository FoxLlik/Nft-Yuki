import Image from 'next/image'
import Link from 'next/link'

export default function ProfileCard({ backgroundImage='', profileImage='', followers=0, username='', uniqueName='' })
{
    return (
        <div className="shadow-2xl rounded-2xl transition ease-in-out duration-150 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
            <Link href={'/profile/'+uniqueName}>
                <a className='rounded relative'>
                    <div className='h-48'>
                        <img className='w-full h-full rounded-t-2xl object-cover' src={`http://${process.env.DOMAIN_NAME}:9000/` + backgroundImage} />
                    </div>
                    <div className='relative p-6 bg-white'>
                        <img className='w-24 h-24 rounded-full border-8 border-white absolute left-10 -top-12 object-cover' src={`http://${process.env.DOMAIN_NAME}:9000/` + profileImage} />
                        <p className='text-3xl mt-10 font-semibold'>{username}</p>
                        <p className='mt-1 font-semibold text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-700 to-blue-600'>@{uniqueName}</p>
                    </div>
                    <hr />
                </a>
            </Link>
            <div className='p-6 bg-white rounded-b-2xl flex'>
                <div>
                    <p className='text-lg font-bold'>{followers}</p>
                    <p className='font-semibold text-gray-500 -mt-1'>Дагагчид</p>
                </div>
                <button className='ml-auto border-2 border-gray-200 rounded-full px-5 font-semibold hover:bg-black hover:text-white transition duration-300 hover:border-white'>
                    {/* Follow */}
                    Дагах
                </button>
            </div>
        </div>
    )
}
