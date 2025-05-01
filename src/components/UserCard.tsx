import prisma from '@/lib/prisma'
import Image from 'next/image'

const UserCard = async ({
	type,
}: {
	type: 'админ' | 'учителя' | 'тренер' | 'студент'
}) => {
	const modelMap: Record<typeof type, any> = {
		админ: prisma.admin,
		учителя: prisma.teacher,
		студент: prisma.student,
		тренер: prisma.coach,
	}

	const data = await modelMap[type].count()

	return (
		<div className='rounded-md odd:bg-[#6ECBF4] even:bg-[#B3E2FD] p-4 flex-1 min-w-[130px]'>
			<div className='flex justify-between items-center'>
				<span className='text-[10px] font-semibold bg-white px-2 py-1 rounded-full text-[#0A3470]'>
					2024/25
				</span>
				<Image src='/more.png' alt='' width={20} height={20} />
			</div>
			<h1 className='text-2xl font-semibold my-4'>{data}</h1>
			<h2 className='capitalize text-sm font-medium text-gray-600 '>
				{type === 'учителя' ? type : type + 'ы'}
			</h2>
		</div>
	)
}

export default UserCard
