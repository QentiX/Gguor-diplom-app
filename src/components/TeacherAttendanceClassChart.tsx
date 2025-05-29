'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import React from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

interface Student {
	id: string
	fullName: string
}

interface Props {
	fromDate: Date
	toDate: Date
	onFromDateChange: (date: Date) => void
	onToDateChange: (date: Date) => void
	chartData: { attendance: string; visitors: number; fill: string }[]
	isLoading: boolean
	teacherName: string
	students: Student[]
	selectedStudentId: string | null
	onStudentChange: (id: string | null) => void
	handleExport: () => void
}

const TeacherAttendanceClassChart: React.FC<Props> = ({
	fromDate,
	toDate,
	onFromDateChange,
	onToDateChange,
	chartData,
	isLoading,
	teacherName,
	students,
	selectedStudentId,
	onStudentChange,
	handleExport,
}) => {
	const chartTitle =
		selectedStudentId && selectedStudentId !== ''
			? `Посещаемость студента за период`
			: `Посещаемость класса за период`

	return (
		<div className='p-4 rounded-lg w-full bg-white shadow-lg'>
			<h2 className='text-base font-semibold mb-4 text-center'>{chartTitle}</h2>

			<div className='mb-4 flex flex-wrap gap-4 items-center justify-center'>
				<label className='text-sm'>
					С:
					<input
						type='date'
						value={fromDate.toISOString().slice(0, 10)}
						onChange={e => onFromDateChange(new Date(e.target.value))}
						className='ml-2 border rounded px-2 py-1'
					/>
				</label>

				<label className='text-sm'>
					По:
					<input
						type='date'
						value={toDate.toISOString().slice(0, 10)}
						onChange={e => onToDateChange(new Date(e.target.value))}
						className='ml-2 border rounded px-2 py-1'
					/>
				</label>

				<Select
					value={selectedStudentId ?? 'all'}
					onValueChange={val => onStudentChange(val === 'all' ? null : val)}
				>
					<SelectTrigger className='w-[220px]'>
						<SelectValue placeholder='Выберите студента' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>Весь класс</SelectItem>
						{students.map(s => (
							<SelectItem key={s.id} value={s.id}>
								{s.fullName}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<button
					className='ml-[4px] bg-[#0A3470] text-white px-4 py-2 rounded hover:bg-[#0A3470] text-sm'
					onClick={handleExport}
				>
					Экспорт в Excel
				</button>
			</div>

			<div className='relative' style={{ height: '400px' }}>
				{isLoading ? (
					<div className='absolute inset-0 bg-gray-200 animate-pulse rounded' />
				) : chartData.length === 0 ? (
					<p className='text-center text-gray-500 mt-20'>Нет данных</p>
				) : (
					<ResponsiveContainer width='100%' height='100%'>
						<BarChart data={chartData}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='attendance' tick={{ fontSize: 14 }} />
							<YAxis allowDecimals={false} tick={{ fontSize: 14 }} />
							<Tooltip
								formatter={(value: number) => [`${value}`, 'Количество']}
								contentStyle={{
									borderRadius: '0.5rem',
									color: '#0A3470',
								}}
							/>
							<Bar dataKey='visitors' name='Количество' radius={[16, 16, 0, 0]}>
								{chartData.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={
											entry.attendance === 'Присутствовал'
												? '#0A3470'
												: '#3780D2'
										}
									/>
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				)}
			</div>
		</div>
	)
}

export default TeacherAttendanceClassChart
