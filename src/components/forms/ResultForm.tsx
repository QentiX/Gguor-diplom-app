'use client'

import { createResult, updateResult } from '@/lib/actions'
import { resultSchema, ResultSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import InputField from '../InputField'

const ResultForm = ({
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
	} = useForm<ResultSchema>({
		resolver: zodResolver(resultSchema),
	})

	// AFTER REACT 19 IT'LL BE USEACTIONSTATE

	const [state, formAction] = useFormState(
		type === 'create' ? createResult : updateResult,
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
			toast(`Результат был ${type === 'create' ? 'создан' : 'обновлен'}!`)
			setOpen(false)
			router.refresh()
		}
	}, [state, router, type, setOpen])

	const { exams, assignments, students } = relatedData

	return (
		<form className='flex flex-col gap-8' onSubmit={onSubmit}>
			<h1 className='text-xl font-semibold'>
				{type === 'create' ? 'Создать результат' : 'Обновить результат'}
			</h1>

			<div className='flex justify-between flex-wrap gap-4'>
				<InputField
					label='Оценка'
					name='score'
					defaultValue={data?.score}
					register={register}
					error={errors?.score}
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
					<label className='text-xs text-gray-500'>Экзамены</label>
					<select
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('examId')}
						// defaultValue={data?.teachers}
					>
						<option selected disabled value=''>
							Выберите экзамен
						</option>
						{exams.map((exams: { id: number; title: string }) => (
							<option value={exams.id} key={exams.id}>
								{exams.title}
							</option>
						))}
					</select>
					{errors.examId?.message && (
						<p className='text-xs text-red-400'>
							{errors.examId.message.toString()}
						</p>
					)}
				</div>
				<div className='flex flex-col gap-2 w-full md:w-1/4'>
					<label className='text-xs text-gray-500'>Задания</label>
					<select
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('assignmentId')}
						// defaultValue={data?.teachers}
					>
						<option selected disabled value=''>
							Выберите задание
						</option>
						{assignments.map((assignments: { id: number; title: string }) => (
							<option value={assignments.id} key={assignments.id}>
								{assignments.title}
							</option>
						))}
					</select>
					{errors.assignmentId?.message && (
						<p className='text-xs text-red-400'>
							{errors.assignmentId.message.toString()}
						</p>
					)}
				</div>
				<div className='flex flex-col gap-2 w-full md:w-1/4'>
					<label className='text-xs text-gray-500'>Студенты</label>
					<select
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('studentId')}
						// defaultValue={data?.teachers}
					>
						{students.map(
							(students: { id: number; name: string; surname: string }) => (
								<option value={students.id} key={students.id}>
									{students.name + ' ' + students.surname}
								</option>
							)
						)}
					</select>
					{errors.studentId?.message && (
						<p className='text-xs text-red-400'>
							{errors.studentId.message.toString()}
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

export default ResultForm
