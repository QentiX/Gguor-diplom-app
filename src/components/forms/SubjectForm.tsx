'use client'

import { subjectsSchema, SubjectsSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import InputField from '../InputField'

const SubjectForm = ({
	type,
	data,
}: {
	type: 'create' | 'update'
	data?: any
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SubjectsSchema>({
		resolver: zodResolver(subjectsSchema),
	})

	const onSubmit = handleSubmit(data => {
		console.log(data)
	})

	return (
		<form className='flex flex-col gap-8' onSubmit={onSubmit}>
			<h1 className='text-xl font-semibold'>
				{type === 'create' ? 'Добавить новый предмет' : 'Обновить предмет'}
			</h1>
			<div className='flex justify-between flex-wrap gap-4'>
				<InputField
					label='Название предмета'
					name='name'
					defaultValue={data?.name}
					register={register}
					error={errors?.name}
				/>
			</div>
			<button className='bg-[#B3E2FD] p-2 rounded-md'>
				{type === 'create' ? 'Создать' : 'Обновить'}
			</button>
		</form>
	)
}

export default SubjectForm
