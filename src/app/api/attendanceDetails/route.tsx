import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { month, year } = await req.json()

	const attendanceDetails = await prisma.attendance.findMany({
		where: {
			date: {
				gte: new Date(year, month - 1, 1),
				lt: new Date(year, month, 1),
			},
		},
		include: {
			student: {
				select: {
					name: true,
					surname: true,
					patronymic: true,
					class: {
						select: {
							name: true,
							grade: { select: { level: true } },
						},
					},
				},
			},
			lesson: {
				select: {
					name: true,
					subject: { select: { name: true } },
					disciplines: { select: { name: true } },
					day: true,
					startTime: true,
					endTime: true,
					teacher: true,
					coach: true,
				},
			},
		},
		orderBy: { date: 'asc' },
	})

	const formattedData = attendanceDetails.map(a => ({
		Имя: a.student.name,
		Фамилия: a.student.surname,
		Отчество: a.student.patronymic,
		Класс: `${a.student.class.grade.level}-${a.student.class.name}`,
		Дата: a.date.toLocaleDateString('ru-RU'),
		Занятие: a.lesson.name,
		Предмет:
			a.lesson.subject?.name || a.lesson.disciplines?.name || 'Нет данных',
		Начало: a.lesson.startTime.toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit',
		}),
		Окончание: a.lesson.endTime.toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit',
		}),
		Статус: a.present ? 'Присутствовал' : 'Отсутствовал',
		Преподаватель: a.lesson.teacher?.name
			? a.lesson.teacher?.surname +
			  ' ' +
			  a.lesson.teacher?.name +
			  ' ' +
			  a.lesson.teacher?.patronymic
			: a.lesson.coach?.surname +
			  ' ' +
			  a.lesson.coach?.name +
			  ' ' +
			  a.lesson.coach?.patronymic,
	}))

	return NextResponse.json({ data: formattedData })
}
