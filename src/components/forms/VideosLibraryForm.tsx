'use client'

import { createVideo, updateVideo } from '@/lib/actions'
import { videoSchema, VideoSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import InputField from '../InputField'

const VideosLibraryForm = ({
	type,
	data,
	setOpen,
	relatedData,
}: {
	type: 'create' | 'update'
	data?: any
	relatedData?: any
	setOpen: Dispatch<SetStateAction<boolean>>
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<VideoSchema>({
		resolver: zodResolver(videoSchema),
		defaultValues: {
			id: data?.id,
			title: data?.title,
			videoUrl: data?.videoUrl,
			thumbnail: data?.thumbnail,
		},
	})

	const [previewImage, setPreviewImage] = useState(data?.thumbnail || '')
	const router = useRouter()

	const onSubmit = async (formData: VideoSchema) => {
		try {
			if (type === 'create') {
				await createVideo({ success: false, error: false }, formData)
			} else {
				await updateVideo({ success: false, error: false }, formData)
			}
			toast.success(
				`Видео успешно ${type === 'create' ? 'создано' : 'обновлено'}!`
			)
			setOpen(false)
			router.refresh()
		} catch (error) {
			toast.error('Произошла ошибка!')
			console.error('Submission error:', error)
		}
	}

	const handleUploadSuccess = (result: any) => {
		const thumbnailUrl = result.info.secure_url
		setValue('thumbnail', thumbnailUrl)
		setPreviewImage(thumbnailUrl)
	}

	return (
		<form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
			<h1 className='text-xl font-semibold'>
				{type === 'create' ? 'Создать новое видео' : 'Обновить видео'}
			</h1>

			<div className='flex justify-between flex-wrap gap-4'>
				<InputField
					label='Название'
					name='title'
					register={register}
					error={errors.title}
				/>

				<InputField
					label='Ссылка на видео'
					name='videoUrl'
					register={register}
					error={errors.videoUrl}
				/>

				{data?.id && <input type='hidden' {...register('id')} />}

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
								<span>Загрузить обложку</span>
							</div>
						)}
					</CldUploadWidget>

					{previewImage && (
						<Image
							src={previewImage}
							alt='Preview'
							width={96}
							height={95}
							className='rounded-xl'
						/>
					)}
				</div>
			</div>

			<button type='submit' className='bg-[#3780D2] text-white p-2 rounded-xl'>
				{type === 'create' ? 'Создать' : 'Обновить'}
			</button>
		</form>
	)
}

export default VideosLibraryForm
