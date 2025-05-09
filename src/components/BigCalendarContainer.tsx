import prisma from '@/lib/prisma'
import {
	Class,
	Coach,
	Disciplines,
	Exam,
	Lesson,
	Subject,
	Teacher,
} from '@prisma/client'
import { endOfWeek, startOfWeek } from 'date-fns'
import BigCalendar from './BigCalender'
import { ExportScheduleButton } from './ExportScheduleButton'

type LessonWithRelations = Lesson & {
	subject?: Subject | null
	disciplines?: Disciplines | null
	class?: Class
	teacher?: Teacher | null
	coach?: Coach | null
}

type ExamWithRelations = Exam & {
	lesson?: (Lesson & { class?: Class }) | null
}

const BigCalendarContainer = async ({
	type,
	id,
}: {
	type: 'teacherId' | 'classId' | 'coachId'
	id: string | number
}) => {
	const now = new Date()
	const weekStart = startOfWeek(now, { weekStartsOn: 1 })
	const weekEnd = endOfWeek(now, { weekStartsOn: 1 })

	const lessons = (await prisma.lesson.findMany({
		where: {
			AND: [
				{
					...(type === 'teacherId'
						? { teacherId: id as string }
						: type === 'coachId'
						? { coachId: id as string }
						: { classId: id as number }),
				},
				{
					startTime: { gte: weekStart },
					endTime: { lte: weekEnd },
				},
			],
		},
		include: {
			subject: true,
			disciplines: true,
			class: true,
			teacher: true,
			coach: true,
		},
	})) as LessonWithRelations[]

	const exams = (await prisma.exam.findMany({
		where: {
			AND: [
				{ lessonId: { in: lessons.map(l => l.id) } },
				{ startTime: { gte: weekStart } },
				{ endTime: { lte: weekEnd } },
			],
		},
		include: {
			lesson: {
				include: {
					class: true,
				},
			},
		},
	})) as ExamWithRelations[]

	const userType =
		type === 'teacherId' ? 'teacher' : type === 'coachId' ? 'coach' : 'student'

	return (
		<div className='space-y-4'>
			<ExportScheduleButton data={{ type: userType, lessons, exams }} />
			<BigCalendar
				data={lessons.map(lesson => ({
					title: lesson.name,
					start: lesson.startTime,
					end: lesson.endTime,
				}))}
			/>
		</div>
	)
}

export default BigCalendarContainer
