'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import InputField from '../InputField'

const schema = z.object({
	username: z
		.string()
		.min(3, {
			message:
				'Длина логина пользователя должна составлять не менее 3 символов!',
		})
		.max(20, {
			message:
				'Длина логина пользователя должна составлять не более 20 символов!',
		}),
	email: z.string().email({ message: 'Неверный адрес электронной почты!' }),
	password: z
		.string()
		.min(8, { message: 'Длина пароля должна составлять не менее 8 символов!' }),
	firstName: z.string().min(1, { message: 'Требуется указать имя!' }),
	lastName: z.string().min(1, { message: 'Требуется указать фамилию!' }),
	phone: z.string().min(1, { message: 'Требуется указать телефон!' }),
	address: z.string().min(1, { message: 'Требуется указать адрес!' }),
	post: z.string().min(1, { message: 'Требуется указать должность!' }),
	birthday: z.date({ message: 'Дата рождения обязательна!' }),
	sex: z.enum(['мужской', 'женский'], { message: 'Необходимо указать пол!' }),
	img: z.instanceof(File, { message: 'Необходимо прикрепить изображение!' }),
})

type Inputs = z.infer<typeof schema>

const CoachForm = ({
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
	} = useForm<Inputs>({
		resolver: zodResolver(schema),
	})

	const onSubmit = handleSubmit(data => {
		console.log(data)
	})

	return (
		<form className='flex flex-col gap-8' onSubmit={onSubmit}>
			<h1 className='text-xl font-semibold'>Добавить нового тренера</h1>
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
					name='firstName'
					defaultValue={data?.firstName}
					register={register}
					error={errors.firstName}
				/>
				<InputField
					label='Фамилия'
					name='lastName'
					defaultValue={data?.lastName}
					register={register}
					error={errors.lastName}
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
					name='post'
					defaultValue={data?.bloodType}
					register={register}
					error={errors.post}
				/>
				<InputField
					label='Дата рождения'
					name='birthday'
					defaultValue={data?.birthday}
					register={register}
					error={errors.birthday}
					type='date'
				/>
				<div className='flex flex-col gap-2 w-full md:w-1/4'>
					<label className='text-xs text-gray-500'>Пол</label>
					<select
						className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
						{...register('sex')}
						defaultValue={data?.sex}
					>
						<option value='male'>Мужской</option>
						<option value='female'>Женский</option>
					</select>
					{errors.sex?.message && (
						<p className='text-xs text-red-400'>
							{errors.sex.message.toString()}
						</p>
					)}
				</div>
				<div className='flex flex-col gap-2 w-full md:w-1/4 justify-center'>
					<label
						className='text-xs text-gray-500 flex items-center gap-2 cursor-pointer'
						htmlFor='img'
					>
						<Image src='/upload.png' alt='' width={28} height={28} />
						<span>Загрузить фотографию</span>
					</label>
					<input type='file' id='img' {...register('img')} className='hidden' />
					{errors.img?.message && (
						<p className='text-xs text-red-400'>
							{errors.img.message.toString()}
						</p>
					)}
				</div>
			</div>
			<button className='bg-[#B3E2FD] p-2 rounded-md'>
				{type === 'create' ? 'Создать' : 'Обновить'}
			</button>
		</form>
	)
}

export default CoachForm
