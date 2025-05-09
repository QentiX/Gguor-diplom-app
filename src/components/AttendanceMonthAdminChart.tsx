'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { ArrowDownToLine } from 'lucide-react'
import { Pie, PieChart } from 'recharts'
import * as XLSX from 'xlsx'
import MonthSelection from './MonthSelection'
import { Button } from './ui/button'

const chartConfig = {
	visitors: {
		label: 'Visitors',
	},
	present: {
		label: 'Присутствует',
		color: '#2563EB',
	},
	absent: {
		label: 'Отсутствует',
		color: '#60A8FB',
	},
} satisfies ChartConfig

const AttendanceMonthAdminChart = ({
	chartData,
	exportData,
	onMonthChange,
	selectedMonth,
	selectedYear,
}: {
	chartData: { attendance: string; visitors: number; fill: string }[]
	exportData: any[]
	onMonthChange: (month: number, year: number) => void
	selectedMonth: number
	selectedYear: number
}) => {
	const handleExport = () => {
		if (exportData.length === 0) {
			alert('Нет данных для экспорта')
			return
		}

		const worksheet = XLSX.utils.json_to_sheet(exportData)
		const workbook = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Посещаемость')

		// Используем переданные значения
		XLSX.writeFile(
			workbook,
			`Посещаемость_${selectedMonth
				.toString()
				.padStart(2, '0')}-${selectedYear}.xlsx`
		)
	}

	return (
		<Card className='flex flex-col mb-4'>
			<CardHeader className='items-center pb-0'>
				<CardTitle>Посещаемость за месяц</CardTitle>
				<CardDescription className='flex gap-2'>
					<MonthSelection onChange={onMonthChange} />
					<Button variant='outline' onClick={handleExport}>
						<ArrowDownToLine size={20} />
					</Button>
				</CardDescription>
			</CardHeader>
			<CardContent className='flex-1 pb-4'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square max-h-[250px]'
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey='visitors'
							nameKey='attendance'
							innerRadius={60}
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}

export default AttendanceMonthAdminChart
