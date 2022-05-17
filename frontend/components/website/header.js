import {
    useMemo,
    useState,
    Fragment,
    useRef,
    useEffect
} from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import axios from 'axios'

import {
    useMetamask,
    useAddress,
    useDisconnect,
} from '@thirdweb-dev/react'

import {
    Dialog,
    Transition,
    Menu
} from '@headlessui/react'

// Images
import logo from '../../assets/header/foundation-logo.png'
import metamask from '../../assets/header/metamask.jpg'
import walletconnect from '../../assets/header/walletconnect.jpg'

function classNames(...classes)
{
    return classes.filter(Boolean).join(' ')
}

const titles =
[
    {
        name: 'Marketplace',
        url: '/marketplace'
    },
    {
        name: 'Тухай',
        url: '/about'
    },
    {
        name: 'Блог',
        url: '/blog'
    },
]

export default function Header()
{

    const connectMetaMask = useMetamask()
    const disconnectMetaMask = useDisconnect()
    const address = useAddress()

    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [token, setToken] = useState()
    const [balance, setBalance] = useState(0)
    const [uniqueName, setUniqueName] = useState('')

    const cancelButtonRef = useRef(null)


    // Нэютэрсэн хэрэглэгчийн token avah
    const getMetaToken = async () =>
    {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })

        setToken(accounts)

        const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [ accounts[0], 'latest' ] })
        const wei = parseInt(balance, 16)
        const eth = (wei / Math.pow(10, 18))

        const url = 'http://localhost:9000/api/v1/user/token/'+accounts[0]

        const response = await axios.get(
            url
        ).catch((error) =>
        {
            console.log(error)
        })

        setUniqueName(response.data.data.uniqueName)

        setBalance(eth)
    }

    useEffect(
        () =>
        {
            if (!address) return

            setOpen(false)
            getMetaToken()
        },
        [address]
    )

    // Шинэ хэрэглэгч нэвтрэхэд шинээр хадгална
    useEffect(async () =>
    {
        if (!token) return

        const data = { metaMaskToken: token[0] }

        const response = await axios.post(
            'http://localhost:9000/api/v1/user',
            data
        ).catch((error) =>
        {
            console.log(error)
        })

        // Хэрэглэгч өөрйин мэдээллээ нэмэх хуудас руу үсрэнэ
        if (response?.data.info.name === 'INF_014')
        {
            router.push('/profile/create')
        }

    }, [token])

    // Navbar-ын утгууд
    const data = useMemo(
        () =>
        {
            return (
                titles.map((title, id) =>
                {
                    return (
                        <Link href={title?.url} key={id}>
                            <a className='mr-10 hover:text-black'>
                                {title?.name}
                            </a>
                        </Link>
                    )
                })
            )
        },
        []
    )

    return (
        <>
        <div className='container mx-auto py-8 flex flex-row items-center'>

            {/* Logo */}
            <Link href="/">
                <a className=''>
                    <Image src={logo} alt="logo" width={100} height={36} />
                </a>
            </Link>

            {/* Navbar */}
            <div className='text-lg font-medium text-gray-500 ml-auto font-verdana'>
                {data}
            </div>

            <div className='flex items-center'>
            {
                address
                ?
                <>
                    <Menu as="div" className="relative inline-block text-left mr-8">

                        <div>
                            <Menu.Button className="inline-flex justify-center w-full rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 p-1 shadow-xl">
                                <Image
                                    className="rounded-full"
                                    src="https://avatarfiles.alphacoders.com/107/107343.jpg"
                                    alt=""
                                    width={45}
                                    height={45}
                                />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute -ml-24 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                <div className="py-3 px-3">

                                    <Menu>
                                        <Link href={'/profile/'+uniqueName}>
                                            <a
                                            className={
                                                classNames('flex items-center hover:bg-gray-100 hover:rounded-lg px-4 py-3 text-sm',
                                            )}
                                            >

                                                <Image className='rounded-full' src="https://avatarfiles.alphacoders.com/107/107343.jpg" width={40} height={40} />
                                                <p className='ml-2 font-medium text-base text-gray-800'>@{uniqueName}</p>
                                                <p className='ml-auto text-gray-400'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </p>
                                            </a>
                                        </Link>
                                    </Menu>

                                    <div>

                                        <div className='flex items-center border border-solid rounded-lg text-gray-700 px-4 py-4 my-2 text-sm'>
                                            <p className='ml-4 font-medium text-base text-gray-500'>Balance</p>
                                            <p className='ml-auto text-gray-500'>
                                                {balance} ETH
                                            </p>
                                        </div>

                                    </div>

                                    <Menu>
                                    {({ active }) => (
                                        <Link href="/profile/create" >
                                            <a className={
                                                classNames('flex items-center hover:bg-gray-100 hover:rounded-lg',
                                                active ? 'bg-gray-100 text-gray-900 rounded-lg' : 'text-gray-700',
                                                'block px-4 py-3 text-sm'
                                            )}>
                                                <p className='ml-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                </p>
                                                <p className='ml-3 text-gray-800 font-medium'>Тохиргоо</p>
                                                <p className='ml-auto text-gray-400'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </p>
                                            </a>
                                        </Link>
                                    )}
                                    </Menu>

                                    <Menu>
                                    {({ active }) => (
                                        <Link href="/privace">
                                            <a
                                            className={
                                                classNames('flex items-center hover:bg-gray-100 hover:rounded-lg',
                                                active ? 'bg-gray-100 text-gray-900 rounded-lg' : 'text-gray-700',
                                                'block px-4 py-3 text-sm'
                                            )}
                                            >

                                                <p className='ml-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                                </p>
                                                <p className='ml-3 text-gray-800 font-medium'>Нууцлалын бодлого</p>
                                                <p className='ml-auto text-gray-400'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </p>
                                            </a>
                                        </Link>
                                    )}
                                    </Menu>

                                    <Menu>
                                    {({ active }) => (
                                        <Link href="/terms">
                                            <a
                                            className={
                                                classNames('flex items-center hover:bg-gray-100 hover:rounded-lg',
                                                active ? 'bg-gray-100 text-gray-900 rounded-lg' : 'text-gray-700',
                                                'block px-4 py-3 text-sm'
                                            )}
                                            >

                                                <p className='ml-2'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                                    </svg>
                                                </p>
                                                <p className='ml-3 text-gray-800 font-medium'>Үйлчилгээний нөхцөл</p>
                                                <p className='ml-auto text-gray-400'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </p>
                                            </a>
                                        </Link>
                                    )}
                                    </Menu>

                                    <Menu>
                                    {({ active }) => (
                                        <button
                                            onClick={
                                                () => {
                                                    disconnectMetaMask(), setToken()
                                                }
                                            }
                                            className={
                                                classNames('flex items-center w-full hover:bg-gray-100 hover:rounded-lg',
                                                active ? 'bg-gray-100 text-gray-900 rounded-lg' : 'text-gray-700',
                                                'block px-4 py-3 text-sm'
                                            )}
                                            >

                                            <p className='ml-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                            </p>
                                            <p className='ml-3 text-gray-800 font-medium'>Гарах</p>
                                            <p className='ml-auto text-gray-400'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </p>
                                        </button>
                                    )}
                                    </Menu>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    <Link href='/collection/create'>
                        <button className='bg-black text-white px-8 py-4 rounded-full font-medium'>
                            Шинээр үүсгэх
                        </button>
                    </Link>
                </>
                :
                <>
                    <button className='bg-black text-white px-8 py-4 rounded-full font-medium' onClick={() => setOpen(true)}>
                        Түрийвчээ холбох
                    </button>

                    <Transition.Root show={open} as={Fragment}>
                        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                </Transition.Child>

                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                    &#8203;
                                </span>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <div className="relative inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mt-3 text-center sm:mt-0 sm:ml-0 sm:text-left">
                                                    <Dialog.Title as="h3" className="text-3xl text-center leading-6 font-medium text-gray-900 mt-10">
                                                        Түрийвчээ сонгоно уу
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-lg text-gray-800 text-center mt-8 px-10 font-normal">
                                                            Түрийвчээ холбосноор та манай
                                                            <Link href='/terms'><a className='text-gray-500 font-medium hover:text-black'> Үйлчилгээний нөхцөл</a>
                                                            </Link> болон <Link href='/terms'><a className='text-gray-500 font-medium hover:text-black'>Нууцлалын бодлого</a></Link> -ыг зөвшөөрч байна.
                                                        </p>
                                                        <div className='text-center mt-10 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none hover:cursor-pointer' onClick={connectMetaMask}>
                                                            <Image src={metamask} alt="metamask" width={350} height={75} />
                                                        </div>
                                                        <div className='text-center mt-0 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none hover:cursor-pointer'>
                                                            <Image src={walletconnect} alt="walletconnect" width={350} height={75} />
                                                        </div>
                                                        <p className='text-center text-lg font-normal mt-4'>
                                                            Анх удаа Ethereum ашиглаж байна уу?
                                                        </p>
                                                        <div className='text-center text-sm text-gray-500 mt-1 mb-8 hover:text-black tracking-wider'>
                                                            <Link href='/' >
                                                                <a className='font-verdana'>
                                                                    Түрийвчийн тухай дэлгэрэнгүй
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition.Root>
                </>
            }
            </div>

        </div>

        </>
    )
}
