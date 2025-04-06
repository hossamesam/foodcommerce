'use client'
import { Button } from '@/components/ui/button'
import { deliveryFee, getSubTotal } from '@/lib/cart'
import formatCurrency from '@/lib/formatters'
import { removeItemFromCart, selectCartItems } from '@/redux/features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import usetrans from '../../customHooks/usetrans'

function CartItems() {
    const cart = useAppSelector(selectCartItems)
    const dispatch = useAppDispatch()
    const subTotal = getSubTotal(cart);


    return (
        <div>

            {cart && cart.length > 0 ? (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                <div className='flex flex-col md:flex-row gap-6 justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <div className='relative w-24 h-24'>
                                            <Image
                                                src={item.image}
                                                className='object-contain'
                                                alt={item.name}
                                                fill
                                            />
                                        </div>
                                        <div>
                                            <h4 className='font-semibold md:text-lg'>{item.name}</h4>
                                            <div className='relative'>
                                                {item.sizes && (
                                                    <div className='flex gap-1 items-center '>
                                                        <span> Size:</span>
                                                        <span className='text-sm text-chart-2 '>
                                                            {item.sizes.name}
                                                        </span>
                                                        <span className='text-sm text-chart-2'> {formatCurrency(item.basePrice)}</span>

                                                    </div>
                                                )}
                                                {item.extras && item.extras.length > 0 && (
                                                    <div className='flex gap-1 '>
                                                        <span>Extras:</span>
                                                        <ul>
                                                            {item.extras.map((extra) => (
                                                                <li key={extra.id}>
                                                                    <span className='text-sm text-chart-2 '>
                                                                        {extra.name} {formatCurrency(extra.Price)}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                <span className='absolute    right-0  left-40  top-0  text-sm text-black'>
                                                    x{item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex-1 flex items-center gap-4 justify-end'>
                                        <strong className='text-black '>
                                            {formatCurrency(subTotal)}
                                        </strong>
                                        <Button
                                            onClick={() =>
                                                dispatch(removeItemFromCart({ id: item.id }))
                                            }
                                            variant='secondary'
                                            className='border'
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='flex flex-col items-end  w-full  pt-6 '>
                        <div className='flex flex-col   w-44  '>
                            <span className='flex w-full justify-between font-medium'>
                                <span>Subtotal :</span>
                                <strong className='text-black'>{formatCurrency(subTotal)}</strong>
                            </span>
                            <span className='flex w-full justify-between font-medium'>
                                <span>Delivery :</span>
                                <strong className='text-black '>
                                    {formatCurrency(deliveryFee)}
                                </strong>
                            </span>
                            <span className='flex w-full justify-between font-medium'>
                                <span>Total : </span>
                                <strong className='text-black'>
                                    {formatCurrency(subTotal + deliveryFee)}
                                </strong>
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                <p className='text-accent'>There are no items in your cart. Add some</p>
            )}
        </div>
    );
}
export default CartItems