import React from 'react'

interface SelectFieldProps {
	label: string
	name: string
	register: any
	error?: any
	options: { value: string; label: string }[]
	disabled?: boolean
}

const SelectField: React.FC<SelectFieldProps> = ({
	label,
	name,
	register,
	error,
	options,
	disabled = false,
}) => {
	return (
		<div className='space-y-1'>
			<label
				htmlFor={name}
				className={`text-xs ${
					disabled ? ' text-gray-500' : 'text-gray-500'
				}`}
			>
				{label}
			</label>
			<select
				id={name}
				{...register(name)}
				className={`w-full p-2 rounded-md text-sm ${
					error ? 'border-2 border-red-500 bg-red-50' : 'border border-gray-300'
				} ${
					disabled
						? 'bg-gray-100 text-gray-500 cursor-not-allowed'
						: 'bg-white hover:border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
				} transition-colors`}
				disabled={disabled}
			>
				<option value=''>Выберите...</option>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{error && <span className='text-red-500 text-xs'>{error.message}</span>}
		</div>
	)
}

export default SelectField
