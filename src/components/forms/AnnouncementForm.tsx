'use client'

import { createAnnouncement, updateAnnouncement } from '@/lib/actions'
import {
	announcementSchema,
	AnnouncementSchema,
} from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import InputField from '../InputField'

const AnnouncementForm = ({
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
	} = useForm<AnnouncementSchema>({
		resolver: zodResolver(announcementSchema),
	})

	// AFTER REACT 19 IT'LL BE USEACTIONSTATE

	const [state, formAction] = useFormState(
		type === 'create' ? createAnnouncement : updateAnnouncement,
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
			toast(`Анонс был ${type === 'create' ? 'создан' : 'обновлен'}!`)
			setOpen(false)
			router.refresh()
		}
	}, [state, router, type, setOpen])

	const { classes } = relatedData

	return (
		<form className='flex flex-col gap-8' onSubmit={onSubmit}>
			<h1 className='text-xl font-semibold'>
				{type === 'create' ? 'Создать анонс' : 'Обновить анонс'}
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
					label='Дата'
					name='date'
					defaultValue={data?.date.toISOString().split('T')[0]}
					register={register}
					error={errors?.date}
					type='date'
				/>
				<InputField
					label='Описание'
					name='description'
					defaultValue={data?.description}
					register={register}
					error={errors?.description}
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
					<label className='text-xs text-gray-500'>Группа</label>
					<select
						// multiple
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('classId')}
						// defaultValue={data?.classes}
					>
						<option selected disabled value=''>
							Выберите группу
						</option>
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

export default AnnouncementForm
