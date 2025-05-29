import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { from, to, teacherId, studentId } = await req.json()

	if (!from || !to || !teacherId) {
		return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 })
	}

	const fromDate = new Date(from)
	const toDate = new Date(to)

	const teacher = await prisma.teacher.findUnique({
		where: { id: teacherId },
		select: {
			id: true,
			name: true,
			surname: true,
			patronymic: true,
		},
	})

	if (!teacher) {
		return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
	}

	const classesSupervised = await prisma.class.findMany({
		where: { supervisorId: teacherId },
		select: { id: true },
	})
	const supervisedClassIds = classesSupervised.map(c => c.id)

	if (supervisedClassIds.length === 0) {
		// Сообщаем фронту, что учитель не куратор ни одного класса
		return NextResponse.json({ noClass: true })
	}

	const whereAttendance: any = {
		date: {
			gte: fromDate,
			lte: toDate,
		},
		lesson: {
			classId: {
				in: supervisedClassIds,
			},
		},
	}

	if (studentId) {
		whereAttendance.studentId = studentId
	}

	const attendanceRecords = await prisma.attendance.findMany({
		where: whereAttendance,
		include: {
			student: {
				select: {
					name: true,
					surname: true,
					patronymic: true,
				},
			},
			lesson: {
				select: {
					name: true,
					startTime: true,
					endTime: true,
					coach: {
						select: {
							name: true,
							surname: true,
							patronymic: true,
						},
					},
					subject: {
						select: {
							name: true,
						},
					},
					disciplines: {
						select: {
							name: true,
						},
					},
				},
			},
		},
		orderBy: {
			date: 'asc',
		},
	})

	const presentCount = attendanceRecords.filter(r => r.present).length
	const absentCount = attendanceRecords.length - presentCount

	const chartData = [
		{
			attendance: 'Присутствовал',
			visitors: presentCount,
			fill: 'var(--color-present)',
		},
		{
			attendance: 'Отсутствовал',
			visitors: absentCount,
			fill: 'var(--color-absent)',
		},
	].filter(d => d.visitors > 0)

	const exportData = attendanceRecords.map(record => {
		const coach = record.lesson.coach
		const преподаватель = coach
			? `${coach.surname} ${coach.name} ${coach.patronymic}`
			: `${teacher.surname} ${teacher.name} ${teacher.patronymic}`

		return {
			Студент: `${record.student.surname} ${record.student.name} ${record.student.patronymic}`,
			Занятие: record.lesson.name,
			Предмет: record.lesson.subject?.name
				? record.lesson.subject.name
				: record.lesson.disciplines?.name ?? '',
			Начало: new Date(record.lesson.startTime).toLocaleString(),
			Окончание: new Date(record.lesson.endTime).toLocaleString(),
			Статус: record.present ? 'Присутствовал' : 'Отсутствовал',
			Преподаватель: преподаватель,
		}
	})

	const students = await prisma.student.findMany({
		where: {
			classId: {
				in: supervisedClassIds,
			},
		},
		select: {
			id: true,
			name: true,
			surname: true,
			patronymic: true,
		},
	})

	const studentsFormatted = students.map(s => ({
		id: s.id,
		fullName: `${s.surname} ${s.name} ${s.patronymic}`,
	}))

	return NextResponse.json({
		chartData,
		exportData,
		teacherName: `${teacher.surname} ${teacher.name} ${teacher.patronymic}`,
		students: studentsFormatted,
	})
}
