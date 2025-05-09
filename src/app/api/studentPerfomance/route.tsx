// pages/api/performance.ts
import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).end()
	}

	const { studentId, from, to } = req.body

	try {
		const results = await prisma.result.findMany({
			where: {
				studentId,
				OR: [
					{
						exam: {
							startTime: {
								gte: new Date(from),
								lte: new Date(to),
							},
						},
					},
					{
						assignment: {
							startDate: {
								gte: new Date(from),
								lte: new Date(to),
							},
						},
					},
				],
			},
			select: {
				score: true,
			},
		})

		const average =
			results.reduce((sum, r) => sum + r.score, 0) / (results.length || 1)

		res.status(200).json({ score: Math.round(average * 100) / 100 })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal server error' })
	}
}
