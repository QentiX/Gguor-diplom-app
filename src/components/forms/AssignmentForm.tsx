'use client'

import { createAssignment, updateAssignment } from '@/lib/actions'
import { assignmentSchema, AssignmentSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import InputField from '../InputField'

const AssignmentForm = ({
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
	} = useForm<AssignmentSchema>({
		resolver: zodResolver(assignmentSchema),
	})

	// AFTER REACT 19 IT'LL BE USEACTIONSTATE

	const [state, formAction] = useFormState(
		type === 'create' ? createAssignment : updateAssignment,
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
			toast(`Задание было ${type === 'create' ? 'создано' : 'обновлено'}!`)
			setOpen(false)
			router.refresh()
		}
	}, [state, router, type, setOpen])

	const { lessons } = relatedData

	return (
		<form className='flex flex-col gap-8' onSubmit={onSubmit}>
			<h1 className='text-xl font-semibold'>
				{type === 'create' ? 'Создать задание' : 'Обновить задание'}
			</h1>

			<div className='flex justify-between flex-wrap gap-4'>
				<InputField
					label='Название'
					name='title'
					defaultValue={data?.title}
					register={register}
					error={errors?.title}
				/>
				<InputField
					label='Время начала'
					name='startDate'
					defaultValue={data?.startDate}
					register={register}
					error={errors?.startDate}
					type='datetime-local'
				/>
				<InputField
					label='Время окончания'
					name='dueDate'
					defaultValue={data?.dueDate}
					register={register}
					error={errors?.dueDate}
					type='datetime-local'
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
				<div className='flex flex-col gap-2 w-full md:w-1/4'>
					<label className='text-xs text-gray-500'>Занятие</label>
					<select
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('lessonId')}
						// defaultValue={data?.teachers}
					>
						{lessons.map((lesson: { id: number; name: string }) => (
							<option value={lesson.id} key={lesson.id}>
								{lesson.name}
							</option>
						))}
					</select>
					{errors.lessonId?.message && (
						<p className='text-xs text-red-400'>
							{errors.lessonId.message.toString()}
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

export default AssignmentForm
