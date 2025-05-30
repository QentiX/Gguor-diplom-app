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
import { TrendingUp } from 'lucide-react'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

const chartConfig = {
	average: {
		label: 'Ср. балл',
		color: '#0A3470',
	},
} satisfies ChartConfig

type PerformanceData = {
	month: string
	average: number
}

export function PerfomanceAdminChart({
	data,
	loading,
}: {
	data: PerformanceData[]
	loading: boolean
}) {
	return (
		<Card className='border-none shadow-lg'>
			<CardHeader className='items-center pb-4'>
				<CardTitle>Успеваемость</CardTitle>
				<CardDescription>Средний балл за последние 6 месяцев</CardDescription>
			</CardHeader>
			<CardContent className='pb-0'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square max-h-[250px]'
				>
          {loading ? <div className='flex h-full items-center justify-center text-muted-foreground'>
							Загрузка данных...
						</div>: 					<RadarChart data={data}>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<PolarAngleAxis dataKey='month' />
						<PolarGrid />
						<Radar
							dataKey='average'
							fill='var(--color-average)'
							fillOpacity={0.8}
						/>
					</RadarChart>}
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col gap-2 text-sm'>
				<div className='flex items-center gap-2 font-medium leading-none'>
					Динамика успеваемости
				</div>
				<div className='flex items-center gap-2 leading-none text-muted-foreground'>
					{new Date().toLocaleDateString('ru', {
						month: 'long',
						year: 'numeric',
					})}
				</div>
			</CardFooter>
		</Card>
	)
}
