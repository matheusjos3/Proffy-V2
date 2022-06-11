export default function convertMinutesToHours(minute: number) {
    const formatNumber = (num: number) => num < 10 ? `0${num}` : num

    const hour = formatNumber(Math.floor(minute / 60))
    const minutes = formatNumber(Math.floor(minute % 60))
    const converted = `${hour}:${minutes}`

    return converted
}