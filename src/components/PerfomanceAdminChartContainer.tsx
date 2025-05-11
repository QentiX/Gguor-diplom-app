'use client'

import { useEffect, useState } from 'react'
import { PerfomanceAdminChart } from './PerfomanceAdminChart'

const PerfomanceAdminChartContainer = ({
	studentId,
}: {
	studentId: string
}) => {
	const [chartData, setChartData] = useState<
		{ month: string; average: number }[]
	>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('/api/studentPerfomance', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ studentId }),
				})

				const { data } = await res.json()
				const now = new Date()

				// Форматирование данных для графика
				const formattedData = Array.from({ length: 6 }, (_, i) => {
					const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
					const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
					const dbData = data.find(
						(d: any) => `${d.year}-${d.month}` === monthKey
					)

					return {
						month: date.toLocaleString('ru', { month: 'long' }),
						average: dbData?.average || 0,
					}
				}).reverse()

				setChartData(formattedData)
			} catch (error) {
				console.error('Error fetching performance data:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [studentId])

	// if (loading) return <div>Загрузка данных...</div>

	return <PerfomanceAdminChart data={chartData} loading={loading}/>
}

export default PerfomanceAdminChartContainer
