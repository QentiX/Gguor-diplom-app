'use client'

import { createCoach, updateCoach } from '@/lib/actions'
import { coachSchema, CoachSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import InputField from '../InputField'

const CoachForm = ({
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
	} = useForm<CoachSchema>({
		resolver: zodResolver(coachSchema),
	})

	const [img, setImg] = useState<any>()
	const [previewImage, setPreviewImage] = useState(data?.img || '')

	const [state, formAction] = useFormState(
		type === 'create' ? createCoach : updateCoach,
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
			toast(`Тренер был ${type === 'create' ? 'создан' : 'обновлен'}!`)
			setOpen(false)
			router.refresh()
		}
	}, [state, router, type, setOpen])

	useEffect(() => {
		if (data?.img) {
			setPreviewImage(data.img)
		}
	}, [data])

	const handleUploadSuccess = (result: any, { widget }: { widget: any }) => {
		setImg(result.info)
		setPreviewImage(result.info.secure_url)
		widget.close()
	}

	const { disciplines } = relatedData

	return (
		<form className='flex flex-col gap-8' onSubmit={onSubmit}>
			<h1 className='text-xl font-semibold'>
				{type === 'create' ? 'Создать нового тренера' : 'Обновить тренера'}
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
					label='Квалификация'
					name='qualification'
					defaultValue={data?.qualification}
					register={register}
					error={errors.qualification}
				/>
				<InputField
					label='Достижения'
					name='achievements'
					defaultValue={data?.achievements}
					register={register}
					error={errors.achievements}
				/>
				<InputField
					label='Дата рождения'
					name='birthday'
					defaultValue={data?.birthday.toISOString().split('T')[0]}
					register={register}
					error={errors.birthday}
					type='date'
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
					<label className='text-xs text-gray-500'>Дисциплины</label>
					<select
						multiple
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('disciplines')}
						defaultValue={data?.disciplines}
					>
						{disciplines.map((disciplines: { id: number; name: string }) => (
							<option value={disciplines.id} key={disciplines.id}>
								{disciplines.name}
							</option>
						))}
					</select>
					{errors.disciplines?.message && (
						<p className='text-xs text-red-400'>
							{errors.disciplines.message.toString()}
						</p>
					)}
				</div>
				<div className='flex gap-8 items-center'>
					<CldUploadWidget
						uploadPreset='school'
						onSuccess={handleUploadSuccess}
					>
						{({ open }) => (
							<div
								className='text-xs text-gray-500 flex items-center gap-2 cursor-pointer'
								onClick={() => open()}
							>
								<Image src='/upload.png' alt='' width={28} height={28} />
								<span>Загрузить фотографию</span>
							</div>
						)}
					</CldUploadWidget>

					{previewImage && (
						<Image
							src={`${previewImage}?ts=${Date.now()}`}
							alt='Preview'
							width={100}
							height={100}
							key={previewImage}
							onError={() => setPreviewImage('/no-profile-picture.svg')}
						/>
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

export default CoachForm
