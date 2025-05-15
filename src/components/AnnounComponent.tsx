import Link from 'next/link'

interface AnnounProps {
	desc: string
	title: string
	date: string
	link: string
}

const AnnounComponent = ({ desc, title, date, link }: AnnounProps) => {
	return (
		<div className='flex flex-col gap-[10px] w-full'>
			<div className='flex flex-col gap-[5px] w-full'>
				<p className='text-black text-xs font-medium'>{date}</p>
				<Link href={link}>
					<p className='text-[#0A3470] text-[15px] font-semibold break-words leading-snug hover:underline decoration-[#0A3470]'>
						{title}
					</p>
				</Link>
			</div>
			<p className='text-black text-[14px] font-medium break-words leading-snug'>
				{desc}
			</p>
		</div>
	)
}

export default AnnounComponent
