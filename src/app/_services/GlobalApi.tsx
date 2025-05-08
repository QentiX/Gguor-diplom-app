const { default: axios } = require('axios')

const GetAllClasses = () => axios.get('/api/classList')
const GetAllSubjects = () => axios.get('/api/subjectList')
const GetAllDisciplines = () => axios.get('/api/disciplineList')
const GetAttendanceList = (
) => axios.get('/api/attendanceList')

export default {
	GetAllClasses,
	GetAllSubjects,
	GetAllDisciplines,
	GetAttendanceList,
}
