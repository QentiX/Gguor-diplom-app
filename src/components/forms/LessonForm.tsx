'use client'

import { createLesson, updateLesson } from '@/lib/actions'
import { lessonSchema, LessonSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import InputField from '../InputField'

const LessonForm = ({
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
	} = useForm<LessonSchema>({
		resolver: zodResolver(lessonSchema),
	})

	// AFTER REACT 19 IT'LL BE USEACTIONSTATE

	const [state, formAction] = useFormState(
		type === 'create' ? createLesson : updateLesson,
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
			toast(`Занятие было ${type === 'create' ? 'создано' : 'обновлено'}!`)
			setOpen(false)
			router.refresh()
		}
	}, [state, router, type, setOpen])

	const { subjects, disciplines, teachers, coaches, classes } = relatedData

	return (
		<form className='flex flex-col gap-8' onSubmit={onSubmit}>
			<h1 className='text-xl font-semibold'>
				{type === 'create' ? 'Создать занятие' : 'Обновить занятие'}
			</h1>

			<div className='flex justify-between flex-wrap gap-4'>
				<InputField
					label='Название'
					name='name'
					defaultValue={data?.name}
					register={register}
					error={errors?.name}
				/>
				<InputField
					label='Время начала'
					name='startTime'
					defaultValue={data?.startTime}
					register={register}
					error={errors?.startTime}
					type='datetime-local'
				/>
				<InputField
					label='Время окончания'
					name='endTime'
					defaultValue={data?.endTime}
					register={register}
					error={errors?.endTime}
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
					<label className='text-xs text-gray-500'>День недели</label>
					<select
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('day')}
						defaultValue={data?.day}
					>
						<option value='MONDAY'>Понедельник</option>
						<option value='TUESDAY'>Вторник</option>
						<option value='WEDNESDAY'>Среда</option>
						<option value='THURSDAY'>Четверг</option>
						<option value='FRIDAY'>Пятница</option>
						<option value='SATURDAY'>Суббота</option>
					</select>
					{errors.day?.message && (
						<p className='text-xs text-red-400'>
							{errors.day.message.toString()}
						</p>
					)}
				</div>
				<div className='flex flex-col gap-2 w-full md:w-1/4'>
					<label className='text-xs text-gray-500'>Предмет</label>
					<select
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('subjectId')}
						// defaultValue={data?.teachers}
					>
						<option selected disabled value=''>
							Выберите предмет
						</option>
						{subjects.map((subject: { id: number; name: string }) => (
							<option value={subject.id} key={subject.id}>
								{subject.name}
							</option>
						))}
					</select>
					{errors.subjectId?.message && (
						<p className='text-xs text-red-400'>
							{errors.subjectId.message.toString()}
						</p>
					)}
				</div>
				<div className='flex flex-col gap-2 w-full md:w-1/4'>
					<label className='text-xs text-gray-500'>Дисциплина</label>
					<select
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('disciplineId')}
						// defaultValue={data?.teachers}
					>
						<option selected disabled value=''>
							Выберите дисциплину
						</option>
						{disciplines.map((disciplines: { id: number; name: string }) => (
							<option value={disciplines.id} key={disciplines.id}>
								{disciplines.name}
							</option>
						))}
					</select>
					{errors.disciplineId?.message && (
						<p className='text-xs text-red-400'>
							{errors.disciplineId.message.toString()}
						</p>
					)}
				</div>
				<div className='flex flex-col gap-2 w-full md:w-1/4'>
					<label className='text-xs text-gray-500'>Учитель</label>
					<select
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('teacherId')}
						// defaultValue={data?.teachers}
					>
						<option selected disabled value=''>
							Выберите учителя
						</option>
						{teachers.map(
							(teacher: {
								id: number
								name: string
								surname: string
								position: string
							}) => (
								<option value={teacher.id} key={teacher.id}>
									{teacher.name +
										' ' +
										teacher.surname +
										' - ' +
										teacher.position}
								</option>
							)
						)}
					</select>
					{errors.teacherId?.message && (
						<p className='text-xs text-red-400'>
							{errors.teacherId.message.toString()}
						</p>
					)}
				</div>
				<div className='flex flex-col gap-2 w-full md:w-1/4'>
					<label className='text-xs text-gray-500'>Тренер</label>
					<select
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('coachId')}
						// defaultValue={data?.coaches}
					>
						<option selected disabled value=''>
							Выберите тренера
						</option>
						{coaches.map(
							(coach: {
								id: number
								name: string
								surname: string
								position: string
							}) => (
								<option value={coach.id} key={coach.id}>
									{coach.name + ' ' + coach.surname + ' - ' + coach.position}
								</option>
							)
						)}
					</select>
					{errors.coachId?.message && (
						<p className='text-xs text-red-400'>
							{errors.coachId.message.toString()}
						</p>
					)}
				</div>
				<div className='flex flex-col gap-2 w-full md:w-1/4'>
					<label className='text-xs text-gray-500'>Группа</label>
					<select
						// multiple
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('classId')}
						// defaultValue={data?.classes}
					>
						{classes.map((classes: { id: number; name: string }) => (
							<option value={classes.id} key={classes.id}>
								{classes.name}
							</option>
						))}
					</select>
					{errors.classId?.message && (
						<p className='text-xs text-red-400'>
							{errors.classId.message.toString()}
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

export default LessonForm
