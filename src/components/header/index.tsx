import React from 'react'
import Link from '../link'
import { Routes } from '@/constants/enums'
import { BsShopWindow } from "react-icons/bs";
import Nave from './nave';
import CartButton from './cart-button';
import { getCurrentLocale } from '@/lib/getCurrentLocale';
import getTrans from '@/lib/translation';
import LanguageSwitcher from './language-switcher';

async function Header() {
    const locale = await getCurrentLocale();
    const navbar = (await getTrans(locale)).navbar;

    return (
        <header className='py-4 md:py-6 bg-zinc-700'>
            <div className='container flex items-center gap-8 justify-between'>
                <Link
                    className='flex items-center gap-2' href={`/${locale}/${Routes.ROOT}`}>
                    <BsShopWindow
                        color='red'
                        size={40} />
                    <span className='text-primary text-2xl font-bold'>
                        Shop
                    </span>
                </Link>
                <div className='flex items-center gap-4'>
                    <Nave translate={navbar} />
                    <LanguageSwitcher key={1} />
                    <CartButton />
                </div>
            </div>
        </header>
    )
}

export default Header
