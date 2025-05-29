'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { Calendar } from 'lucide-react'
import { Pie, PieChart } from 'recharts'
import { Button } from './ui/button'

const CoachAttendanceChart = ({
	fromDate,
	toDate,
	onFromDateChange,
	onToDateChange,
	chartData,
	handleExport,
	isLoading,
}: {
	fromDate: Date
	toDate: Date
	onFromDateChange: (date: Date) => void
	onToDateChange: (date: Date) => void
	chartData: any[]
	handleExport: () => void
	isLoading: boolean
}) => {
	return (
		<Card className='shadow-lg border-none'>
			<CardHeader className='items-center pb-0'>
				<CardTitle>Посещаемость у тренера за период</CardTitle>
				<CardDescription className='flex flex-col sm:flex-row gap-2'>
					<div className='flex gap-2 items-center'>
						<Calendar size={16} />
						<input
							type='date'
							value={fromDate.toISOString().split('T')[0]}
							onChange={e => onFromDateChange(new Date(e.target.value))}
							className='border px-2 py-1 rounded'
						/>
						<span>-</span>
						<input
							type='date'
							value={toDate.toISOString().split('T')[0]}
							onChange={e => onToDateChange(new Date(e.target.value))}
							className='border px-2 py-1 rounded'
						/>
					</div>
					<Button variant='outline' onClick={handleExport}>
						Экспорт в Excel
					</Button>
				</CardDescription>
			</CardHeader>
			<CardContent className='relative min-h-[300px] flex items-center justify-center'>
				{isLoading ? (
					<p className='text-muted-foreground text-sm'>Загрузка...</p>
				) : (
					<ChartContainer
						className='aspect-square min-h-[250px] max-h-[250px]'
						config={{
							present: { label: 'Присутствует', color: '#0A3470' },
							absent: { label: 'Отсутствует', color: '#3780D2' },
						}}
					>
						<PieChart>
							<ChartTooltip
								content={<ChartTooltipContent hideLabel />}
								cursor={false}
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
				)}
			</CardContent>
		</Card>
	)
}

export default CoachAttendanceChart
