import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { from, to, coachId } = await req.json()

	if (!from || !to || !coachId) {
		return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 })
	}

	const fromDate = new Date(from)
	const toDate = new Date(to)

	const attendanceRecords = await prisma.attendance.findMany({
		where: {
			date: {
				gte: fromDate,
				lte: toDate,
			},
			lesson: {
				coachId,
			},
		},
		include: {
			student: true,
			lesson: {
				include: {
					coach: true,
					disciplines: true,
				},
			},
		},
	})

	const presentCount = attendanceRecords.filter(a => a.present).length
	const totalCount = attendanceRecords.length
	const absentCount = totalCount - presentCount

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

	const firstCoach = attendanceRecords[0]?.lesson.coach
	const coachName = firstCoach
		? `${firstCoach.surname} ${firstCoach.name} ${firstCoach.patronymic}`
		: 'Преподаватель'

	return NextResponse.json({
		chartData,
		coachName,
		exportData: attendanceRecords.map(a => ({
			student: `${a.student.surname} ${a.student.name} ${a.student.patronymic}`,
			lesson: a.lesson.name,
			discipline: a.lesson.disciplines?.name || '—',
			startTime: a.lesson.startTime,
			endTime: a.lesson.endTime,
			attendance: a.present ? 'Присутствовал' : 'Отсутствовал',
			coach: `${a.lesson.coach?.surname} ${a.lesson.coach?.name} ${a.lesson.coach?.patronymic}`,
		})),
	})
}
