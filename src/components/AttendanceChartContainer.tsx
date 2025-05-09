import prisma from '@/lib/prisma'
import AttendanceChart from './AttendanceChart'

const AttendanceChartContainer = async () => {
	const today = new Date()
	const dayOfWeek = today.getDay()
	const daysSinceMonday = dayOfWeek === 0 ? 7 : dayOfWeek - 1

	const lastMonday = new Date(today)

	lastMonday.setDate(today.getDate() - daysSinceMonday)

	const resData = await prisma.attendance.findMany({
		where: {
			date: {
				gte: lastMonday,
			},
		},
		select: {
			date: true,
			present: true,
		},
	})

	const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

	const attendanceMap: {
		[key: string]: { present: number; absent: number }
	} = {
		Пн: { present: 0, absent: 0 },
		Вт: { present: 0, absent: 0 },
		Ср: { present: 0, absent: 0 },
		Чт: { present: 0, absent: 0 },
		Пт: { present: 0, absent: 0 },
		Сб: { present: 0, absent: 0 },
	}

	resData.forEach(item => {
		const itemDate = new Date(item.date)
		const dayOfWeek = itemDate.getDay()

		if (dayOfWeek >= 1 && dayOfWeek <= 6) {
			const dayName = daysOfWeek[dayOfWeek - 1]

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

	console.log(data);
	

	return <AttendanceChart data={data} />
}

export default AttendanceChartContainer
