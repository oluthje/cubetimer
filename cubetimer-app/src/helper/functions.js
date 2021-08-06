export const formatCubeTime = (ms) => {
  const milliSeconds = `${Math.floor(ms % 1000)}`.slice(0, 2)
  const seconds = `${Math.floor(ms / 1000)}`
  const getSeconds = `0${(seconds % 60)}`.slice(-2)
  const minutes = `${Math.floor(seconds / 60)}`
  const getMinutes = `0${minutes % 60}`.slice(-2)

  return `${getMinutes} : ${getSeconds} . ${milliSeconds}`
}