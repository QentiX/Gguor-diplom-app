import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { month, year } = await req.json()

	if (!month || !year) {
		return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 })
	}

	const attendanceRecords = await prisma.attendance.findMany({
		where: {
			date: {
				gte: new Date(year, month - 1, 1),
				lt: new Date(year, month, 1),
			},
		},
		select: {
			date: true,
			present: true,
			studentId: true,
		},
	})

	const presentCount = attendanceRecords.filter(a => a.present).length
	const absentCount = attendanceRecords.length - presentCount

	const chartData = [
		{
			attendance: 'present',
			visitors: presentCount,
			fill: 'var(--color-present)',
		},
		{
			attendance: 'absent',
			visitors: absentCount,
			fill: 'var(--color-absent)',
		},
	]

	return NextResponse.json({ chartData })
}
