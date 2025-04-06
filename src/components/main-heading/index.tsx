function MainHeading({ title, subTitle }: { title?: string; subTitle?: string }) {
    return (
        <>
            <span className='uppercase  text-2xl leading-4 tracking-wider'>
                {subTitle}
            </span>
            <h2 className='text-primary font-bold text-4xl italic'>{title}</h2>
        </>
    );
}

export default MainHeading;