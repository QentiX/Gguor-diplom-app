// TiptapEditor.tsx
'use client'

import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { CldUploadWidget } from 'next-cloudinary'
import { useCallback, useState } from 'react'
import {
	FaAlignCenter,
	FaAlignLeft,
	FaAlignRight,
	FaBold,
	FaCode,
	FaHeading,
	FaImage,
	FaItalic,
	FaLink,
	FaListOl,
	FaListUl,
	FaQuoteRight,
	FaRedo,
	FaStrikethrough,
	FaUnderline,
	FaUndo,
} from 'react-icons/fa'

type Level = 1 | 2 | 3

const TiptapEditor = ({
	content,
	onChange,
}: {
	content: string
	onChange: (content: string) => void
}) => {
	const [linkUrl, setLinkUrl] = useState('')
	const [showLinkInput, setShowLinkInput] = useState(false)

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: { levels: [1, 2, 3] },
				codeBlock: { HTMLAttributes: { class: 'bg-gray-100 p-4 rounded' } },
			}),
			Image.configure({
				inline: true,
				HTMLAttributes: { class: 'mx-auto my-4 rounded-lg max-w-full h-auto' },
			}),
			Placeholder.configure({ placeholder: 'Начните вводить текст...' }),
			Link.configure({ openOnClick: false }),
			Underline,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
		],
		content: content,
		editorProps: {
			handleDrop: (view, event) => {
				const items = Array.from(event.dataTransfer?.items || [])
				const files = items.filter(item => item.kind === 'file')

				if (files.length > 0) {
					files.forEach(async file => {
						const imageFile = file.getAsFile()
						if (imageFile) {
							const formData = new FormData()
							formData.append('file', imageFile)
							formData.append('upload_preset', 'school')

							const response = await fetch(
								`https://api.cloudinary.com/v1_1/dafcrwdfx/upload`,
								{ method: 'POST', body: formData }
							)

							const data = await response.json()
							editor?.chain().focus().setImage({ src: data.secure_url }).run()
						}
					})
					return true
				}
				return false
			},
		},
		onUpdate: ({ editor }) => onChange(editor.getHTML()),
	})

	const setHeading = useCallback(
		(level: Level) => () =>
			editor?.chain().focus().toggleHeading({ level }).run(),
		[editor]
	)

	const addLink = useCallback(() => {
		if (linkUrl) {
			editor?.chain().focus().toggleLink({ href: linkUrl }).run()
			setLinkUrl('')
		}
		setShowLinkInput(false)
	}, [editor, linkUrl])

	const addImage = useCallback(
		(url: string) => editor?.chain().focus().setImage({ src: url }).run(),
		[editor]
	)

	if (!editor) return null

	return (
		<div className='border rounded-lg bg-white'>
			<div className='flex flex-col gap-4'>
				<div className='flex flex-wrap gap-2 p-3 border-b bg-gray-50'>
					{/* Text Formatting */}
					<button
						type='button'
						onClick={() => editor.chain().focus().toggleBold().run()}
						className={`p-2 rounded ${
							editor.isActive('bold')
								? 'bg-blue-100 text-blue-600'
								: 'hover:bg-gray-100'
						}`}
					>
						<FaBold />
					</button>

					<button
						type='button'
						onClick={() => editor.chain().focus().toggleItalic().run()}
						className={`p-2 rounded ${
							editor.isActive('italic')
								? 'bg-blue-100 text-blue-600'
								: 'hover:bg-gray-100'
						}`}
					>
						<FaItalic />
					</button>

					<button
						type='button'
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						className={`p-2 rounded ${
							editor.isActive('underline')
								? 'bg-blue-100 text-blue-600'
								: 'hover:bg-gray-100'
						}`}
					>
						<FaUnderline />
					</button>

					<button
						type='button'
						onClick={() => editor.chain().focus().toggleStrike().run()}
						className={`p-2 rounded ${
							editor.isActive('strike')
								? 'bg-blue-100 text-blue-600'
								: 'hover:bg-gray-100'
						}`}
					>
						<FaStrikethrough />
					</button>

					{/* Headings */}
					{([1, 2, 3] as Level[]).map(level => (
						<button
							key={level}
							type='button'
							onClick={setHeading(level)}
							className={`p-2 rounded ${
								editor.isActive('heading', { level })
									? 'bg-blue-100 text-blue-600'
									: 'hover:bg-gray-100'
							}`}
						>
							<FaHeading className='inline mr-1' />
							{level}
						</button>
					))}

					{/* Lists */}
					<button
						type='button'
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						className={`p-2 rounded ${
							editor.isActive('bulletList')
								? 'bg-blue-100 text-blue-600'
								: 'hover:bg-gray-100'
						}`}
					>
						<FaListUl />
					</button>

					<button
						type='button'
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						className={`p-2 rounded ${
							editor.isActive('orderedList')
								? 'bg-blue-100 text-blue-600'
								: 'hover:bg-gray-100'
						}`}
					>
						<FaListOl />
					</button>

					{/* Block Elements */}
					<button
						type='button'
						onClick={() => editor.chain().focus().toggleBlockquote().run()}
						className={`p-2 rounded ${
							editor.isActive('blockquote')
								? 'bg-blue-100 text-blue-600'
								: 'hover:bg-gray-100'
						}`}
					>
						<FaQuoteRight />
					</button>

					<button
						type='button'
						onClick={() => editor.chain().focus().toggleCodeBlock().run()}
						className={`p-2 rounded ${
							editor.isActive('codeBlock')
								? 'bg-blue-100 text-blue-600'
								: 'hover:bg-gray-100'
						}`}
					>
						<FaCode />
					</button>

					{/* Alignment */}
					<button
						type='button'
						onClick={() => editor.chain().focus().setTextAlign('left').run()}
						className={`p-2 rounded ${
							editor.isActive({ textAlign: 'left' })
								? 'bg-blue-100 text-blue-600'
								: 'hover:bg-gray-100'
						}`}
					>
						<FaAlignLeft />
					</button>

					<button
						type='button'
						onClick={() => editor.chain().focus().setTextAlign('center').run()}
						className={`p-2 rounded ${
							editor.isActive({ textAlign: 'center' })
								? 'bg-blue-100 text-blue-600'
								: 'hover:bg-gray-100'
						}`}
					>
						<FaAlignCenter />
					</button>

					<button
						type='button'
						onClick={() => editor.chain().focus().setTextAlign('right').run()}
						className={`p-2 rounded ${
							editor.isActive({ textAlign: 'right' })
								? 'bg-blue-100 text-blue-600'
								: 'hover:bg-gray-100'
						}`}
					>
						<FaAlignRight />
					</button>

					{/* Links */}
					<div className='relative'>
						<button
							type='button'
							onClick={() => setShowLinkInput(!showLinkInput)}
							className={`p-2 rounded ${
								editor.isActive('link')
									? 'bg-blue-100 text-blue-600'
									: 'hover:bg-gray-100'
							}`}
						>
							<FaLink />
						</button>

						{showLinkInput && (
							<div className='absolute top-full left-0 mt-1 bg-white p-2 rounded shadow-lg z-10'>
								<input
									type='text'
									value={linkUrl}
									onChange={e => setLinkUrl(e.target.value)}
									placeholder='Введите URL'
									className='p-1 border rounded mr-2'
								/>
								<button
									type='button'
									onClick={addLink}
									className='px-2 py-1 bg-blue-500 text-white rounded'
								>
									Применить
								</button>
							</div>
						)}
					</div>

					{/* Images */}
					<CldUploadWidget
						uploadPreset='school'
						onSuccess={(result: any) => addImage(result.info.secure_url)}
					>
						{({ open }) => (
							<button
								type='button'
								onClick={() => open()}
								className='p-2 rounded hover:bg-gray-100'
							>
								<FaImage />
							</button>
						)}
					</CldUploadWidget>

					{/* History */}
					<button
						type='button'
						onClick={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().undo()}
						className='p-2 rounded disabled:opacity-50 hover:bg-gray-100'
					>
						<FaUndo />
					</button>

					<button
						type='button'
						onClick={() => editor.chain().focus().redo().run()}
						disabled={!editor.can().redo()}
						className='p-2 rounded disabled:opacity-50 hover:bg-gray-100'
					>
						<FaRedo />
					</button>
				</div>

				<div className='max-h-[35vh] overflow-y-auto px-4 pb-4'>
					<EditorContent
						editor={editor}
						className='prose max-w-none focus:outline-none'
					/>
				</div>
			</div>
		</div>
	)
}

export default TiptapEditor
