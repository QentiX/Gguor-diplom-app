'use client'

import { createDiscipline, updateDiscipline } from '@/lib/actions'
import { disciplineSchema, DisciplineSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import InputField from '../InputField'

const DisciplineForm = ({
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
	} = useForm<DisciplineSchema>({
		resolver: zodResolver(disciplineSchema),
	})

	// AFTER REACT 19 IT'LL BE USEACTIONSTATE

	const [state, formAction] = useFormState(
		type === 'create' ? createDiscipline : updateDiscipline,
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
			toast(`Дисциплина была ${type === 'create' ? 'создана' : 'обновлена'}!`)
			setOpen(false)
			router.refresh()
		}
	}, [state, router, type, setOpen])

	const { coaches } = relatedData

	return (
		<form className='flex flex-col gap-8' onSubmit={onSubmit}>
			<h1 className='text-xl font-semibold'>
				{type === 'create'
					? 'Добавить новую дисциплину'
					: 'Обновить дисциплину'}
			</h1>
			<div className='flex flex-wrap gap-4'>
				<InputField
					label='Название дисциплины'
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
					<label className='text-xs text-gray-500'>Тренеры</label>
					<select
						multiple
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('coaches')}
						defaultValue={data?.coaches}
					>
						{coaches.map(
							(coach: { id: string; name: string; surname: string }) => (
								<option value={coach.id} key={coach.id}>
									{coach.name + ' ' + coach.surname}
								</option>
							)
						)}
					</select>
					{errors.coaches?.message && (
						<p className='text-xs text-red-400'>
							{errors.coaches.message.toString()}
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

export default DisciplineForm
