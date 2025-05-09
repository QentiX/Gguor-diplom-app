'use client'

import { useEffect, useState } from 'react'
import { PerformanceTeacherChart } from './PerformanceTeacherChart'

const PerformanceTeacherChartContainer = ({
	teacherId,
}: {
	teacherId: string
}) => {
	const [chartData, setChartData] = useState<
		{ month: string; count: number }[]
	>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('/api/performansTeacherChart', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ teacherId }),
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
	}, [teacherId])

	if (loading) return <div>Загрузка данных...</div>

	return <PerformanceTeacherChart data={chartData} />
}

export default PerformanceTeacherChartContainer
