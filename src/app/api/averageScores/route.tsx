import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { type } = await req.json()

	try {
		const results = await prisma.result.findMany({
			where: {
				OR: [{ exam: { isNot: null } }, { assignment: { isNot: null } }],
			},
			include: {
				exam: {
					include: {
						lesson: {
							include: {
								subject: type === 'subjects',
								disciplines: type === 'disciplines',
							},
						},
					},
				},
				assignment: {
					include: {
						lesson: {
							include: {
								subject: type === 'subjects',
								disciplines: type === 'disciplines',
							},
						},
					},
				},
			},
		})

		const grouped = results.reduce((acc, result) => {
			let lesson, entityName, entityId

			if (result.exam) {
				lesson = result.exam.lesson
			} else if (result.assignment) {
				lesson = result.assignment.lesson
			} else {
				return acc
			}

			if (type === 'subjects') {
				entityId = lesson?.subject?.id
				entityName = lesson?.subject?.name
			} else {
				entityId = lesson?.disciplines?.id
				entityName = lesson?.disciplines?.name
			}

			if (!entityId || !entityName) return acc

			if (!acc[entityId]) {
				acc[entityId] = {
					name: entityName,
					total: 0,
					count: 0,
				}
			}

			acc[entityId].total += result.score
			acc[entityId].count++

			return acc
		}, {} as Record<string, { name: string; total: number; count: number }>)

		const data = Object.values(grouped)
			.map(item => ({
				name: item.name,
				average: Number((item.total / item.count).toFixed(1)),
			}))
			.sort((a, b) => b.average - a.average)

		return NextResponse.json({ data })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Ошибка расчета средних баллов' },
			{ status: 500 }
		)
	}
}
