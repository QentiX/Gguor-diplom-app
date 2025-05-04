import { z } from 'zod'

export const subjectSchema = z.object({
	id: z.coerce.number().optional(),
	name: z.string().min(1, { message: 'Требуется указать название предмета!' }),
	teachers: z.array(z.string()),
})

export type SubjectSchema = z.infer<typeof subjectSchema>
