"use client";
import { Routes } from '@/constants/enums'
import getCartQuantity from '@/lib/cart'
import { useAppSelector } from '@/redux/hooks';
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CartButton() {
  const cart = useAppSelector(state => state.cart.items)
  const quantity = getCartQuantity(cart)
  return (
    <Link href={`/${Routes.CART}`} className='block relative group '>
      <span className='rounded-full absolute centerall -top-4  start-4 w-5 h-5 bg-primary  '>
        {quantity}
      </span>
      <ShoppingCart />
    </Link>
  )
}

export default CartButton