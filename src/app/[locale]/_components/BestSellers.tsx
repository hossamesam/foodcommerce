import MainHeading from '@/components/main-heading'
import Menu from '@/components/menu'
import formatCurrency from '@/lib/formatters'
import { getCurrentLocale } from '@/lib/getCurrentLocale'
import { db } from '@/lib/prisma'
import getTrans from '@/lib/translation'
import { getBestSellers } from '@/server/db/products'
import Image from 'next/image'
import React from 'react'

async function BestSellers() {
    const bestSellers = await getBestSellers(3)
    const locale = await getCurrentLocale();

    const { OurBestSellers, checkOut } = (await getTrans(locale)).home.bestSeller;
    return (
        <div className='container '>
            <div className='text-center mb-4'>
                <MainHeading
                    subTitle={checkOut}
                    title={OurBestSellers} />
            </div>


        </div>
    )
}

export default BestSellers
