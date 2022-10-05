function createTodayUTC() {
    const myDate = new Date()
    const now = new Date(Date.UTC(myDate.getFullYear(),myDate.getMonth(), myDate.getDate()))
   return now;
}

function isYesterdayOrToday(date) {
    const now = new Date()
    const yesterday = now.setDate(now.getDate() - 1)
    const yesterdayAm = new Date(yesterday).setHours(0, 0, 0, 0)
    const compareDate = Date.parse(date)
    if (yesterdayAm <= compareDate) {
        return true
    }
    return false
}

module.exports = { isYesterdayOrToday, createTodayUTC }