import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import FormModal from './FormModal'

export type FormContainerProps = {
	table:
		| 'teacher'
		| 'student'
		| 'coach'
		| 'subject'
		| 'discipline'
		| 'class'
		| 'lesson'
		| 'exam'
		| 'assignment'
		| 'result'
		| 'attendance'
		| 'event'
		| 'announcement'
	type: 'create' | 'update' | 'delete'
	data?: any
	id?: number | string
}

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
	let relatedData = {}

	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role
	const currentUserId = userId

	if (type !== 'delete') {
		switch (table) {
			case 'subject':
				const subjectTeachers = await prisma.teacher.findMany({
					select: { id: true, name: true, surname: true },
				})
				relatedData = { teachers: subjectTeachers }
				break
			case 'discipline':
				const disciplineCoaches = await prisma.coach.findMany({
					select: { id: true, name: true, surname: true },
				})
				relatedData = { coaches: disciplineCoaches }
				break
			case 'class':
				const classGrades = await prisma.grade.findMany({
					select: { id: true, level: true },
				})
				const classTeachers = await prisma.teacher.findMany({
					select: { id: true, name: true, surname: true },
				})
				relatedData = { teachers: classTeachers, grades: classGrades }
				break
			case 'teacher':
				const teacherSubjects = await prisma.subject.findMany({
					select: { id: true, name: true },
				})
				relatedData = { subjects: teacherSubjects }
				break
			case 'coach':
				const coachDisciplines = await prisma.disciplines.findMany({
					select: { id: true, name: true },
				})
				relatedData = { disciplines: coachDisciplines }
				break
			case 'student':
				const studentGrades = await prisma.grade.findMany({
					select: { id: true, level: true },
				})
				const studentClasses = await prisma.class.findMany({
					include: { _count: { select: { students: true } } },
				})
				relatedData = { classes: studentClasses, grades: studentGrades }
				break
			case 'exam':
				const examLessons = await prisma.lesson.findMany({
					where: {
						...(role === 'teacher' ? { teacherId: currentUserId! } : {}),
						...(role === 'coach' ? { coachId: currentUserId! } : {}),
					},
					select: { id: true, name: true },
				})
				relatedData = { lessons: examLessons }
				break
			case 'assignment':
				const assignmentLessons = await prisma.lesson.findMany({
					where: {
						...(role === 'teacher' ? { teacherId: currentUserId! } : {}),
						...(role === 'coach' ? { coachId: currentUserId! } : {}),
					},
					select: { id: true, name: true },
				})
				relatedData = { lessons: assignmentLessons }
				break
			case 'result':
				const resultExams = await prisma.exam.findMany({
					where: {
						lesson: {
							...(role === 'teacher' ? { teacherId: currentUserId! } : {}),
							...(role === 'coach' ? { coachId: currentUserId! } : {}),
						},
					},
					select: { id: true, title: true },
				})
				const resultAssignments = await prisma.assignment.findMany({
					where: {
						lesson: {
							...(role === 'teacher' ? { teacherId: currentUserId! } : {}),
							...(role === 'coach' ? { coachId: currentUserId! } : {}),
						},
					},
					select: { id: true, title: true },
				})
				const resultStudents = await prisma.student.findMany({
					select: { id: true, name: true, surname: true },
				})
				relatedData = {
					exams: resultExams,
					assignments: resultAssignments,
					students: resultStudents,
				}
				break
			case 'event':
				const eventClasses = await prisma.class.findMany({
					select: { id: true, name: true },
				})
				relatedData = { classes: eventClasses }
				break
			case 'announcement':
				const announcementClasses = await prisma.class.findMany({
					select: { id: true, name: true },
				})
				relatedData = { classes: announcementClasses }
				break
			case 'lesson':
				const lessonSubject = await prisma.subject.findMany({
					select: { id: true, name: true },
				})
				const lessonDiscipline = await prisma.disciplines.findMany({
					select: { id: true, name: true },
				})
				const lessonTeacher = await prisma.teacher.findMany({
					select: {
						id: true,
						name: true,
						surname: true,
						position: true,
						// subjects: { select: { name: true} },
					},
				})
				const lessonCoach = await prisma.coach.findMany({
					select: { id: true, name: true, surname: true, position: true },
				})
				const lessonClasses = await prisma.class.findMany({
					select: { id: true, name: true },
				})
				relatedData = {
					subjects: lessonSubject,
					disciplines: lessonDiscipline,
					teachers: lessonTeacher,
					coaches: lessonCoach,
					classes: lessonClasses,
				}
				break
			case 'attendance':
				const attendanceLessons = await prisma.lesson.findMany({
					where: {
						...(role === 'teacher' ? { teacherId: currentUserId! } : {}),
						...(role === 'coach' ? { coachId: currentUserId! } : {}),
					},
					select: { id: true, name: true },
				})
				const attendanceStudents = await prisma.student.findMany({
					select: { id: true, name: true, surname: true },
				})
				relatedData = {
					lessons: attendanceLessons,
					students: attendanceStudents,
				}
				break
			default:
				break
		}
	}

	return (
		<div className=''>
			<FormModal
				table={table}
				type={type}
				data={data}
				id={id}
				relatedData={relatedData}
			/>
		</div>
	)
}

export default FormContainer
