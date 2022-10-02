function createTodayUTC() {
    const myDate = new Date()
    const now = new Date(Date.UTC(myDate.getFullYear(),myDate.getMonth(), myDate.getDate()))
   return now;
}

function isYesterdayOrToday(date) {
    const yesterday = createTodayUTC().setDate(createTodayUTC().getDate() - 1)
    const compareDate = Date.parse(date)
    if (yesterday <= compareDate) {
        return true
    }
    return false
}

module.exports = { isYesterdayOrToday, createTodayUTC }