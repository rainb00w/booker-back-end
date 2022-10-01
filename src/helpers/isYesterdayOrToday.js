function createTodayUTC() {
    const dateObject = new Date()
    const UTC = new Date(dateObject.getUTCFullYear(),
              dateObject.getUTCMonth(), dateObject.getUTCDate(),
              0, 0, 0, 0);
   return UTC;
}

function isYesterdayOrToday(date) {
    const yesterday = createTodayUTC().setDate(createTodayUTC().getDate() - 1)
    const compareDate = new Date(date)
    if (yesterday <= compareDate.getTime()) {
        return true
    }
    return false
}

module.exports = isYesterdayOrToday