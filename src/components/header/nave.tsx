"use client";
import { Pages, Routes } from '@/constants/enums'
import React, { Component, FC, HTMLAttributes, useEffect, useState } from 'react'
import Link from '../link';
import { Button, buttonVariants } from '../ui/button';
import { IoMenu } from "react-icons/io5";
import { LuX } from "react-icons/lu";
import { i18n, Locale } from '@/i18n.config';
import { useParams, usePathname } from 'next/navigation';


type CustomLinkProps = {
    className?: React.ReactNode;
    translate: { [key: string]: string[] };
} & HTMLAttributes<HTMLAnchorElement>



const Nave: FC<CustomLinkProps> = ({ className, translate }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const { locale } = useParams();
    const pathname = usePathname()
    const Links = [
        { id: crypto.randomUUID(), title: translate.menu, href: Routes.MENU },
        { id: crypto.randomUUID(), title: translate.about, href: Routes.ABOUT },
        { id: crypto.randomUUID(), title: translate.contact, href: Routes.CONTACT },
        { id: crypto.randomUUID(), title: translate.login, href: `${Routes.AUTH}/${Pages.LOGIN}` },
    ]
    return (
        <nav className="order-last lg:order-none">

            <Button
                variant="secondary"
                size="sm"
                className="lg:hidden"
                onClick={() => setOpenMenu(true)}
            >
                <IoMenu className='!w-6 !h-6 ' color='black' />
            </Button>

            <ul className={`${className} fixed lg:static
                    ${openMenu ? "left-0 z-40 bg-zinc-800" : "-left-full"}
                    top-0 px-10 py-20 text  lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10`}
            >
                <Button
                    variant="secondary"
                    size="sm"
                    className={`absolute z-50 top-10 right-10 lg:hidden
                    ${openMenu ? "block " : "hidden"}
                    `}
                    onClick={() => setOpenMenu(false)}
                >
                    <LuX className='!w-6 !h-6 ' color='black' />
                </Button>
                {Links.map(link => (
                    <li key={link.id}>
                        <Link
                            className={`
                                ${link.href === `${Routes.AUTH}/${Routes.PROFILE}`
                                    ? `${buttonVariants({ size: 'sm' })} !px-8 !rounded-full !text-sm !font-semibold !bg-primary !text-primary-foreground !hover:bg-primary/90 !hover:text-primary-foreground !shadow-sm`
                                    : 'text-accent hover:text-primary duration-200 transition-colors'
                                } font-semibold
                                ${pathname.split('/')[2] === link.href && 'text-yellow-200'}                                `}
                            href={`/${locale}/${link.href}`}>
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav >
    )
}

export default Nave
