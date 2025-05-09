'use client'

import { useEffect, useState } from 'react'
import AttendanceMonthAdminChart from './AttendanceMonthAdminChart'

const AttendanceMonthAdminChartContainer = () => {
	// const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
	// const [year, setYear] = useState<number>(new Date().getFullYear())

	// const month = parseInt('5')
	// const year = parseInt('2025')

	// const attendanceRecords = await prisma.attendance.findMany({
	// 	where: {
	// 		date: {
	// 			gte: new Date(year, month - 1, 1),
	// 			lt: new Date(year, month, 1),
	// 		},
	// 	},
	// 	select: {
	// 		date: true,
	// 		present: true,
	// 		studentId: true,
	// 	},
	// })

	// const presentCount = attendanceRecords.filter(a => a.present).length
	// const absentCount = attendanceRecords.length - presentCount

	// const chartData = [
	// 	{
	// 		attendance: 'present',
	// 		visitors: presentCount,
	// 		fill: 'var(--color-present)',
	// 	},
	// 	{
	// 		attendance: 'absent',
	// 		visitors: absentCount,
	// 		fill: 'var(--color-absent)',
	// 	},
	// ]
	const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
	const [year, setYear] = useState<number>(new Date().getFullYear())
	const [chartData, setChartData] = useState<
		{ attendance: string; visitors: number; fill: string }[]
	>([])

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('/api/attendanceList', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ month, year }),
			})
			const data = await res.json()
			setChartData(data.chartData)
		}

		fetchData()
	}, [month, year])

	return (
		<AttendanceMonthAdminChart
			chartData={chartData}
			onMonthChange={(m, y) => {
				setMonth(m)
				setYear(y)
			}}
		/>
	)
}

export default AttendanceMonthAdminChartContainer
