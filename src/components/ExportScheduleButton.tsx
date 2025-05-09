'use client'

import { Button } from '@/components/ui/button'
import {
	Class,
	Coach,
	Disciplines,
	Exam,
	Lesson,
	Subject,
	Teacher,
} from '@prisma/client'
import { getWeek } from 'date-fns'
import { ArrowDownToLine } from 'lucide-react'
import * as XLSX from 'xlsx'

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

type ScheduleData = {
	type: 'student' | 'teacher' | 'coach'
	lessons: LessonWithRelations[]
	exams: ExamWithRelations[]
}

export const ExportScheduleButton = ({ data }: { data: ScheduleData }) => {
	const formatLessonData = () => {
		return data.lessons.map(lesson => ({
			Время: `${lesson.startTime.toLocaleTimeString('ru-RU', {
				hour: '2-digit',
				minute: '2-digit',
			})}-${lesson.endTime.toLocaleTimeString('ru-RU', {
				hour: '2-digit',
				minute: '2-digit',
			})}`,
			Дисциплина:
				lesson.subject?.name || lesson.disciplines?.name || lesson.name,
			'Тип занятия': lesson.name.match(/\((ЛК|ЛР|ПЗ)\)/)?.[1] || 'Занятие',
			Аудитория: lesson.class?.name || 'Не указана',
			Преподаватель: lesson.teacher
				? `${lesson.teacher.surname} ${lesson.teacher.name}`
				: lesson.coach
				? `${lesson.coach.surname} ${lesson.coach.name}`
				: 'Не назначен',
			'День недели': lesson.day.toLowerCase(),
		}))
	}

	const formatExamData = () => {
		return data.exams.map(exam => ({
			Дата: exam.startTime.toLocaleDateString('ru-RU'),
			Время: `${exam.startTime.toLocaleTimeString('ru-RU', {
				hour: '2-digit',
				minute: '2-digit',
			})}-${exam.endTime.toLocaleTimeString('ru-RU', {
				hour: '2-digit',
				minute: '2-digit',
			})}`,
			Дисциплина: exam.title.replace(/\((Экзамен|Консультация)\)/, ''),
			Тип: exam.title.includes('Консультация') ? 'Консультация' : 'Экзамен',
			Аудитория: exam.lesson?.class?.name || 'Не указана',
		}))
	}

	const handleExport = () => {
		const workbook = XLSX.utils.book_new()
		const weekNumber = getWeek(new Date(), { weekStartsOn: 1 })

		// Лист с занятиями
		const lessonsSheet = XLSX.utils.json_to_sheet(formatLessonData())
		XLSX.utils.book_append_sheet(workbook, lessonsSheet, 'Занятия')

		// Лист с экзаменами
		const examsSheet = XLSX.utils.json_to_sheet(formatExamData())
		XLSX.utils.book_append_sheet(workbook, examsSheet, 'Экзамены')

		// Сохранение файла
		const fileName = `Расписание_${data.type}_Неделя_${weekNumber}.xlsx`
		XLSX.writeFile(workbook, fileName)
	}

	return (
		<Button onClick={handleExport} variant='outline' className='mb-4'>
			<ArrowDownToLine size={20} />
		</Button>
	)
}
