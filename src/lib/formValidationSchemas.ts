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
