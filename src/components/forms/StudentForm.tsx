'use client'

import { createStudent, updateStudent } from '@/lib/actions'
import { studentSchema, StudentSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import InputField from '../InputField'

const StudentForm = ({
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
	} = useForm<StudentSchema>({
		resolver: zodResolver(studentSchema),
	})

	const [img, setImg] = useState<any>()

	const [state, formAction] = useFormState(
		type === 'create' ? createStudent : updateStudent,
		{
			success: false,
			error: false,
		}
	)

	const onSubmit = handleSubmit(data => {
		console.log(data)
		formAction({ ...data, img: img?.secure_url })
	})

	const router = useRouter()

	useEffect(() => {
		if (state.success) {
			toast(`Студент был ${type === 'create' ? 'создан' : 'обновлен'}!`)
			setOpen(false)
			router.refresh()
		}
	}, [state, router, type, setOpen])

	const { grades, classes } = relatedData

	return (
		<form className='flex flex-col gap-8' onSubmit={onSubmit}>
			<h1 className='text-xl font-semibold'>
				{type === 'create' ? 'Создать нового студента' : 'Обновить студента'}
			</h1>
			<span className='text-xs text-gray-400 font-medium'>
				Аутентификационная информация
			</span>
			<div className='flex justify-between flex-wrap gap-4'>
				<InputField
					label='Логин'
					name='username'
					defaultValue={data?.username}
					register={register}
					error={errors?.username}
				/>
				<InputField
					label='Почта'
					name='email'
					defaultValue={data?.email}
					register={register}
					error={errors?.email}
				/>
				<InputField
					label='Пароль'
					name='password'
					type='password'
					defaultValue={data?.password}
					register={register}
					error={errors?.password}
				/>
			</div>
			<span className='text-xs text-gray-400 font-medium'>
				Персональная информация
			</span>
			<CldUploadWidget
				uploadPreset='school'
				onSuccess={(result, { widget }) => {
					setImg(result.info)
					widget.close()
				}}
			>
				{({ open }) => {
					return (
						<div
							className='text-xs text-gray-500 flex items-center gap-2 cursor-pointer'
							onClick={() => open()}
						>
							<Image src='/upload.png' alt='' width={28} height={28} />
							<span>Загрузить фотографию</span>
						</div>
					)
				}}
			</CldUploadWidget>
			<div className='flex justify-between flex-wrap gap-4'>
				<InputField
					label='Имя'
					name='name'
					defaultValue={data?.name}
					register={register}
					error={errors.name}
				/>
				<InputField
					label='Фамилия'
					name='surname'
					defaultValue={data?.surname}
					register={register}
					error={errors.surname}
				/>
				<InputField
					label='Телефон'
					name='phone'
					defaultValue={data?.phone}
					register={register}
					error={errors.phone}
				/>
				<InputField
					label='Адрес'
					name='address'
					defaultValue={data?.address}
					register={register}
					error={errors.address}
				/>
				<InputField
					label='Должность'
					name='position'
					defaultValue={data?.position}
					register={register}
					error={errors.position}
				/>
				<InputField
					label='Дата рождения'
					name='birthday'
					defaultValue={data?.birthday.toISOString().split('T')[0]}
					register={register}
					error={errors.birthday}
					type='date'
				/>
				<InputField
					label='Статус'
					name='status'
					defaultValue={data?.status}
					register={register}
					error={errors.status}
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
					<label className='text-xs text-gray-500'>Пол</label>
					<select
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('sex')}
						defaultValue={data?.sex}
					>
						<option value='MALE'>Мужской</option>
						<option value='FEMALE'>Женский</option>
					</select>
					{errors.sex?.message && (
						<p className='text-xs text-red-400'>
							{errors.sex.message.toString()}
						</p>
					)}
				</div>
				<div className='flex flex-col gap-2 w-full md:w-1/4'>
					<label className='text-xs text-gray-500'>Класс/Курс</label>
					<select
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('gradeId')}
						defaultValue={data?.gradeId}
					>
						{grades.map((grade: { id: number; level: number }) => (
							<option value={grade.id} key={grade.id}>
								{grade.level}
							</option>
						))}
					</select>
					{errors.gradeId?.message && (
						<p className='text-xs text-red-400'>
							{errors.gradeId.message.toString()}
						</p>
					)}
				</div>
				<div className='flex flex-col gap-2 w-full md:w-1/4'>
					<label className='text-xs text-gray-500'>Группа</label>
					<select
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('classId')}
						defaultValue={data?.classId}
					>
						{classes.map(
							(classItem: {
								id: number
								name: string
								capacity: number
								_count: { students: number }
							}) => (
								<option value={classItem.id} key={classItem.id}>
									({classItem.name} -{' '}
									{classItem._count.students + '/' + classItem.capacity}{' '}
									Вместимость)
								</option>
							)
						)}
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
			<button type='submit' className='bg-blue-400 text-white p-2 rounded-md'>
				{type === 'create' ? 'Создать' : 'Обновить'}
			</button>
		</form>
	)
}

export default StudentForm
