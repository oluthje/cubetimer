import axios from 'axios'

export const formatCubeTime = (ms) => {
  const centiSeconds = `${Math.floor(ms % 1000)}0`.slice(0, 2)
  const seconds = `${Math.floor(ms / 1000)}`
  const getSeconds = `${(seconds % 60)}`.slice(-2)
  const minutes = `${Math.floor(seconds / 60)}`
  const getMinutes = `${minutes % 60}`.slice(-2)

  if (Number(getMinutes) === 0) {
    return `${getSeconds} . ${centiSeconds}`
  }
  return `${getMinutes} : ${getSeconds} . ${centiSeconds}`
}

export function getAvgOf(num, times) {
  if (Object.keys(times).length < num || num == 0) {
    return null
  }
  var avg = 0
  var index = 0

  // Iterate backwards over times
  for (let key = times.length - 1; key >= 0; key--) {
    const ms = times[key].seconds
    if (index == num) {
      break
    }
    avg += ms
    index += 1
  }
  return Math.floor(avg / index)
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getSessionTimesById(id) {
  return axios.get(`/api/v1/sessions/${id}`)
    .then(response => {
      return response.data
    })
    .catch(error => console.log(error))
}