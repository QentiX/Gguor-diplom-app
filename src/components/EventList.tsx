import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
	const date = dateParam ? new Date(dateParam) : new Date()
	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	const roleConditions = {
		teacher: { lessons: { some: { teacherId: userId! } } },
		student: { students: { some: { id: userId! } } },
		coach: { lessons: { some: { coachId: userId! } } },
	}

	const data = await prisma.event.findMany({
		where: {
			startTime: {
				gte: new Date(date.setHours(0, 0, 0, 0)),
				lte: new Date(date.setHours(23, 59, 59, 999)),
			},
			...(role !== 'admin' && {
				OR: [
					{ classId: null },
					{ class: roleConditions[role as keyof typeof roleConditions] || {} },
				],
			}),
		},
	})
	return data.map(event => (
		<div
			className='p-5 rounded-md border-1 border-gray-300 border-t-4 odd:border-t-[#3E5DDB] even:border-t-[#0A3470]'
			key={event.id}
		>
			<div className='flex items-center justify-between'>
				<h1 className='font-semibold'>{event.title}</h1>
				<span className='text-gray-500 text-xs'>
					{event.startTime.toLocaleTimeString('ru', {
						hour: '2-digit',
						minute: '2-digit',
						hour12: false,
					})}
				</span>
			</div>
			<p className='mt-2 text-[#7E7F80] text-sm'>{event.description}</p>
		</div>
	))
}

export default EventList
