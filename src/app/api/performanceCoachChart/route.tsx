// app/api/teacher-lessons/route.ts
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { coachId } = await req.json()

	if (!coachId) {
		return NextResponse.json({ error: 'Coach ID required' }, { status: 400 })
	}

	try {
		const lessons = await prisma.$queryRaw<
			{ month: number; year: number; count: bigint }[]
		>`
			SELECT 
				EXTRACT(MONTH FROM "startTime")::integer as month,
				EXTRACT(YEAR FROM "startTime")::integer as year,
				COUNT(*)::bigint as count
			FROM "Lesson"
			WHERE 
				"coachId" = ${coachId}
				AND "startTime" >= NOW() - INTERVAL '5 months'
			GROUP BY year, month
			ORDER BY year, month
		`

		const now = new Date()
		const monthMap = new Map<string, number>()

		// Заполняем последние 6 месяцев нулями
		for (let i = 5; i >= 0; i--) {
			const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
			const key = `${date.getFullYear()}-${date.getMonth() + 1}`
			monthMap.set(key, 0)
		}

		lessons.forEach(({ year, month, count }) => {
			const key = `${year}-${month}`
			if (monthMap.has(key)) {
				monthMap.set(key, Number(count))
			}
		})

		const formattedData = Array.from(monthMap)
			.map(([key, count]) => {
				const [year, month] = key.split('-')
				return {
					month: new Date(Number(year), Number(month) - 1).toLocaleDateString(
						'ru',
						{ month: 'long' }
					),
					count,
				}
			})
			.reverse()

		return NextResponse.json({ data: formattedData })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch lessons data' },
			{ status: 500 }
		)
	}
}
