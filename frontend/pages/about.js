import Image from 'next/image'

import nft from '../assets/header/nft.jpg'
import nft1 from '../assets/header/61334733e6b6c143e2566214_NFT Logo.gif'

export default function About()
{
    return (
        <>
            <div className="container mx-auto px-32 pt-20 flex flex-row">
                <div className="font-bold italic basis-1/2 relative">
                    <div className='absolute opacity-10 top-36 -left-8 origin-bottom -rotate-12'>
                        <Image src={nft} width={600} />
                    </div>
                    <p className="text-xl pl-6 pb-10">NFT - гэж юу вэ?</p>
                    <p className="pb-4">Энэ нь Non Fungible Token буюу дахин давтагдахгүй токен гэсэн утгатай блокчейн протокол юм.</p>
                    <p className="pb-4">Энэхүү протоколыг ашигласнаар ямар ч бүтээлийг дижитал хэлбэрт оруулан блокчейн дээр бүртгэлийг үүсгэж өмчлөл болон шилжилтийг мэдээллийг бүртгэн авах боломжтой болдог.</p>
                    <p className="pb-4">Үүнд уран зураг, дижитал зураг, бичлэг, дуу бичлэг болон зургийн хослол, анимейшн, бүтээлч сэтгэлгээгээр хийгдсэн давтагдашгүй агуулгатай юу ч байж болох юм.</p>

                    <p className="text-xl pl-6 pt-10">NFT - юунд ашигладаг вэ?</p>
                    <p className="pt-10 pb-4">Одоогоор хамгийн өргөн хэрэглэж байгаа нь зураг, дуу, бичлэгүүдийн оргинал эхийг дижитал хэлбэрээр худалдан авч өмчлөх байдлаар ашиглаж байна.</p>
                    <p>Мөн авсан NFT-ээ ашиглан тухайн бүтээлийн "Exclusive" "Онцгой" эрхтэй хэсгүүдэд нэвтрэх боломж олгогддог. Тухайн бүтээлийн бүтээгчтэй тодорхой төвшинд харилцах боломжийг олгож байна.</p>
                </div>
                <div className="basis-1/2">
                    <div className='mt-8 ml-16'>
                        <Image src={nft1} width={600} />
                    </div>
                </div>
            </div>
        </>
    )
}
