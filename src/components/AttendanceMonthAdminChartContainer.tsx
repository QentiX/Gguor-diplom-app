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
	// const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
	// const [year, setYear] = useState<number>(new Date().getFullYear())
	const [chartData, setChartData] = useState<
		{ attendance: string; visitors: number; fill: string }[]
	>([])
	const [exportData, setExportData] = useState<any[]>([])
	const [selectedMonth, setSelectedMonth] = useState<number>(
		new Date().getMonth() + 1
	)
	const [selectedYear, setSelectedYear] = useState<number>(
		new Date().getFullYear()
	)

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('/api/attendanceList', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ month: selectedMonth, year: selectedYear }),
			})
			const data = await res.json()
			setChartData(data.chartData)

			const resExport = await fetch('/api/attendanceDetails', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ month: selectedMonth, year: selectedYear }),
			})
			const exportData = await resExport.json()
			setExportData(exportData.data)
		}

		fetchData()
	}, [selectedMonth, selectedYear])

	return (
		<AttendanceMonthAdminChart
			chartData={chartData}
			exportData={exportData}
			selectedMonth={selectedMonth}
			selectedYear={selectedYear}
			onMonthChange={(m, y) => {
				setSelectedMonth(m)
				setSelectedYear(y)
			}}
		/>
	)
}

export default AttendanceMonthAdminChartContainer
