'use client'

import { useEffect, useState } from 'react'
import { PerformansCoachChart } from './PerformansCoachChart'

const PerformanceCoachChartContainer = ({ coachId }: { coachId: string }) => {
	const [chartData, setChartData] = useState<
		{ month: string; count: number }[]
	>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('/api/performanceCoachChart', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ coachId }),
				})

				const { data } = await res.json()
				setChartData(data)
			} catch (error) {
				console.error('Error fetching lessons data:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [coachId])

	// if (loading) return <div>Загрузка данных...</div>

	return <PerformansCoachChart data={chartData} loading={loading}/>
}

export default PerformanceCoachChartContainer
