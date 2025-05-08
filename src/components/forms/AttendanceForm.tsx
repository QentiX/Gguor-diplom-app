'use client'

import { createAttendance, updateAttendance } from '@/lib/actions'
import { attendanceSchema, AttendanceSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import InputField from '../InputField'

const AttendanceForm = ({
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
	} = useForm<AttendanceSchema>({
		resolver: zodResolver(attendanceSchema),
	})

	// AFTER REACT 19 IT'LL BE USEACTIONSTATE

	const [state, formAction] = useFormState(
		type === 'create' ? createAttendance : updateAttendance,
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
			toast(`Статус был ${type === 'create' ? 'создан' : 'обновлен'}!`)
			setOpen(false)
			router.refresh()
		}
	}, [state, router, type, setOpen])

	const { lessons, students } = relatedData

	return (
		<form className='flex flex-col gap-8' onSubmit={onSubmit}>
			<h1 className='text-xl font-semibold'>
				{type === 'create' ? 'Создать статус' : 'Обновить статус'}
			</h1>

			<div className='flex justify-between flex-wrap gap-4'>
				<InputField
					label='Дата'
					name='date'
					defaultValue={data?.date.toISOString().split('T')[0]}
					register={register}
					error={errors.date}
					type='date'
				/>
				<InputField
					label='День'
					name='day'
					defaultValue={data?.day}
					register={register}
					error={errors?.day}
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
				<div className='flex flex-col gap-2 w-full md:w-1/4'>
					<label className='text-xs text-gray-500'>Студенты</label>
					<select
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('studentId')}
						// defaultValue={data?.teachers}
					>
						{students.map(
							(student: { id: number; name: string; surname: string }) => (
								<option value={student.id} key={student.id}>
									{student.name + ' ' + student.surname}
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
				<div className='flex flex-col gap-2 w-full md:w-1/4'>
					<label className='text-xs text-gray-500'>Статус</label>
					<select
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('present', {
							setValueAs: value => value === 'true',
						})}
						defaultValue={data?.present?.toString()}
					>
						<option selected disabled value=''>
							Выберите статус
						</option>
						<option value='true'>Присутствует</option>
						<option value='false'>Отсутствует</option>
					</select>
					{errors.present?.message && (
						<p className='text-xs text-red-400'>
							{errors.present.message.toString()}
						</p>
					)}
				</div>
			</div>
			{state.error && (
				<span className='text-red-500'>Что-то пошло не так!</span>
			)}
			<button className='bg-blue-400 text-white p-2 rounded-md'>
				{type === 'create' ? 'Создать' : 'Обновить'}
			</button>
		</form>
	)
}

export default AttendanceForm
