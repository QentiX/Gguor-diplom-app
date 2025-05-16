'use client'

import { createNews, updateNews } from '@/lib/actions'
import { newsSchema, NewsSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import InputField from '../InputField'
import TiptapEditor from '../TiptapEditor'

const NewsForm = ({
	type,
	data,
	setOpen,
}: {
	type: 'create' | 'update'
	data?: any
	setOpen: Dispatch<SetStateAction<boolean>>
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<NewsSchema>({
		resolver: zodResolver(newsSchema),
		defaultValues: {
			id: data?.id,
			title: data?.title,
			content: data?.content,
			thumbnail: data?.thumbnail,
		},
	})

	const router = useRouter()
	const content = watch('content')
	const thumbnail = watch('thumbnail')

	const onSubmit = async (formData: NewsSchema) => {
		try {
			if (type === 'create') {
				await createNews({ success: false, error: false }, formData)
			} else {
				await updateNews({ success: false, error: false }, formData)
			}
			toast.success(
				`Новость успешно ${type === 'create' ? 'создана' : 'обновлена'}!`
			)
			setOpen(false)
			router.refresh()
		} catch (error) {
			toast.error('Произошла ошибка!')
			console.error('Submission error:', error)
		}
	}

	const handleThumbnailUpload = (result: any) => {
		const thumbnailUrl = result.info.secure_url
		setValue('thumbnail', thumbnailUrl)
	}

	return (
		<form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
			<h1 className='text-xl font-semibold'>
				{type === 'create' ? 'Создать новость' : 'Редактировать новость'}
			</h1>

			<div className='flex flex-col gap-4'>
				<InputField
					label='Заголовок'
					name='title'
					register={register}
					error={errors.title}
				/>

				<div className='space-y-2 flex-1 min-h-[300px]'>
					<label className='text-sm font-medium'>Содержание</label>
					<TiptapEditor
						content={content}
						onChange={content => setValue('content', content)}
					/>
					{errors.content && (
						<span className='text-red-500 text-sm'>
							{errors.content.message}
						</span>
					)}
				</div>

				<div className='space-y-2'>
					<label className='text-sm font-medium'>Обложка новости</label>
					<div className='flex gap-4 items-center'>
						<CldUploadWidget
							uploadPreset='school'
							onSuccess={handleThumbnailUpload}
						>
							{({ open }) => (
								<button
									type='button'
									onClick={() => open()}
									className='px-4 py-2 text-sm bg-[#3780D2] text-white rounded'
								>
									Загрузить обложку
								</button>
							)}
						</CldUploadWidget>
						{thumbnail && (
							<Image
								src={thumbnail}
								alt='Preview'
								width={120}
								height={80}
								className='rounded-lg object-cover'
							/>
						)}
					</div>
					{errors.thumbnail && (
						<span className='text-red-500 text-sm'>
							{errors.thumbnail.message}
						</span>
					)}
				</div>

				{data?.id && <input type='hidden' {...register('id')} />}
			</div>

			<button type='submit' className='bg-[#3780D2] text-white p-2 rounded-xl'>
				{type === 'create' ? 'Создать' : 'Обновить'}
			</button>
		</form>
	)
}

export default NewsForm
