export const formatCubeTime = (ms) => {
  const centiSeconds = `${Math.floor(ms % 1000)}`.slice(0, 2)
  const seconds = `${Math.floor(ms / 1000)}`
  const getSeconds = `${(seconds % 60)}`.slice(-2)
  const minutes = `${Math.floor(seconds / 60)}`
  const getMinutes = `${minutes % 60}`.slice(-2)

  if (Number(getMinutes) === 0) {
    return `${getSeconds} . ${centiSeconds}`
  }
  return `${getMinutes} : ${getSeconds} . ${centiSeconds}`
}