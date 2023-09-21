import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Bars } from 'react-loader-spinner';
import { toast } from 'react-toastify';

function SecureRoute({ children }) {
	const { data: session, status } = useSession();
	const router = useRouter();
	if (status === 'loading') {
		return (
			<section className='h-screen flex w-full justify-center items-center'>
				<Bars height='80' width='80' color='#4fa94d' ariaLabel='bars-loading' wrapperStyle={{}} wrapperClass='' visible={true} />
			</section>
		);
	}

	if (status === 'unauthenticated') {
		router.push('/');
		return null;
	}
	return <main className=''>{children}</main>;
}

export default SecureRoute;