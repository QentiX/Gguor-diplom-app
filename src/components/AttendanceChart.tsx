'use client'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

const data = [
	{
		name: 'Пн',
		present: 60,
		absent: 40,
	},
	{
		name: 'Вт',
		present: 70,
		absent: 60,
	},
	{
		name: 'Ср',
		present: 90,
		absent: 75,
	},
	{
		name: 'Чт',
		present: 90,
		absent: 75,
	},
	{
		name: 'Пт',
		present: 65,
		absent: 55,
	},
]

const AttendanceChart = () => {
	return (
		<div className='bg-white rounded-md p-4 pb-10 h-full '>
			<div className='flex justify-between items-center'>
				<h1 className='text-lg font-semibold mb-2'>Посещаемость</h1>
			</div>
			<ResponsiveContainer width='100%' height='100%'>
				<BarChart
					width={500}
					height={300}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip contentStyle={{borderRadius: '5px'}}/>
					<Legend />
					<Bar dataKey='present' fill='#0A3470' />
					<Bar dataKey='absent' fill='#3E5DDB' />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default AttendanceChart
