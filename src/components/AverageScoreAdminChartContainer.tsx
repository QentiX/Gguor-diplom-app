'use client'

import { useEffect, useState } from 'react'
import { AverageScoreAdminChart } from './AverageScoreAdminChart'

type ChartData = {
	name: string
	average: number
}

type ChartType = 'subjects' | 'disciplines'

const AverageScoreAdminChartContainer = () => {
	const [activeChart, setActiveChart] = useState<ChartType>('subjects')
	const [chartData, setChartData] = useState<ChartData[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				setError(null)

				const res = await fetch('/api/averageScores', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ type: activeChart }),
				})

				if (!res.ok) throw new Error('Ошибка загрузки данных')

				const { data } = await res.json()
				setChartData(data)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [activeChart])

	return (
		<AverageScoreAdminChart
			activeChart={activeChart}
			chartData={chartData}
			loading={loading}
			error={error}
			onChartChange={setActiveChart}
		/>
	)
}

export default AverageScoreAdminChartContainer
