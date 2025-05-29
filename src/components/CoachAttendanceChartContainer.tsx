'use client'

import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import CoachAttendanceChart from './CoachAttendanceChart'

const getMonthStartEnd = () => {
	const now = new Date()
	const start = new Date(now.getFullYear(), now.getMonth(), 1)
	const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
	return { start, end }
}

const CoachAttendanceChartContainer = ({ coachId }: { coachId: string }) => {
	const { start, end } = getMonthStartEnd()
	const [fromDate, setFromDate] = useState<Date>(start)
	const [toDate, setToDate] = useState<Date>(end)
	const [chartData, setChartData] = useState<any[]>([])
	const [exportData, setExportData] = useState<any[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [coachName, setCoachName] = useState<string>('')

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const res = await fetch('/api/coachAttendance', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						from: fromDate.toISOString(),
						to: toDate.toISOString(),
						coachId,
					}),
				})

				const { chartData, exportData, coachName } = await res.json()
				setChartData(chartData)
				setExportData(exportData)
				setCoachName(coachName || 'Тренер')
			} catch (err) {
				console.error('Ошибка загрузки:', err)
			} finally {
				setIsLoading(false)
			}
		}

		if (fromDate && toDate) fetchData()
	}, [fromDate, toDate, coachId])

	const handleExport = () => {
		if (exportData.length === 0) {
			alert('Нет данных для экспорта')
			return
		}

		const formattedData = exportData.map((entry: any) => ({
			Студент: entry.student,
			Занятие: entry.lesson,
			Дисциплина: entry.subject,
			'Время начала': new Date(entry.startTime).toLocaleString(),
			'Время окончания': new Date(entry.endTime).toLocaleString(),
			Статус: entry.attendance,
			Тренер: entry.coach,
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
			`Посещаемость_${coachName}_${fromDate.toLocaleDateString()}-${toDate.toLocaleDateString()}.xlsx`
		)
	}

	return (
		<CoachAttendanceChart
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

export default CoachAttendanceChartContainer
