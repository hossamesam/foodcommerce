import formatCurrency from '@/lib/formatters'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import AddtoCartButton from './AddtoCartButton'
import { Product } from '@prisma/client'
import { ProductWithRelations } from '@/types/Product'

function Menu({ items }: { items: ProductWithRelations[] }) {
    return items.length > 0 ? (
        <main>
            <section className='my-4 grid grid-cols-1 sm:grid-cols-3 gap-4'>
                {items.map((product) => (
                    <div key={product.id} className='bg-gray-100 p-1 justify-center items-center flex flex-col gap-4'>
                        <Image
                            style={{ objectFit: "fill" }}
                            width={250} height={250} priority
                            alt={product.name + ' image'}
                            src={product.image}
                        />
                        <div className='centerall w-full !justify-between gap-2 p-2'>
                            <h3 className='text-primary '>{product.name}</h3>
                        </div>
                        <p className='text-gray-500 p-2'>{product.description}</p>
                        <AddtoCartButton key={product.id} item={product} />
                    </div>
                ))}
            </section>
        </main>
    ) : (<div className='text-center'>
        not products found
    </div>)
}
















export default Menu

