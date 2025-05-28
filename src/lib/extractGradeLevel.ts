export const extractGradeLevel = (className: string): number | null => {
	const match = className.match(/^\d+/)
	return match ? parseInt(match[0], 10) : null
}
