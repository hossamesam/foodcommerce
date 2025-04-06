import { Locale } from '@/i18n.config';
import { getCurrentLocale } from '@/lib/getCurrentLocale';
import getTrans from '@/lib/translation';
import React from 'react'

function usetrans() {
    trans().then((res) => {
        return res 
    })
        .catch((err) => {
            return "err"
        })
}


async function trans() {
    const locale = await getCurrentLocale();
    const trans = (await getTrans(locale))
    return trans
}


export default usetrans
