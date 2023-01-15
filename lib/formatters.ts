import formatDuration from 'format-duration'

export const formateTime = (timeInSecs = 0) => {
  return formatDuration(timeInSecs * 1000)
}

export const formateDate = (date: Date) => {
  return date.toLocaleDateString('en-Us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
