import moment from 'moment'
import 'moment/locale/vi'

moment.locale('vi')

export default (date) => moment.unix(date).format('MMMM Do, YYYY LT')

export const timeAgo = (timestampSeconds) => {
  if (!timestampSeconds) {
    return undefined
  }

  // timeData type must be a number
  return moment(timestampSeconds * 1000).fromNow()
}

export const timeAgoFromDatetime = (datetime) => {
  // datetime type must be a Datetime object
  return moment(datetime).fromNow()
}

export const formatDateTime = (timeData) => {
  if (!timeData) {
    return undefined
  }

  const DATE_FORMAT = 'dddd, L LT'

  if (typeof timeData === 'string') return moment(timeData).format(DATE_FORMAT)

  if (!Number.isNaN(timeData)) return moment.unix(timeData).format(DATE_FORMAT)

  return timeData
}

export const isoDatetime = (timeData) => {
  if (!timeData) {
    return undefined
  }

  if (typeof timeData === 'string') return moment(timeData).toISOString()

  if (!Number.isNaN(timeData)) return moment.unix(timeData).toISOString()

  return timeData
}

export const formatDate = (timeData) => {
  if (typeof timeData === 'string')
    return timeData ? moment(timeData).format('MMM DD, YYYY') : undefined
  if (!Number.isNaN(timeData))
    return moment.unix(timeData).format('MMMM Do, YYYY LT')
  return timeData
}

export const datetime2Timestamp = (datetime) => {
  return moment(datetime).format('X')
}
