'use client'

import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import TeacherAttendanceClassChart from './TeacherAttendanceClassChart'

const getMonthStartEnd = () => {
	const now = new Date()
	const start = new Date(now.getFullYear(), now.getMonth(), 1)
	const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
	return { start, end }
}

interface Student {
	id: string
	fullName: string
}

interface ExportEntry {
	student: string
	lesson: string
	subject: string
	startTime: string
	endTime: string
	status: string
	teacher: string
}

const TeacherAttendanceClassChartContainer = ({
	teacherId,
}: {
	teacherId: string
}) => {
	const { start, end } = getMonthStartEnd()

	const [fromDate, setFromDate] = useState<Date>(start)
	const [toDate, setToDate] = useState<Date>(end)
	const [chartData, setChartData] = useState<any[]>([])
	const [exportData, setExportData] = useState<ExportEntry[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [teacherName, setTeacherName] = useState('')
	const [students, setStudents] = useState<Student[]>([])
	const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
		null
	)
	const [noClass, setNoClass] = useState(false) // 👈 Новый флаг

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const res = await fetch('/api/teacherAttendanceClass', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						from: fromDate.toISOString(),
						to: toDate.toISOString(),
						teacherId,
						studentId: selectedStudentId || undefined,
					}),
				})
				const data = await res.json()

				if (data.noClass) {
					setNoClass(true)
					return
				}

				setNoClass(false)
				setChartData(data.chartData || [])
				setExportData(data.exportData || [])
				setTeacherName(data.teacherName || 'Преподаватель')
				setStudents(data.students || [])
			} catch (error) {
				console.error('Ошибка загрузки данных:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [fromDate, toDate, teacherId, selectedStudentId])

	if (noClass) return null // ❌ Не показываем вообще, если учитель не куратор

	const handleExport = () => {
		if (exportData.length === 0) {
			alert('Нет данных для экспорта')
			return
		}

		const worksheet = XLSX.utils.json_to_sheet(exportData)
		const workbook = XLSX.utils.book_new()

		worksheet['!cols'] = [
			{ wch: 25 },
			{ wch: 25 },
			{ wch: 25 },
			{ wch: 25 },
			{ wch: 25 },
			{ wch: 20 },
			{ wch: 25 },
		]

		XLSX.utils.book_append_sheet(workbook, worksheet, 'Посещаемость')
		XLSX.writeFile(
			workbook,
			`Посещаемость_${teacherName}_${fromDate.toLocaleDateString()}-${toDate.toLocaleDateString()}.xlsx`
		)
	}

	return (
		<TeacherAttendanceClassChart
			fromDate={fromDate}
			toDate={toDate}
			onFromDateChange={setFromDate}
			onToDateChange={setToDate}
			chartData={chartData}
			isLoading={isLoading}
			teacherName={teacherName}
			students={students}
			selectedStudentId={selectedStudentId}
			onStudentChange={setSelectedStudentId}
			handleExport={handleExport}
		/>
	)
}

export default TeacherAttendanceClassChartContainer
