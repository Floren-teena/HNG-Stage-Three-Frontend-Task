import Image from 'next/image';
import React from 'react'

const ImageCard = ({image}) => {
    console.log(image.id)
    return (
		<section className={`  shadow-md p-2  cursor-grab touch-manipulation`}>
			<div className='block relative xs:h-[120px] sm:h-[150px]  md:h-[200px] lg:h-[250px] rounded-xl shadow-lg '>
				<Image placeholder='empty' blurDataURL={image?.blur_hash || 'LJJ*esOZ?w-;~XsmaJxvT1t6jEbI'} src={image?.urls?.small} layout='fill' objectFit='cover' alt='image' className={`rounded-md aspect-square bg-blend-color bg-center`} />
			</div>
			<ul className='flex w-full bg-white gap-1 justify-start flex-nowrap'>
				{image?.tags?.slice(0, 2).map((tag) => (
					<li key={tag?.title.slice(0, 7)} className='text-gray-600 shadow-md text-[12px] rounded-md border border-gray-200 md:text-[14px] lg:text-base p-1 py-0 mt-1'>
						{tag?.title.slice(0, 10)}
					</li>
				))}
			</ul>
		</section>
	);
}

export default ImageCard
