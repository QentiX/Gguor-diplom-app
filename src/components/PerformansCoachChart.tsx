'use client'

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
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

type ChartDataType = {
	month: string
	count: number
}

const chartConfig = {
	count: {
		label: 'Кол-во занятий',
		color: '#0A3470',
	},
} satisfies ChartConfig

export function PerformansCoachChart({
	data,
	loading,
}: {
	data: ChartDataType[]
	loading: boolean
}) {
	return (
		<Card className='border-none shadow-lg'>
			<CardHeader>
				<CardTitle>Статистика занятий</CardTitle>
				<CardDescription>
					{new Date().toLocaleDateString('ru', {
						month: 'long',
						year: 'numeric',
					})}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					{loading ? (
						<div className='flex h-full items-center justify-center text-muted-foreground'>
							Загрузка данных...
						</div>
					) : (
						<BarChart data={data} margin={{ top: 20 }}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey='month'
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={value => value.slice(0, 3)}
							/>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent hideLabel />}
							/>
							<Bar dataKey='count' fill='var(--color-count)' radius={8}>
								<LabelList
									position='top'
									offset={12}
									className='fill-foreground'
									fontSize={12}
								/>
							</Bar>
						</BarChart>
					)}
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col items-start gap-2 text-sm'>
				<div className='flex gap-2 font-medium leading-none'>
					Динамика занятий
				</div>
			</CardFooter>
		</Card>
	)
}
