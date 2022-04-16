export default function convertMinutesToHours(v: number) {
    const timeInHours = v / 60

    return Math.floor(timeInHours)
}