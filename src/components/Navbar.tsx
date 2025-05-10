import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { UserButtonWrapper } from './UserButtonWrapper'

const Navbar = async () => {
	const user = await currentUser()
	return (
		<div className='flex items-center justify-between p-4'>
			{/* SEARCH BAR */}
			<div className='hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
				<Image src='/search.png' alt='' width={14} height={14} />
				<input
					type='text'
					placeholder='Искать...'
					className='w-[200px] p-2 bg-transparent outline-none'
				/>
			</div>
			{/* ICONS AND USER */}
			<div className='flex items-center gap-6 justify-end w-full'>
				<div className='flex flex-col'>
					<span className='text-xs leading-3 font-medium'>
						{user?.fullName}
					</span>
					<span className='text-[10px] text-gray-500 text-right'>
						{user?.publicMetadata?.role as string}
					</span>
				</div>
				<UserButtonWrapper userRole={user?.publicMetadata?.role as string} userId={user?.id as string}/>
			</div>
		</div>
	)
}

export default Navbar
