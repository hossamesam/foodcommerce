'use client'
import React, { Dispatch, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import formatCurrency from '@/lib/formatters'
import { Checkbox } from '../ui/checkbox'
import { Extra, Product, ProductSize, Size } from '@prisma/client'
import { ProductWithRelations } from '@/types/Product'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addToCart, removeItemFromCart, selectCartItems } from '@/redux/features/cart/cartSlice'
import getCartQuantity, { getItemQuantity } from '@/lib/cart'


function AddtoCartButton({ item }: { item: ProductWithRelations }) {
    const dispatch = useAppDispatch()
    const cart = useAppSelector(state => state.cart)
    const defaultSize = cart.items.find((cartItem) => cartItem.id === item.id)?.sizes ||
        item.sizes.find((size) => size.name === ProductSize.Small)
    const [SelectedSize, setSelectedSize] = useState<Size>(defaultSize!)

    const defaultExtras = cart.items.find((cartItem) => cartItem.id === item.id)?.extras || []
    const [SelectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtras)
    const quantity = getItemQuantity(item.id, cart.items)

    let totalPrice = item.basePrice;
    if (SelectedSize) {
        totalPrice += SelectedSize.Price;

    }
    if (SelectedExtras.length > 0) {
        for (const extra of SelectedExtras) {
            totalPrice += extra.Price;
        }
    }

    const handleAddToCArt = () => {
        dispatch(addToCart({
            basePrice: item.basePrice,
            id: item.id,
            image: item.image,
            name: item.name,
            sizes: SelectedSize,
            extras: SelectedExtras
        }))
    }

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button >Add to Cart</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[80vh]">
                <DialogHeader>
                    <div className='relative  h-48 w-full centerall '>
                        <Image fill
                            style={{ objectFit: "contain" }}
                            alt='product'

                            src={item.image} />
                    </div>
                    <DialogTitle>{item.name}</DialogTitle>
                    <DialogDescription>
                        {item.description}
                    </DialogDescription>
                </DialogHeader>
                <div className='space-y-6 centerall flex-col'>
                    <Label className='font-bold text-md' htmlFor='pick-size'>pick your size</Label>
                    <Picksize
                        sizes={item.sizes}
                        item={item}
                        SelectedSize={SelectedSize}
                        setSelectedSize={setSelectedSize}
                    />
                </div>
                <div className='space-y-6 centerall flex-col'>
                    <Label className='font-bold text-md' htmlFor='pick-size'>add extra</Label>
                    <Extras
                        SelectedExtras={SelectedExtras}
                        setSelectedExtras={setSelectedExtras}

                        extras={item.extras} item={item} />
                </div>
                <DialogFooter className='flex justify-around items-center '>
                    {quantity === 0 ? <>
                        <span className='w-full'>
                            Total :
                            &nbsp;&nbsp;
                            {formatCurrency(totalPrice)}
                        </span>

                        <Button type="submit"
                            onClick={handleAddToCArt}
                        >
                            Add to cart
                        </Button>
                    </> :
                            <ChooseQuantity
                                quantity={quantity}
                                item={item}
                                selectedExtras={SelectedExtras}
                                selectedSize={SelectedSize} />
                    }

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default AddtoCartButton


function Picksize({ sizes, item, SelectedSize, setSelectedSize }:
    {
        sizes: Size[],
        item: Product,
        SelectedSize: Size,
        setSelectedSize: React.Dispatch<React.SetStateAction<Size>>
        // (size: Size) => void
    }) {
    return (
        <div className='w-full'
        >

            <RadioGroup defaultValue="comfortable" className='self-start'>
                {sizes.map((size) => (
                    <div
                        key={size.id}
                        className="flex border-2  border-gray-100 rounded-md p-4 items-center space-x-2"
                    >
                        <RadioGroupItem
                            value={SelectedSize.name}
                            checked={SelectedSize.id === size.id}
                            onClick={() => setSelectedSize(size)}
                            id={size.id}
                        />
                        <Label className=" w-full" htmlFor={size.id}>
                            {size.name}
                        </Label>
                        <span>{formatCurrency(item.basePrice + size.Price)}</span>
                    </div>
                ))}
            </RadioGroup>
        </div>

    )
}


function Extras({
    extras,
    item,
    SelectedExtras,
    setSelectedExtras
}: {
    extras: Extra[],
    item: Product,
    SelectedExtras: Extra[],
    setSelectedExtras: Dispatch<React.SetStateAction<Extra[]>>
    // (extra: Extra[]) => void

}) {
    const handleExtra = (extra: Extra) => {
        if (SelectedExtras.find((e) => e.id === extra.id)) {
            const filteredSelectedExtras = SelectedExtras.filter(
                (item) => item.id !== extra.id
            );
            setSelectedExtras(filteredSelectedExtras)
        } else {
            setSelectedExtras((prev) => [...prev, extra])
        }
    }

    return extras.map((extra) => (
        <div
            key={extra.id}
            className='flex grid-cols-2  w-full justify-between items-center border border-gray-100 rounded-md p-4'
        >
            <div className='flex items-center space-x-2'>
                <Checkbox

                    id={extra.id}
                    onClick={() => handleExtra(extra)}
                    checked={Boolean(SelectedExtras.find((e) => e.id === extra.id))}
                    className='self-start'
                />
                <Label
                    htmlFor={extra.id}
                    className="w-full"
                >
                    {extra.name}
                </Label>
            </div>
            <span>{formatCurrency(extra.Price)}</span>
        </div>
    )
    )
}

const ChooseQuantity = ({
    quantity,
    item,
    selectedExtras,
    selectedSize,
}: {
    quantity: number;
    selectedExtras: Extra[];
    selectedSize: Size;
    item: ProductWithRelations;
}) => {
    const dispatch = useAppDispatch();
    return (
        <div className='flex items-center flex-col gap-2 mt-4 w-full'>
            <div className='flex items-center justify-center gap-2'>
                <Button
                    variant='outline'
                    onClick={() => dispatch(removeItemFromCart({ id: item.id }))}
                >
                    -
                </Button>
                <div>
                    <span className='text-black'>{quantity} in cart</span>
                </div>
                <Button
                    variant='outline'
                    onClick={() =>
                        dispatch(
                            addToCart({
                                basePrice: item.basePrice,
                                id: item.id,
                                image: item.image,
                                name: item.name,
                                extras: selectedExtras,
                                sizes: selectedSize,
                            })
                        )
                    }
                >
                    +
                </Button>
            </div>
            <Button
                size='sm'
                onClick={() => dispatch(removeItemFromCart({ id: item.id }))}
            >
                Remove
            </Button>
        </div>
    );
};