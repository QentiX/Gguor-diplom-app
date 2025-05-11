export const ITEM_PER_PAGE = 10

type RouteAccessMap = {
	[key: string]: string[]
}

export const routeAccessMap: RouteAccessMap = {
	'/admin(.*)': ['admin'],
	'/student(.*)': ['student'],
	'/teacher(.*)': ['teacher'],
	'/coach(.*)': ['coach'],
	'/list/teachers': ['admin', 'teacher'],
	'/list/students': ['admin', 'teacher', 'coach', 'student'],
	'/list/coaches': ['admin', 'coach'],
	'/list/subjects': ['admin'],
	'/list/classes': ['admin', 'teacher'],
	'/list/exams': ['admin', 'teacher', 'student', 'coach'],
	'/list/assignments': ['admin', 'teacher', 'student', 'coach'],
	'/list/results': ['admin', 'teacher', 'student', 'coach'],
	'/list/attendance': ['admin', 'teacher', 'student', 'coach'],
	'/list/events': ['admin', 'teacher', 'student', 'coach'],
	'/list/announcements': ['admin', 'teacher', 'student', 'coach'],
}
