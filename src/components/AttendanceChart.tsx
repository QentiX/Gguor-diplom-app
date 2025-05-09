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
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

const chartConfig = {
	present: {
		label: 'Присутствует',
		color: '#2563EB',
	},
	absent: {
		label: 'Отсутствует',
		color: '#60A8FB',
	},
} satisfies ChartConfig

const AttendanceChart = ({
	data,
}: {
	data: { name: string; present: number; absent: number }[]
}) => {
	return (
		// <div className='bg-white rounded-md p-4 pb-10 h-full '>
		// 	<div className='flex justify-between items-center'>
		// 		<h1 className='text-lg font-semibold mb-2'>Посещаемость</h1>
		// 	</div>
		// 	<ResponsiveContainer width='100%' height='100%'>
		// 		<BarChart
		// 			width={500}
		// 			height={300}
		// 			data={data}
		// 			margin={{
		// 				top: 5,
		// 				right: 30,
		// 				left: 20,
		// 				bottom: 5,
		// 			}}
		// 		>
		// 			<CartesianGrid strokeDasharray='3 3' />
		// 			<XAxis dataKey='name' />
		// 			<YAxis />
		// 			<Tooltip contentStyle={{borderRadius: '5px'}}/>
		// 			<Legend />
		// 			<Bar dataKey='present' fill='#0A3470' />
		// 			<Bar dataKey='absent' fill='#3E5DDB' />
		// 		</BarChart>
		// 	</ResponsiveContainer>

		// </div>
		<Card>
			<CardHeader>
				<CardTitle>Посещаемость</CardTitle>
				<CardDescription>
					Показывает информацию за текущую неделю
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart accessibilityLayer data={data}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='name'
							tickLine={false}
							tickMargin={7}
							axisLine={false}
							tickFormatter={value => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='dot' />}
						/>
						<Bar dataKey='present' fill='var(--color-present)' radius={4} />
						<Bar dataKey='absent' fill='var(--color-absent)' radius={4} />
						<ChartLegend content={<ChartLegendContent />} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}

export default AttendanceChart
