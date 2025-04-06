import React from 'react'
import MainHeading from '../main-heading'
import { getCurrentLocale } from '@/lib/getCurrentLocale';
import getTrans from '@/lib/translation';

async function About() {
    const locale = await getCurrentLocale();
    const { hero, about, bestSeller, contact } = (await getTrans(locale)).home;

    return (
        <section>
            <div className='text-center mb-4'>
                <MainHeading title='about' subTitle='' ></MainHeading>
            </div>

            <p className="text-center px-24 py-2">
                {about.descriptions.one}
            </p>

            <p className="text-center px-24 py-2">
                {about.descriptions.two}
            </p>

            <p className="text-center px-24 py-4">
                {about.descriptions.three}
            </p>
        </section>
    )
}

export default About
