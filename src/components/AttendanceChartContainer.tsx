import prisma from '@/lib/prisma'
import AttendanceChart from './AttendanceChart'

const AttendanceChartContainer = async () => {
	const today = new Date()
	const todayUTC = new Date(
		Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
	)

	// Определяем начало текущей недели (понедельник 00:00:00 UTC)
	const dayOfWeekUTC = todayUTC.getUTCDay() // 0-6 (вс-сб)
	const daysSinceMonday = dayOfWeekUTC === 0 ? 6 : dayOfWeekUTC - 1
	const startOfWeekUTC = new Date(todayUTC)
	startOfWeekUTC.setUTCDate(todayUTC.getUTCDate() - daysSinceMonday)
	startOfWeekUTC.setUTCHours(0, 0, 0, 0)

	// Определяем конец недели (суббота 23:59:59.999 UTC)
	const endOfWeekUTC = new Date(startOfWeekUTC)
	endOfWeekUTC.setUTCDate(startOfWeekUTC.getUTCDate() + 5)
	endOfWeekUTC.setUTCHours(23, 59, 59, 999)

	const resData = await prisma.attendance.findMany({
		where: {
			date: {
				gte: startOfWeekUTC,
				lte: endOfWeekUTC,
			},
		},
		select: {
			date: true,
			present: true,
		},
	})

	const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

	const attendanceMap = daysOfWeek.reduce((acc, day) => {
		acc[day] = { present: 0, absent: 0 }
		return acc
	}, {} as Record<string, { present: number; absent: number }>)

	resData.forEach(item => {
		const itemDate = new Date(item.date)
		const dayOfWeekUTC = itemDate.getUTCDay()

		if (dayOfWeekUTC >= 1 && dayOfWeekUTC <= 6) {
			const dayIndex = dayOfWeekUTC - 1
			const dayName = daysOfWeek[dayIndex]

			if (item.present) {
				attendanceMap[dayName].present += 1
			} else {
				attendanceMap[dayName].absent += 1
			}
		}
	})

	const data = daysOfWeek.map(day => ({
		name: day,
		present: attendanceMap[day].present,
		absent: attendanceMap[day].absent,
	}))

	return <AttendanceChart data={data} />
}

export default AttendanceChartContainer
