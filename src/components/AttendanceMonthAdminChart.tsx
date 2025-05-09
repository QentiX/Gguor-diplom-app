'use client'

import { TrendingUp } from 'lucide-react'
import { Pie, PieChart } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { useEffect, useState } from 'react'
import MonthSelection from './MonthSelection'

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
	onMonthChange
}: {
	chartData: { attendance: string; visitors: number; fill: string }[]
	onMonthChange: (month: number, year: number) => void
}) => {
	// const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
	// const [year, setYear] = useState<number>(new Date().getFullYear())
	// const [selectedMonth, setSelectedMonth] = useState()
	// const [selectedYear, setSelectedYear] = useState()

	// useEffect(() => {
	// 	console.log(month,year)
	// }, [])

	return (
		<Card className='flex flex-col'>
			<CardHeader className='items-center pb-0'>
				<CardTitle>Посещаемость за месяц</CardTitle>
				<CardDescription>
					<MonthSelection
						onChange={onMonthChange}
					/>
					{/* <MonthSelection
						onChange={(selectedMonth, selectedYear) => {
							setMonth(selectedMonth)
							setYear(selectedYear)
						}}
					/> */}
				</CardDescription>
			</CardHeader>
			<CardContent className='flex-1 pb-0'>
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
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col gap-2 text-sm'>
				<div className='flex items-center gap-2 font-medium leading-none'>
					Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
				</div>
				<div className='leading-none text-muted-foreground'>
					Showing total visitors for the last 6 months
				</div>
			</CardFooter>
		</Card>
	)
}

export default AttendanceMonthAdminChart
