'use client'

import { createSubject, updateSubject } from '@/lib/actions'
import { subjectSchema, SubjectSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import InputField from '../InputField'

const SubjectForm = ({
	type,
	data,
	setOpen,
	relatedData,
}: {
	type: 'create' | 'update'
	data?: any
	setOpen: Dispatch<SetStateAction<boolean>>
	relatedData?: any
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SubjectSchema>({
		resolver: zodResolver(subjectSchema),
	})

	// AFTER REACT 19 IT'LL BE USEACTIONSTATE

	const [state, formAction] = useFormState(
		type === 'create' ? createSubject : updateSubject,
		{
			success: false,
			error: false,
		}
	)

	const onSubmit = handleSubmit(data => {
		console.log(data)
		formAction(data)
	})

	const router = useRouter()

	useEffect(() => {
		if (state.success) {
			toast(`Предмет был ${type === 'create' ? 'создан' : 'обновлен'}!`)
			setOpen(false)
			router.refresh()
		}
	}, [state, router, type, setOpen])

	const { teachers } = relatedData

	return (
		<form className='flex flex-col gap-8' onSubmit={onSubmit}>
			<h1 className='text-xl font-semibold'>
				{type === 'create' ? 'Добавить новый предмет' : 'Обновить предмет'}
			</h1>
			<div className='flex flex-wrap gap-4'>
				<InputField
					label='Название предмета'
					name='name'
					defaultValue={data?.name}
					register={register}
					error={errors?.name}
				/>
				{data && (
					<InputField
						label='Id'
						name='id'
						defaultValue={data?.id}
						register={register}
						error={errors?.id}
						hidden
					/>
				)}
				<div className='flex flex-col gap-2 w-full'>
					<label className='text-xs text-gray-500'>Учителя</label>
					<select
						multiple
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('teachers')}
						defaultValue={data?.teachers}
					>
						{teachers.map(
							(teacher: { id: string; name: string; surname: string }) => (
								<option value={teacher.id} key={teacher.id}>
									{teacher.name + ' ' + teacher.surname}
								</option>
							)
						)}
					</select>
					{errors.teachers?.message && (
						<p className='text-xs text-red-400'>
							{errors.teachers.message.toString()}
						</p>
					)}
				</div>
			</div>
			{state.error && (
				<span className='text-red-500'>Что-то пошло не так!</span>
			)}
			<button className='bg-[#3780D2] text-white p-2 rounded-md'>
				{type === 'create' ? 'Создать' : 'Обновить'}
			</button>
		</form>
	)
}

export default SubjectForm
