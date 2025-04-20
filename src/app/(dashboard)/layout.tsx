import Menu from '@/components/Menu'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import Link from 'next/link'

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='h-screen flex'>
			{/* LEFT */}
			<div className='w-[17%] md:w-[8%] lg:w-[16%] xl:w-[17%]'>
				<Link href='/' className='flex items-center justify-center'>
					<Image src='/blueGguorLogo.svg' alt='logo' width={85} height={85} />
					<div className='font-medium leading-3 pl-2 border-l-1 border-black hidden xl:block'>
						<p className='text-xxxs leading-3'>филиал учреждения образования</p>
						<p className='text-xxs'>ГОМЕЛЬСКОЕ</p>
						<p className='text-xxs'>ГОСУДАРСТВЕННОЕ</p>
						<p className='text-xxs'>УЧИЛИЩЕ</p>
						<p className='text-xxs'>ОЛИМПИЙСКОГО</p>
						<p className='text-xxs'>РЕЗЕРВА</p>
					</div>
				</Link>
				<Menu />
			</div>
			{/*RIGHT */}
			<div className='w-[83%] md:w-[92%] lg:w-[84%] xl:w-[83%] bg-[#F7F8FA] overflow-scroll flex flex-col'>
				<Navbar/>
				{children}
			</div>
		</div>
	)
}
