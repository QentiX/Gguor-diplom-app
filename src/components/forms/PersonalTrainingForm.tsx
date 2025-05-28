'use client'
import { createPersonalTraining, updatePersonalTraining } from '@/lib/actions'
import {
	personalTrainingSchema,
	PersonalTrainingSchema,
} from '@/lib/formValidationSchemas'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import InputField from '../InputField'
import SelectField from '../SelectField'

const PersonalTrainingForm = ({
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
	const { userId } = useAuth()
	const [isCoach, setIsCoach] = useState(false)
	const [currentCoach, setCurrentCoach] = useState<any>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<PersonalTrainingSchema>({
		resolver: zodResolver(personalTrainingSchema),
		defaultValues: {
			...data,
			files:
				data?.files?.map((file: any) => ({
					url: file.url,
					originalName: file.originalName,
					fileType: file.fileType,
				})) || [],
		},
	})

	const router = useRouter()
	const files = watch('files') || []
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [uploading, setUploading] = useState(false)

	// Определяем, является ли пользователь тренером
	useEffect(() => {
		if (!userId) return

		// Ищем текущего пользователя в списке тренеров
		const coach = relatedData.coaches.find((c: any) => c.id === userId)

		if (coach) {
			setIsCoach(true)
			setCurrentCoach(coach)

			// При создании автоматически устанавливаем тренера
			if (type === 'create') {
				setValue('coachId', userId)
			}
		}
	}, [userId, relatedData.coaches, type, setValue])

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) return

		setUploading(true)
		const newFiles = []

		// Обрабатываем все выбранные файлы
		for (let i = 0; i < e.target.files.length; i++) {
			const file = e.target.files[i]
			const formData = new FormData()
			formData.append('file', file)
			formData.append('upload_preset', 'school')

			try {
				const response = await fetch(
					`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
					{
						method: 'POST',
						body: formData,
					}
				)

				if (!response.ok) {
					throw new Error(`Ошибка загрузки файла: ${response.statusText}`)
				}

				const result = await response.json()
				newFiles.push({
					url: result.secure_url,
					originalName: file.name,
					fileType: result.resource_type,
				})
			} catch (error) {
				console.error('Ошибка при загрузке файла:', error)
				toast.error(`Ошибка при загрузке файла: ${file.name}`)
			}
		}

		// Обновляем список файлов в форме
		setValue('files', [...files, ...newFiles])
		setUploading(false)

		// Сбрасываем значение input для возможности повторной загрузки тех же файлов
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const removeFile = (index: number) => {
		const updatedFiles = [...files]
		updatedFiles.splice(index, 1)
		setValue('files', updatedFiles)
	}

	const onSubmit = async (formData: PersonalTrainingSchema) => {
		try {
			if (type === 'create') {
				await createPersonalTraining({ success: false, error: false }, formData)
			} else {
				await updatePersonalTraining({ success: false, error: false }, formData)
			}

			toast.success(
				`Тренировка успешно ${type === 'create' ? 'создана' : 'обновлена'}!`
			)
			setOpen(false)
			router.refresh()
		} catch (error) {
			toast.error('Произошла ошибка!')
			console.error('Submission error:', error)
		}
	}

	return (
		<form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
			<h1 className='text-xl font-semibold'>
				{type === 'create' ? 'Создать тренировку' : 'Редактировать тренировку'}
			</h1>
			<div className='flex gap-6 flex-wrap'>
				<InputField
					label='Название'
					name='title'
					register={register}
					error={errors.title}
				/>

				<InputField
					label='Описание'
					name='description'
					register={register}
					error={errors.description}
				/>

				<InputField
					label='Рекомендации'
					name='recommendations'
					register={register}
					error={errors.recommendations}
				/>
			</div>

			<SelectField
				label='Студент'
				name='studentId'
				register={register}
				error={errors.studentId}
				options={relatedData.students.map((s: any) => ({
					value: s.id,
					label: `${s.surname} ${s.name}`,
				}))}
			/>

			{type === 'create' && isCoach && currentCoach ? (
				<div className='space-y-1'>
					<label className='text-xs text-gray-500'>Тренер</label>
					<div className='p-2 bg-gray-100 rounded-md'>
						<p className='font-medium text-sm text-gray-500'>
							{currentCoach.surname} {currentCoach.name}
						</p>
					</div>
					<input type='hidden' {...register('coachId')} />
				</div>
			) : (
				<SelectField
					label='Тренер'
					name='coachId'
					register={register}
					error={errors.coachId}
					options={relatedData.coaches.map((c: any) => ({
						value: c.id,
						label: `${c.surname} ${c.name}`,
					}))}
					disabled={isCoach && type === 'update'}
				/>
			)}

			<div className='space-y-2'>
				<label className='text-sm font-medium mr-[16px]'>Файлы</label>
				<input
					type='file'
					ref={fileInputRef}
					onChange={handleFileChange}
					multiple
					className='hidden'
					id='file-upload'
					disabled={uploading}
				/>
				<label
					htmlFor='file-upload'
					className={`px-4 py-2 text-sm text-white rounded inline-block cursor-pointer ${
						uploading ? 'bg-gray-400' : 'bg-[#3780D2] hover:bg-[#2a6bb0]'
					}`}
				>
					{uploading ? 'Загрузка...' : 'Добавить файлы'}
				</label>

				<div className='mt-2 grid grid-cols-1 md:grid-cols-2 gap-2'>
					{files.map((file, index) => (
						<div
							key={index}
							className='flex items-center justify-between p-2 border rounded'
						>
							<Link
								href={file.url}
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-500 truncate'
								title={file.originalName}
							>
								{file.originalName}
							</Link>
							<button
								type='button'
								onClick={() => removeFile(index)}
								className='ml-2'
							>
								<X size={14} color='red' />
							</button>
						</div>
					))}
				</div>
			</div>

			{data?.id && <input type='hidden' {...register('id')} />}

			<button
				type='submit'
				className='bg-[#3780D2] text-white p-2 rounded-xl hover:bg-[#2a6bb0] transition-colors'
			>
				{type === 'create' ? 'Создать' : 'Обновить'}
			</button>
		</form>
	)
}

export default PersonalTrainingForm
