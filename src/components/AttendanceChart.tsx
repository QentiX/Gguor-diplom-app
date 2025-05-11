'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
		color: '#0A3470',
	},
	absent: {
		label: 'Отсутствует',
		color: '#3780D2',
	},
} satisfies ChartConfig

const AttendanceChart = ({
	data,
}: {
	data: { name: string; present: number; absent: number }[]
}) => {
	return (
		<Card className='shadow-lg border-none'>
			<CardHeader className='mb-2'>
				<CardTitle>Посещаемость за текущую неделю</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className='min-h-[250px]'>
					<BarChart accessibilityLayer data={data}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='name'
							tickLine={false}
							tickMargin={7}
							axisLine={false}
							tickFormatter={value => value.slice(0, 3)}
							className='mb-22'
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
