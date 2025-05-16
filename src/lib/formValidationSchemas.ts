import { z } from 'zod'

export const subjectSchema = z.object({
	id: z.coerce.number().optional(),
	name: z.string().min(1, { message: 'Требуется указать название предмета!' }),
	teachers: z.array(z.string()),
})

export type SubjectSchema = z.infer<typeof subjectSchema>

export const disciplineSchema = z.object({
	id: z.coerce.number().optional(),
	name: z
		.string()
		.min(1, { message: 'Требуется указать название дисциплины!' }),
	coaches: z.array(z.string()),
})

export type DisciplineSchema = z.infer<typeof disciplineSchema>

export const classSchema = z.object({
	id: z.coerce.number().optional(),
	name: z
		.string()
		.min(1, { message: 'Требуется указать название класса/курса!' }),
	capacity: z.coerce
		.number()
		.min(1, { message: 'Требуется указать вместимость!' }),
	gradeId: z.coerce
		.number()
		.min(1, { message: 'Требуется указать название класса/курса!' }),
	supervisorId: z.coerce.string().optional(),
})

export type ClassSchema = z.infer<typeof classSchema>

export const teacherSchema = z.object({
	id: z.string().optional(),
	username: z
		.string()
		.min(3, {
			message:
				'Длина логина пользователя должна составлять не менее 3 символов!',
		})
		.max(20, {
			message:
				'Длина логина пользователя должна составлять не более 20 символов!',
		}),
	password: z
		.string()
		.min(8, { message: 'Длина пароля должна составлять не менее 8 символов!' })
		.optional()
		.or(z.literal('')),
	name: z.string().min(1, { message: 'Требуется указать имя!' }),
	surname: z.string().min(1, { message: 'Требуется указать фамилию!' }),
	email: z
		.string()
		.email({ message: 'Неверный адрес электронной почты!' })
		.optional()
		.or(z.literal('')),
	phone: z.string().optional(),
	address: z.string(),
	img: z.string().optional(),
	position: z.string().min(1, { message: 'Требуется указать должность!' }),
	qualification: z
		.string()
		.min(1, { message: 'Требуется указать квалификацию!' })
		.optional()
		.or(z.literal('')),
	sex: z.enum(['MALE', 'FEMALE'], { message: 'Необходимо указать пол!' }),
	birthday: z.coerce.date({ message: 'Дата рождения обязательна!' }),
	subjects: z.array(z.string()).optional(),
})

export type TeacherSchema = z.infer<typeof teacherSchema>

export const coachSchema = z.object({
	id: z.string().optional(),
	username: z
		.string()
		.min(3, {
			message:
				'Длина логина пользователя должна составлять не менее 3 символов!',
		})
		.max(20, {
			message:
				'Длина логина пользователя должна составлять не более 20 символов!',
		}),
	password: z
		.string()
		.min(8, { message: 'Длина пароля должна составлять не менее 8 символов!' })
		.optional()
		.or(z.literal('')),
	name: z.string().min(1, { message: 'Требуется указать имя!' }),
	surname: z.string().min(1, { message: 'Требуется указать фамилию!' }),
	email: z
		.string()
		.email({ message: 'Неверный адрес электронной почты!' })
		.optional()
		.or(z.literal('')),
	phone: z.string().optional(),
	address: z.string(),
	img: z.string().optional(),
	position: z
		.string()
		.min(1, { message: 'Требуется указать должность!' })
		.optional()
		.or(z.literal('')),
	qualification: z
		.string()
		.min(1, { message: 'Требуется указать квалификацию!' })
		.optional()
		.or(z.literal('')),
	sex: z.enum(['MALE', 'FEMALE'], { message: 'Необходимо указать пол!' }),
	birthday: z.coerce.date({ message: 'Дата рождения обязательна!' }),
	disciplines: z.array(z.string()).optional(),
	achievements: z.string().optional(),
})

export type CoachSchema = z.infer<typeof coachSchema>

export const studentSchema = z.object({
	id: z.string().optional(),
	username: z
		.string()
		.min(3, {
			message:
				'Длина логина пользователя должна составлять не менее 3 символов!',
		})
		.max(20, {
			message:
				'Длина логина пользователя должна составлять не более 20 символов!',
		}),
	password: z
		.string()
		.min(8, { message: 'Длина пароля должна составлять не менее 8 символов!' })
		.optional()
		.or(z.literal('')),
	name: z.string().min(1, { message: 'Требуется указать имя!' }),
	surname: z.string().min(1, { message: 'Требуется указать фамилию!' }),
	email: z
		.string()
		.email({ message: 'Неверный адрес электронной почты!' })
		.optional()
		.or(z.literal('')),
	phone: z.string().optional(),
	address: z.string(),
	img: z.string().optional(),
	position: z.string().min(1, { message: 'Требуется указать должность!' }),
	birthday: z.coerce.date({ message: 'Дата рождения обязательна!' }),
	sex: z.enum(['MALE', 'FEMALE'], { message: 'Необходимо указать пол!' }),
	gradeId: z.coerce.number().min(1, { message: 'Необходимо указать класс!' }),
	classId: z.coerce.number().min(1, { message: 'Необходимо указать группу!' }),
	status: z.string().optional(),
})

export type StudentSchema = z.infer<typeof studentSchema>

export const examSchema = z.object({
	id: z.coerce.number().optional(),
	title: z.string().min(1, { message: 'Название обязательно!' }),
	startTime: z.coerce.date({ message: 'Требуется время начала!' }),
	endTime: z.coerce.date({ message: 'Требуется время окончания!' }),
	lessonId: z.coerce.number({ message: 'Требуется указать занятие!' }),
})

export type ExamSchema = z.infer<typeof examSchema>

export const eventSchema = z.object({
	id: z.coerce.number().optional(),
	title: z.string().min(1, { message: 'Название обязательно!' }),
	description: z.string().min(1, { message: 'Описание обязательно!' }),
	startTime: z.coerce.date({ message: 'Требуется время начала!' }),
	endTime: z.coerce.date({ message: 'Требуется время окончания!' }),
	classId: z.coerce.number().optional(),
})

export type EventSchema = z.infer<typeof eventSchema>

export const announcementSchema = z.object({
	id: z.coerce.number().optional(),
	title: z.string().min(1, { message: 'Название обязательно!' }),
	description: z.string().min(1, { message: 'Описание обязательно!' }),
	date: z.coerce.date({ message: 'Требуется указать дату' }),
	classId: z.coerce.number().optional(),
})

export type AnnouncementSchema = z.infer<typeof announcementSchema>

export const resultSchema = z.object({
	id: z.coerce.number().optional(),
	score: z.coerce.number({ message: 'Требуется указать результат!' }),
	examId: z.coerce.number().optional(),
	assignmentId: z.coerce.number().optional(),
	studentId: z.string({ message: 'Требуется указать студента!' }),
})

export type ResultSchema = z.infer<typeof resultSchema>

export const assignmentSchema = z.object({
	id: z.coerce.number().optional(),
	title: z.string().min(1, { message: 'Название обязательно!' }),
	startDate: z.coerce.date({ message: 'Требуется время начала!' }),
	dueDate: z.coerce.date({ message: 'Требуется время окончания!' }),
	lessonId: z.coerce.number({ message: 'Требуется указать занятие!' }),
})

export type AssignmentSchema = z.infer<typeof assignmentSchema>

export const lessonSchema = z.object({
	id: z.coerce.number().optional(),
	name: z.string().min(1, { message: 'Требуется указать название!' }),
	day: z.enum(
		['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
		{ message: 'Необходимо указать день недели!' }
	),
	startTime: z.coerce.date({ message: 'Требуется время начала!' }),
	endTime: z.coerce.date({ message: 'Требуется время окончания!' }),
	subjectId: z.coerce.number().optional(),
	disciplineId: z.coerce.number().optional(),
	teacherId: z.string().optional(),
	coachId: z.string().optional(),
	classId: z.coerce.number({ message: 'Необходимо указать группу!' }),
})

export type LessonSchema = z.infer<typeof lessonSchema>

export const attendanceSchema = z.object({
	id: z.coerce.number().optional(),
	// present: z.enum(['true', 'false'], { message: 'Необходимо указать статус!' }),
	present: z.boolean({ message: 'Необходимо указать статус!' }),
	day: z.coerce.number({ message: 'Требуется указать число!' }),
	date: z.coerce.date({ message: 'Требуется указать дату!' }),
	studentId: z.string({ message: 'Требуется указать студента!' }),
	lessonId: z.coerce.number({ message: 'Необходимо указать занятие!' }),
})

export type AttendanceSchema = z.infer<typeof attendanceSchema>

export const videoSchema = z.object({
	id: z.coerce.number().optional(),
	thumbnail: z.string().min(1, { message: 'Требуется прикрепить обложку!' }),
	title: z.string().min(1, { message: 'Требуется указать название!' }),
	videoUrl: z
		.string()
		.min(1, { message: 'Требуется указать ссылку на видео!' }),
})

export type VideoSchema = z.infer<typeof videoSchema>
