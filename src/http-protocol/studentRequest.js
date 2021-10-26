import httpRequest from './index'

const endpoint = '/students'

const studentRequest = {
    getStudents(params) {
        return httpRequest.get(endpoint, { params })
    },
    getOneStudent(id) {
        const url = `${endpoint}/${id}`
        return httpRequest.get(url)
    },
    createStudent(data) {
        return httpRequest.post(endpoint, data)
    },
    updateStudent(id, data) {
        const url = `${endpoint}/${id}`
        return httpRequest.put(url, data)
    },
    deleteStudent(id) {
        const url = `${endpoint}/${id}`
        return httpRequest.delete(url)
    },
}

export default studentRequest
