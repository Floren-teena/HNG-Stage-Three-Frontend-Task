import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineMenuUnfold, AiOutlineClose } from 'react-icons/ai';
import FilterForm from './FilterForm';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const NavigationBar = ({filterSearch}) => {
	const [height, setHeight] = useState(0);
	const [openForm, setOpenForm] = useState(false);
	
	const router = useRouter();

	const handleSignout = async () => {
		await signOut({
			redirect: false,
		});
	};

	return (
		<nav className={`px-4 md:px-8 py-4 z-[999999999] bg-zinc-900 shadow-md transition-all duration-300 ease-in-out fixed top-0 left-0 w-full`}>
			<section className='relative'>
				<div className=' flex justify-between items-center'>
					<div className='text-white font-bold'>
						<Link href='/'>
							<div className='md:p-2 text-xl flex items-center gap-3 font-bold'>
								<Image src='/assets/images/logo.svg' alt='image' layout='intrisic' height={25} width={25} />
								<h1 className={`text-white text-sm md:text-[20px] font-bold`}>Flos Gallery</h1>
							</div>
						</Link>
					</div>
					<div className='hidden md:flex rounded-lg'>
						<FilterForm filterSearch={filterSearch}/>
					</div>
					<button onClick={handleSignout} className='cursor-pointer  font-semibold text-white'>
						Log out
					</button>
				</div>
				<div className='flex md:hidden rounded-lg w-full'>
					<FilterForm filterSearch={filterSearch}/>
				</div>
			</section>
		</nav>
	);
};

export default NavigationBar;