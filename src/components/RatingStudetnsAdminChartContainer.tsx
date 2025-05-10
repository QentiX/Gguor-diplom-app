'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'
import { RatingStudetnsAdminChart } from './RatingStudetnsAdminChart'

interface StudentRating {
	student: string
	average: number
}

export const RatingStudetnsAdminChartContainer = () => {
	const [data, setData] = useState<StudentRating[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/ratingStudentsAdmin', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				})

				if (!response.ok) throw new Error('Failed to fetch ratings')

				const { data } = await response.json()
				setData(data)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to load data')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) {
		return (
			<div className='space-y-4'>
				<Skeleton className='h-[300px] w-full' />
				<Skeleton className='h-[20px] w-2/3' />
			</div>
		)
	}

	if (error) {
		return (
			<div className='text-red-500 p-4 border rounded-lg bg-red-50'>
				Error: {error}
			</div>
		)
	}

	return <RatingStudetnsAdminChart data={data} />
}
