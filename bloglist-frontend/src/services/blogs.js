import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = async (details) => {
	const config = {
    	headers: { Authorization: token }
	}
	const response = await axios.post(baseUrl, details, config)
	return response.data
}

const update = async (id, details) => {
	await axios.put(`${baseUrl}/${id}`, details)
}

const remove = async (id) => {
	const config = {
		headers: { Authorization: token }
	}
	await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, setToken, create, update, remove }