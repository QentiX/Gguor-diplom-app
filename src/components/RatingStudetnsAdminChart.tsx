'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

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

interface RatingChartProps {
	data: Array<{
		student: string
		average: number
	}>
}

const chartConfig = {
	average: {
		label: 'Средний балл',
		color: '#2563EB',
	},
	label: {
		color: 'hsl(var(--background))',
	},
} satisfies ChartConfig

export function RatingStudetnsAdminChart({ data }: RatingChartProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Лучшие студенты по среднему баллу</CardTitle>
				<CardDescription>Показатели за последние 6 месяцев</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						width={800}
						height={400}
						data={data}
						layout='vertical'
						margin={{
							right: 30,
							left: 20,
							top: 20,
						}}
					>
						<CartesianGrid horizontal={false} />
						<YAxis
							dataKey='student'
							type='category'
							tickLine={false}
							axisLine={false}
							tick={{ fontSize: 12 }}
							width={150}
						/>
						<XAxis type='number' hide domain={[0, 100]} />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='line' />}
						/>
						<Bar dataKey='average' fill='#2563EB' radius={4}>
							<LabelList
								dataKey='average'
								position='right'
								fill='hsl(var(--foreground))'
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col items-start gap-2 text-sm'>
				<div className='flex gap-2 font-medium leading-none'>
					Рейтинг, основанный на экзаменах и заданиях
				</div>
				<div className='leading-none text-muted-foreground'>
					Показаны 10 лучших студентов за последние 6 месяцев
				</div>
			</CardFooter>
		</Card>
	)
}
