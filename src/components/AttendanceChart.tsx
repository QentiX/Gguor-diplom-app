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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

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
	const maxValue = Math.max(
		...data.map(item => Math.max(item.present, item.absent))
	)

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
							tickLine={true}
							tickMargin={7}
							axisLine={true}
							tickFormatter={value => value.slice(0, 3)}
							className='mb-22'
						/>
						<YAxis
							axisLine={true}
							tickLine={true}
							tickCount={6}
							domain={[0, maxValue + 1]}
							allowDecimals={false}
							tickMargin={10}
							width={30}
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
