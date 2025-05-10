import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'

const Announcements = async () => {
	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	const roleConditions = {
		teacher: { supervisorId: userId! },
		student: { students: { some: { id: userId! } } },
	}

	const data = await prisma.announcement.findMany({
		take: 3,
		orderBy: { date: 'desc' },
		where: {
			...(role !== 'admin' && {
				OR: [
					{ classId: null },
					{ class: roleConditions[role as keyof typeof roleConditions] || {} },
				],
			}),
		},
	})
	return (
		<div className='bg-white p-4 rounded-md'>
			<div className='flex items-center justify-between'>
				<h1 className='text-xl font-semibold'>Объявления</h1>
				<Link href={'/list/announcements'}>
					<span className='text-xs text-gray-400'>Показать все</span>
				</Link>
			</div>
			<div className='flex flex-col gap-4 mt-4'>
				{data[0] && (
					<div className='bg-[#0A3470] rounded-md p-4'>
						<div className='flex items-center justify-between'>
							<h2 className='font-semibold text-white'>{data[0].title}</h2>
							<span className='text-xs font-semibold bg-white rounded-md px-1 py-1'>
								{new Intl.DateTimeFormat('ru').format(data[0].date)}
							</span>
						</div>
						<p className='text-sm text-gray-300 mt-1'>{data[0].description}</p>
					</div>
				)}
				{data[1] && (
					<div className='bg-[#3E5DDB] rounded-md p-4'>
						<div className='flex items-center justify-between'>
							<h2 className='font-semibold text-white'>{data[1].title}</h2>
							<span className='text-xs font-semibold bg-white rounded-md px-1 py-1'>
								{new Intl.DateTimeFormat('ru').format(data[1].date)}
							</span>
						</div>
						<p className='text-sm text-gray-300 mt-1'>{data[1].description}</p>
					</div>
				)}
				{data[2] && (
					<div className='bg-[#0A3470] rounded-md p-4'>
						<div className='flex items-center justify-between'>
							<h2 className='font-semibold text-white'>{data[2].title}</h2>
							<span className='text-xs font-semibold bg-white rounded-md px-1 py-1'>
								{new Intl.DateTimeFormat('ru').format(data[2].date)}
							</span>
						</div>
						<p className='text-sm text-gray-300 mt-1'>{data[2].description}</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default Announcements
