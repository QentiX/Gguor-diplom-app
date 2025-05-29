'use client'

import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import TeacherAttendanceChart from './TeacherAttendanceChart'

const getMonthStartEnd = () => {
	const now = new Date()
	const start = new Date(now.getFullYear(), now.getMonth(), 1)
	const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
	return { start, end }
}

const TeacherAttendanceChartContainer = ({
	teacherId,
}: {
	teacherId: string
}) => {
	const { start, end } = getMonthStartEnd()
	const [fromDate, setFromDate] = useState<Date>(start)
	const [toDate, setToDate] = useState<Date>(end)
	const [chartData, setChartData] = useState<any[]>([])
	const [exportData, setExportData] = useState<any[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [teacherName, setTeacherName] = useState<string>('')

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const res = await fetch('/api/teacherAttendance', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						from: fromDate.toISOString(),
						to: toDate.toISOString(),
						teacherId,
					}),
				})

				const { chartData, exportData, teacherName } = await res.json()
				setChartData(chartData)
				setExportData(exportData)
				setTeacherName(teacherName || 'Преподаватель')
			} catch (err) {
				console.error('Ошибка загрузки:', err)
			} finally {
				setIsLoading(false)
			}
		}

		if (fromDate && toDate) fetchData()
	}, [fromDate, toDate, teacherId])

	const handleExport = () => {
		if (exportData.length === 0) {
			alert('Нет данных для экспорта')
			return
		}

		const formattedData = exportData.map((entry: any) => ({
			Студент: entry.student,
			Занятие: entry.lesson,
			Предмет: entry.subject,
			'Время начала': new Date(entry.startTime).toLocaleString(),
			'Время окончания': new Date(entry.endTime).toLocaleString(),
			Статус: entry.attendance,
			Преподаватель: entry.teacher,
		}))

		const worksheet = XLSX.utils.json_to_sheet(formattedData)
		const workbook = XLSX.utils.book_new()

		worksheet['!cols'] = [
			{ wch: 30 },
			{ wch: 25 },
			{ wch: 25 },
			{ wch: 20 },
			{ wch: 20 },
			{ wch: 15 },
			{ wch: 30 },
		]

		XLSX.utils.book_append_sheet(workbook, worksheet, 'Посещаемость')
		XLSX.writeFile(
			workbook,
			`Посещаемость_${teacherName}_${fromDate.toLocaleDateString()}-${toDate.toLocaleDateString()}.xlsx`
		)
	}

	return (
		<TeacherAttendanceChart
			fromDate={fromDate}
			toDate={toDate}
			onFromDateChange={setFromDate}
			onToDateChange={setToDate}
			chartData={chartData}
			handleExport={handleExport}
			isLoading={isLoading}
		/>
	)
}

export default TeacherAttendanceChartContainer
