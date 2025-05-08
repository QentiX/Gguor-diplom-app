'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import {
	AnnouncementSchema,
	AssignmentSchema,
	AttendanceSchema,
	ClassSchema,
	CoachSchema,
	DisciplineSchema,
	EventSchema,
	ExamSchema,
	LessonSchema,
	ResultSchema,
	StudentSchema,
	SubjectSchema,
	TeacherSchema,
} from './formValidationSchemas'
import prisma from './prisma'

type CurrentState = { success: boolean; error: boolean }

export const createSubject = async (
	currentState: CurrentState,
	data: SubjectSchema
) => {
	try {
		await prisma.subject.create({
			data: {
				name: data.name,
				teachers: {
					connect: data.teachers.map(teacherId => ({ id: teacherId })),
				},
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const updateSubject = async (
	currentState: CurrentState,
	data: SubjectSchema
) => {
	try {
		await prisma.subject.update({
			where: {
				id: data.id,
			},
			data: {
				name: data.name,
				teachers: {
					set: data.teachers.map(teacherId => ({ id: teacherId })),
				},
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const deleteSubject = async (
	currentState: CurrentState,
	data: FormData
) => {
	const id = data.get('id') as string
	try {
		await prisma.subject.delete({
			where: {
				id: parseInt(id),
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const createDiscipline = async (
	currentState: CurrentState,
	data: DisciplineSchema
) => {
	try {
		await prisma.disciplines.create({
			data: {
				name: data.name,
				coaches: {
					connect: data.coaches.map(coachId => ({ id: coachId })),
				},
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const updateDiscipline = async (
	currentState: CurrentState,
	data: DisciplineSchema
) => {
	try {
		await prisma.disciplines.update({
			where: {
				id: data.id,
			},
			data: {
				name: data.name,
				coaches: {
					set: data.coaches.map(coachId => ({ id: coachId })),
				},
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const deleteDiscipline = async (
	currentState: CurrentState,
	data: FormData
) => {
	const id = data.get('id') as string
	try {
		await prisma.disciplines.delete({
			where: {
				id: parseInt(id),
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const createClass = async (
	currentState: CurrentState,
	data: ClassSchema
) => {
	try {
		await prisma.class.create({
			data,
		})

		// revalidatePath("/list/class");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const updateClass = async (
	currentState: CurrentState,
	data: ClassSchema
) => {
	try {
		await prisma.class.update({
			where: {
				id: data.id,
			},
			data,
		})

		// revalidatePath("/list/class");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const deleteClass = async (
	currentState: CurrentState,
	data: FormData
) => {
	const id = data.get('id') as string
	try {
		await prisma.class.delete({
			where: {
				id: parseInt(id),
			},
		})

		// revalidatePath("/list/class");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const createTeacher = async (
	currentState: CurrentState,
	data: TeacherSchema
) => {
	try {
		const clerk = await clerkClient()
		const user = await clerk.users.createUser({
			username: data.username,
			password: data.password,
			firstName: data.name,
			lastName: data.surname,
			publicMetadata: { role: 'teacher' },
		})

		await prisma.teacher.create({
			data: {
				id: user.id,
				username: data.username,
				name: data.name,
				surname: data.surname,
				email: data.email || null,
				phone: data.phone || null,
				address: data.address,
				img: data.img || null,
				position: data.position,
				qualification: data.qualification || null,
				sex: data.sex,
				birthday: data.birthday,
				subjects: {
					connect: data.subjects?.map((subjectId: string) => ({
						id: parseInt(subjectId),
					})),
				},
			},
		})

		// revalidatePath("/list/teachers");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const updateTeacher = async (
	currentState: CurrentState,
	data: TeacherSchema
) => {
	if (!data.id) {
		return { success: false, error: true }
	}
	try {
		const clerk = await clerkClient()
		const user = await clerk.users.updateUser(data.id, {
			username: data.username,
			...(data.password !== '' && { password: data.password }),
			firstName: data.name,
			lastName: data.surname,
		})

		await prisma.teacher.update({
			where: {
				id: data.id,
			},
			data: {
				...(data.password !== '' && { password: data.password }),
				username: data.username,
				name: data.name,
				surname: data.surname,
				email: data.email || null,
				phone: data.phone || null,
				address: data.address,
				img: data.img || null,
				position: data.position,
				qualification: data.qualification || null,
				sex: data.sex,
				birthday: data.birthday,
				subjects: {
					set: data.subjects?.map((subjectId: string) => ({
						id: parseInt(subjectId),
					})),
				},
			},
		})
		// revalidatePath("/list/teachers");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const deleteTeacher = async (
	currentState: CurrentState,
	data: FormData
) => {
	const clerk = await clerkClient()
	const id = data.get('id') as string
	try {
		await clerk.users.deleteUser(id)

		await prisma.teacher.delete({
			where: {
				id: id,
			},
		})

		// revalidatePath("/list/teachers");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const createCoach = async (
	currentState: CurrentState,
	data: CoachSchema
) => {
	try {
		const clerk = await clerkClient()
		const user = await clerk.users.createUser({
			username: data.username,
			password: data.password,
			firstName: data.name,
			lastName: data.surname,
			publicMetadata: { role: 'coach' },
		})

		await prisma.coach.create({
			data: {
				id: user.id,
				username: data.username,
				name: data.name,
				surname: data.surname,
				email: data.email || null,
				phone: data.phone || null,
				address: data.address,
				img: data.img || null,
				position: data.position || null,
				qualification: data.qualification || null,
				sex: data.sex,
				birthday: data.birthday,
				disciplines: {
					connect: data.disciplines?.map((disciplineId: string) => ({
						id: parseInt(disciplineId),
					})),
				},
				achievements: data.achievements || null,
			},
		})

		// revalidatePath("/list/teachers");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const updateCoach = async (
	currentState: CurrentState,
	data: CoachSchema
) => {
	if (!data.id) {
		return { success: false, error: true }
	}
	try {
		const clerk = await clerkClient()
		const user = await clerk.users.updateUser(data.id, {
			username: data.username,
			...(data.password !== '' && { password: data.password }),
			firstName: data.name,
			lastName: data.surname,
		})

		await prisma.coach.update({
			where: {
				id: data.id,
			},
			data: {
				...(data.password !== '' && { password: data.password }),
				username: data.username,
				name: data.name,
				surname: data.surname,
				email: data.email || null,
				phone: data.phone || null,
				address: data.address,
				img: data.img || null,
				position: data.position || null,
				qualification: data.qualification || null,
				sex: data.sex,
				birthday: data.birthday,
				disciplines: {
					set: data.disciplines?.map((disciplineId: string) => ({
						id: parseInt(disciplineId),
					})),
				},
				achievements: data.achievements || null,
			},
		})
		// revalidatePath("/list/teachers");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const deleteCoach = async (
	currentState: CurrentState,
	data: FormData
) => {
	const clerk = await clerkClient()
	const id = data.get('id') as string
	try {
		await clerk.users.deleteUser(id)

		await prisma.coach.delete({
			where: {
				id: id,
			},
		})

		// revalidatePath("/list/teachers");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const createStudent = async (
	currentState: CurrentState,
	data: StudentSchema
) => {
	console.log(data)
	try {
		const clerk = await clerkClient()
		const classItem = await prisma.class.findUnique({
			where: { id: data.classId },
			include: { _count: { select: { students: true } } },
		})

		if (classItem && classItem.capacity === classItem._count.students) {
			return { success: false, error: true }
		}

		const user = await clerk.users.createUser({
			username: data.username,
			password: data.password,
			firstName: data.name,
			lastName: data.surname,
			publicMetadata: { role: 'student' },
		})

		await prisma.student.create({
			data: {
				id: user.id,
				username: data.username,
				name: data.name,
				surname: data.surname,
				email: data.email || null,
				phone: data.phone || null,
				address: data.address,
				img: data.img || null,
				position: data.position,
				sex: data.sex,
				birthday: data.birthday,
				gradeId: data.gradeId,
				classId: data.classId,
				status: data.status || null,
			},
		})

		// revalidatePath("/list/students");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const updateStudent = async (
	currentState: CurrentState,
	data: StudentSchema
) => {
	if (!data.id) {
		return { success: false, error: true }
	}
	try {
		const clerk = await clerkClient()
		const user = await clerk.users.updateUser(data.id, {
			username: data.username,
			...(data.password !== '' && { password: data.password }),
			firstName: data.name,
			lastName: data.surname,
		})

		await prisma.student.update({
			where: {
				id: data.id,
			},
			data: {
				...(data.password !== '' && { password: data.password }),
				username: data.username,
				name: data.name,
				surname: data.surname,
				email: data.email || null,
				phone: data.phone || null,
				address: data.address,
				img: data.img || null,
				position: data.position,
				sex: data.sex,
				birthday: data.birthday,
				gradeId: data.gradeId,
				classId: data.classId,
				status: data.status || null,
			},
		})
		// revalidatePath("/list/students");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const deleteStudent = async (
	currentState: CurrentState,
	data: FormData
) => {
	const id = data.get('id') as string
	try {
		const clerk = await clerkClient()
		await clerk.users.deleteUser(id)

		await prisma.student.delete({
			where: {
				id: id,
			},
		})

		// revalidatePath("/list/students");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const createExam = async (
	currentState: CurrentState,
	data: ExamSchema
) => {
	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	try {
		if (role === 'teacher') {
			const teacherLesson = await prisma.lesson.findFirst({
				where: {
					teacherId: userId!,
					id: data.lessonId,
				},
			})

			if (!teacherLesson) {
				return { success: false, error: true }
			}
		}

		if (role === 'coach') {
			const coachLesson = await prisma.lesson.findFirst({
				where: {
					coachId: userId!,
					id: data.lessonId,
				},
			})

			if (!coachLesson) {
				return { success: false, error: true }
			}
		}

		await prisma.exam.create({
			data: {
				title: data.title,
				startTime: data.startTime,
				endTime: data.endTime,
				lessonId: data.lessonId,
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const updateExam = async (
	currentState: CurrentState,
	data: ExamSchema
) => {
	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	try {
		if (role === 'teacher') {
			const teacherLesson = await prisma.lesson.findFirst({
				where: {
					teacherId: userId!,
					id: data.lessonId,
				},
			})

			if (!teacherLesson) {
				return { success: false, error: true }
			}
		}

		if (role === 'coach') {
			const coachLesson = await prisma.lesson.findFirst({
				where: {
					coachId: userId!,
					id: data.lessonId,
				},
			})

			if (!coachLesson) {
				return { success: false, error: true }
			}
		}

		await prisma.exam.update({
			where: {
				id: data.id,
			},
			data: {
				title: data.title,
				startTime: data.startTime,
				endTime: data.endTime,
				lessonId: data.lessonId,
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const deleteExam = async (
	currentState: CurrentState,
	data: FormData
) => {
	const id = data.get('id') as string

	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	try {
		await prisma.exam.delete({
			where: {
				id: parseInt(id),
				...(role === 'teacher' ? { lesson: { teacherId: userId! } } : {}),
				...(role === 'coach' ? { lesson: { coachId: userId! } } : {}),
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const createEvent = async (
	currentState: CurrentState,
	data: EventSchema
) => {
	try {
		await prisma.event.create({
			data: {
				title: data.title,
				description: data.description,
				startTime: data.startTime,
				endTime: data.endTime,
				classId: data.classId || null,
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const updateEvent = async (
	currentState: CurrentState,
	data: EventSchema
) => {
	try {
		await prisma.event.update({
			where: {
				id: data.id,
			},
			data: {
				title: data.title,
				description: data.description,
				startTime: data.startTime,
				endTime: data.endTime,
				classId: data.classId || null,
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const deleteEvent = async (
	currentState: CurrentState,
	data: FormData
) => {
	const id = data.get('id') as string
	try {
		await prisma.event.delete({
			where: {
				id: parseInt(id),
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const createAnnouncement = async (
	currentState: CurrentState,
	data: AnnouncementSchema
) => {
	try {
		await prisma.announcement.create({
			data: {
				title: data.title,
				description: data.description,
				date: data.date,
				classId: data.classId || null,
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const updateAnnouncement = async (
	currentState: CurrentState,
	data: AnnouncementSchema
) => {
	try {
		await prisma.announcement.update({
			where: {
				id: data.id,
			},
			data: {
				title: data.title,
				description: data.description,
				date: data.date,
				classId: data.classId || null,
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const deleteAnnouncement = async (
	currentState: CurrentState,
	data: FormData
) => {
	const id = data.get('id') as string
	try {
		await prisma.announcement.delete({
			where: {
				id: parseInt(id),
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const createResult = async (
	currentState: CurrentState,
	data: ResultSchema
) => {
	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	try {
		// if (role === 'teacher') {
		// 	const teacherExam = await prisma.exam.findFirst({
		// 		where: {
		// 			lesson: {
		// 				teacherId: userId!,
		// 				id: data.examId,
		// 			},
		// 		},
		// 	})

		// 	const teacherAssign = await prisma.assignment.findFirst({
		// 		where: {
		// 			lesson: {
		// 				teacherId: userId!,
		// 				id: data.assignmentId,
		// 			},
		// 		},
		// 	})

		// 	if (!teacherExam) {
		// 		return { success: false, error: true }
		// 	}

		// 	if (!teacherAssign) {
		// 		return { success: false, error: true }
		// 	}
		// }

		// if (role === 'coach') {
		// 	const coachExam = await prisma.exam.findFirst({
		// 		where: {
		// 			lesson: {
		// 				coachId: userId!,
		// 				id: data.examId,
		// 			},
		// 		},
		// 	})

		// 	const coachAssign = await prisma.assignment.findFirst({
		// 		where: {
		// 			lesson: {
		// 				coachId: userId!,
		// 				id: data.assignmentId,
		// 			},
		// 		},
		// 	})

		// 	if (!coachExam) {
		// 		return { success: false, error: true }
		// 	}

		// 	if (!coachAssign) {
		// 		return { success: false, error: true }
		// 	}
		// }

		await prisma.result.create({
			data: {
				score: data.score,
				examId: data.examId || null,
				assignmentId: data.assignmentId || null,
				studentId: data.studentId,
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const updateResult = async (
	currentState: CurrentState,
	data: ResultSchema
) => {
	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	try {
		// if (role === 'teacher') {
		// 	const teacherExam = await prisma.exam.findFirst({
		// 		where: {
		// 			lesson: {
		// 				teacherId: userId!,
		// 				id: data.examId,
		// 			},
		// 		},
		// 	})

		// 	const teacherAssign = await prisma.assignment.findFirst({
		// 		where: {
		// 			lesson: {
		// 				teacherId: userId!,
		// 				id: data.assignmentId,
		// 			},
		// 		},
		// 	})

		// 	if (!teacherExam) {
		// 		return { success: false, error: true }
		// 	}

		// 	if (!teacherAssign) {
		// 		return { success: false, error: true }
		// 	}
		// }

		// if (role === 'coach') {
		// 	const coachExam = await prisma.exam.findFirst({
		// 		where: {
		// 			lesson: {
		// 				coachId: userId!,
		// 				id: data.examId,
		// 			},
		// 		},
		// 	})

		// 	const coachAssign = await prisma.assignment.findFirst({
		// 		where: {
		// 			lesson: {
		// 				coachId: userId!,
		// 				id: data.assignmentId,
		// 			},
		// 		},
		// 	})

		// 	if (!coachExam) {
		// 		return { success: false, error: true }
		// 	}

		// 	if (!coachAssign) {
		// 		return { success: false, error: true }
		// 	}
		// }

		await prisma.result.update({
			where: {
				id: data.id,
			},
			data: {
				score: data.score,
				examId: data.examId || null,
				assignmentId: data.assignmentId || null,
				studentId: data.studentId,
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const deleteResult = async (
	currentState: CurrentState,
	data: FormData
) => {
	const id = data.get('id') as string

	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	try {
		await prisma.result.delete({
			where: {
				id: parseInt(id),
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const createAssignment = async (
	currentState: CurrentState,
	data: AssignmentSchema
) => {
	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	try {
		if (role === 'teacher') {
			const teacherLesson = await prisma.lesson.findFirst({
				where: {
					teacherId: userId!,
					id: data.lessonId,
				},
			})

			if (!teacherLesson) {
				return { success: false, error: true }
			}
		}

		if (role === 'coach') {
			const coachLesson = await prisma.lesson.findFirst({
				where: {
					coachId: userId!,
					id: data.lessonId,
				},
			})

			if (!coachLesson) {
				return { success: false, error: true }
			}
		}

		await prisma.assignment.create({
			data: {
				title: data.title,
				startDate: data.startDate,
				dueDate: data.dueDate,
				lessonId: data.lessonId,
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const updateAssignment = async (
	currentState: CurrentState,
	data: AssignmentSchema
) => {
	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	try {
		if (role === 'teacher') {
			const teacherLesson = await prisma.lesson.findFirst({
				where: {
					teacherId: userId!,
					id: data.lessonId,
				},
			})

			if (!teacherLesson) {
				return { success: false, error: true }
			}
		}

		if (role === 'coach') {
			const coachLesson = await prisma.lesson.findFirst({
				where: {
					coachId: userId!,
					id: data.lessonId,
				},
			})

			if (!coachLesson) {
				return { success: false, error: true }
			}
		}

		await prisma.assignment.update({
			where: {
				id: data.id,
			},
			data: {
				title: data.title,
				startDate: data.startDate,
				dueDate: data.dueDate,
				lessonId: data.lessonId,
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const deleteAssignment = async (
	currentState: CurrentState,
	data: FormData
) => {
	const id = data.get('id') as string

	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	try {
		await prisma.assignment.delete({
			where: {
				id: parseInt(id),
				...(role === 'teacher' ? { lesson: { teacherId: userId! } } : {}),
				...(role === 'coach' ? { lesson: { coachId: userId! } } : {}),
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const createLesson = async (
	currentState: CurrentState,
	data: LessonSchema
) => {
	try {
		await prisma.lesson.create({
			data: {
				name: data.name,
				day: data.day,
				startTime: data.startTime,
				endTime: data.endTime,
				subjectId: data.subjectId || null,
				disciplineId: data.disciplineId || null,
				teacherId: data.teacherId || null,
				coachId: data.coachId || null,
				classId: data.classId,
			},
		})

		// revalidatePath("/list/teachers");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const updateLesson = async (
	currentState: CurrentState,
	data: LessonSchema
) => {
	try {
		await prisma.lesson.update({
			where: {
				id: data.id,
			},
			data: {
				name: data.name,
				day: data.day,
				startTime: data.startTime,
				endTime: data.endTime,
				subjectId: data.subjectId || null,
				disciplineId: data.disciplineId || null,
				teacherId: data.teacherId || null,
				coachId: data.coachId || null,
				classId: data.classId,
			},
		})
		// revalidatePath("/list/teachers");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const deleteLesson = async (
	currentState: CurrentState,
	data: FormData
) => {
	const id = data.get('id') as string
	try {
		await prisma.lesson.delete({
			where: {
				id: parseInt(id),
			},
		})

		// revalidatePath("/list/teachers");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const createAttendance = async (
	currentState: CurrentState,
	data: AttendanceSchema
) => {
	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	try {
		// if (role === 'teacher') {
		// 	const teacherLesson = await prisma.lesson.findFirst({
		// 		where: {
		// 			teacherId: userId!,
		// 			id: data.lessonId,
		// 		},
		// 	})

		// 	if (!teacherLesson) {
		// 		return { success: false, error: true }
		// 	}
		// }

		// if (role === 'coach') {
		// 	const coachLesson = await prisma.lesson.findFirst({
		// 		where: {
		// 			coachId: userId!,
		// 			id: data.lessonId,
		// 		},
		// 	})

		// 	if (!coachLesson) {
		// 		return { success: false, error: true }
		// 	}
		// }

		await prisma.attendance.create({
			data: {
				present: data.present,
				day: data.day,
				date: data.date,
				studentId: data.studentId,
				lessonId: data.lessonId,
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const updateAttendance = async (
	currentState: CurrentState,
	data: AttendanceSchema
) => {
	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	try {
		// if (role === 'teacher') {
		// 	const teacherLesson = await prisma.lesson.findFirst({
		// 		where: {
		// 			teacherId: userId!,
		// 			id: data.lessonId,
		// 		},
		// 	})

		// 	if (!teacherLesson) {
		// 		return { success: false, error: true }
		// 	}
		// }

		// if (role === 'coach') {
		// 	const coachLesson = await prisma.lesson.findFirst({
		// 		where: {
		// 			coachId: userId!,
		// 			id: data.lessonId,
		// 		},
		// 	})

		// 	if (!coachLesson) {
		// 		return { success: false, error: true }
		// 	}
		// }

		await prisma.attendance.update({
			where: {
				id: data.id,
			},
			data: {
				present: data.present,
				day: data.day,
				date: data.date,
				studentId: data.studentId,
				lessonId: data.lessonId,
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}

export const deleteAttendance = async (
	currentState: CurrentState,
	data: FormData
) => {
	const id = data.get('id') as string

	const { userId, sessionClaims } = await auth()
	const role = (sessionClaims?.metadata as { role?: string })?.role

	try {
		await prisma.attendance.delete({
			where: {
				id: parseInt(id),
			},
		})

		// revalidatePath("/list/subjects");
		return { success: true, error: false }
	} catch (err) {
		console.log(err)
		return { success: false, error: true }
	}
}
