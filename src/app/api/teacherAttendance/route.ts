import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { from, to, teacherId } = await req.json()

	if (!from || !to || !teacherId) {
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
				teacherId,
			},
		},
		include: {
			student: true,
			lesson: {
				include: {
					teacher: true,
					subject: true, // ← Добавляем предмет
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

	const firstTeacher = attendanceRecords[0]?.lesson.teacher
	const teacherName = firstTeacher
		? `${firstTeacher.surname} ${firstTeacher.name} ${firstTeacher.patronymic}`
		: 'Преподаватель'

	return NextResponse.json({
		chartData,
		teacherName,
		exportData: attendanceRecords.map(a => ({
			student: `${a.student.surname} ${a.student.name} ${a.student.patronymic}`,
			lesson: a.lesson.name,
			subject: a.lesson.subject?.name || '—',
			startTime: a.lesson.startTime,
			endTime: a.lesson.endTime,
			attendance: a.present ? 'Присутствовал' : 'Отсутствовал',
			teacher: `${a.lesson.teacher?.surname} ${a.lesson.teacher?.name} ${a.lesson.teacher?.patronymic}`,
		})),
	})
}
