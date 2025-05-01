import prisma from '@/lib/prisma'
import BigCalendar from './BigCalender'

const BigCalendarContainer = async ({
	type,
	id,
}: {
	type: 'teacherId' | 'classId' | 'coachId'
	id: string | number
}) => {
	const dataRes = await prisma.lesson.findMany({
		where: {
			...(type === 'teacherId'
				? { teacherId: id as string }
				: type === 'coachId'
				? { coachId: id as string }
				: { classId: id as number }),
		},
	})

	const data = dataRes.map(lesson => ({
		title: lesson.name,
		start: lesson.startTime,
		end: lesson.endTime,
	}))

	return (
		<div className=''>
			<BigCalendar data={data} />
		</div>
	)
}

export default BigCalendarContainer
