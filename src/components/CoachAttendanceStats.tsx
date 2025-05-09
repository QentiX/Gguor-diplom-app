import prisma from '@/lib/prisma'

const CoachAttendanceStats = async ({ coachId }: { coachId: string }) => {
	try {
		const totalLessons = await prisma.attendance.count({
			where: {
				lesson: {
					coachId: coachId,
					startTime: {
						gte: new Date(new Date().getFullYear() - 1, 0, 1),
					},
				},
			},
		})

		const presentCount = await prisma.attendance.count({
			where: {
				lesson: {
					coachId: coachId,
					startTime: {
						gte: new Date(new Date().getFullYear() - 1, 0, 1),
					},
				},
				present: true,
			},
		})

		const percentage =
			totalLessons > 0 ? Math.round((presentCount / totalLessons) * 100) : 0

		return (
			<div className=''>
				<h1 className='text-xl font-semibold'>{percentage}%</h1>
				<span className='text-sm text-gray-400'>Посещаемость занятий</span>
			</div>
		)
	} catch (error) {
		console.error('Error fetching attendance stats:', error)
		return (
			<div className='p-4 bg-red-50 text-red-600 rounded-lg'>
				Ошибка загрузки статистики
			</div>
		)
	}
}

export default CoachAttendanceStats
