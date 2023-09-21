import Image from 'next/image';
import React from 'react'
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

const ImageCard = ({image}) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: image.id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
    console.log(image.id)
    return (
		<section ref={setNodeRef} style={style} {...attributes} {...listeners} className={`  shadow-md p-2  cursor-grab touch-manipulation`}>
			<div className='block relative xs:h-[120px] sm:h-[150px]  md:h-[200px] lg:h-[250px] rounded-xl shadow-lg '>
				<Image placeholder='empty' blurDataURL={image?.blur_hash || 'LJJ*esOZ?w-;~XsmaJxvT1t6jEbI'} src={image?.urls?.small} layout='fill' objectFit='cover' alt='image' className={`${isDragging ? 'opacity-50 bg-[rgba(0,0,0,0.8)]' : 'opacity-100'} rounded-md aspect-square bg-blend-color bg-center`} />
			</div>
			<ul className='flex w-full bg-white gap-1 justify-start flex-nowrap'>
				{image?.tags?.slice(0, 2).map((tag) => (
					<li key={tag?.title.slice(0, 7)} className='shadow-md text-gray-600 text-[12px] rounded-md border border-gray-200 md:text-[14px] lg:text-base p-1 py-0 mt-1'>
						{tag?.title.slice(0, 10)}
					</li>
				))}
			</ul>
		</section>
	);
};

export default ImageCard
