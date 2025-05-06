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
