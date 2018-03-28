/**
 * set month and date by originDate and return new date
 *
 * @param {Date} originDate originDate
 * @param {number} monthNumber
 * @param {number} dateNumber
 */
function setMonthAndDate(originDate, monthNumber, dateNumber) {

  var _ = new Date(new Date(originDate).setMonth(monthNumber));
  return new Date(_.setDate(dateNumber));
}

/**
 * @param {number} year year
 */
function getMonthsCount(year) {

  var MONTHS_COUNT = [31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year % 4 === 0 && year % 100 !== 0) {
    MONTHS_COUNT.unshift(31, 29);
  } else {
    MONTHS_COUNT.unshift(31, 28);
  }
  return MONTHS_COUNT;
}

function addDate(originDate, incNumber) {

  return new Date(new Date(originDate).setDate(originDate.getDate() + incNumber));
}

/**
 * add
 * @param {number[]} nums 
 */
function sum(nums) {

  if (arguments.length === 0) {
    return 0;
  }
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

/**
 * compute iso week num
 *
 * @param {Date} date 日期
 * @return {number}
 */
module.exports = function IsoWeekNum(date) {
  // 只需要年、月、日，舍去其他部分以免影响结果
  date = setMonthAndDate(date, date.getMonth(), date.getDate());
  // 先查看第一天是否是第一星期的
  var MONTH_DATE_COUNT = getMonthsCount(date.getFullYear());
  var _firstDayOfCurrentYear = setMonthAndDate(date, 0, 1);
  var _firstDayWeekday = _firstDayOfCurrentYear.getDay();
  /** @type {Date} */
  var date_firstWeekCurrentYear;
  if (_firstDayWeekday > 4 || _firstDayWeekday === 0) {
    // 第一周不属于今年
    // 先找到今年第一周的那一天
    if (_firstDayWeekday === 0) {
      date_firstWeekCurrentYear = addDate(_firstDayOfCurrentYear, 1);
    }
    else {
      date_firstWeekCurrentYear = addDate(_firstDayOfCurrentYear, 8 - _firstDayWeekday);
    }
    // 判断当前date是否属于第一周所在天之前
    if (date.getMonth() === 0 && date.getDate() < date_firstWeekCurrentYear.getDate()) {
      // 这里需要先到上一年，计算此date的周数
      // 注意，不需要继续递归！
      var _firstDayOfLastYear = new Date(date.getFullYear() - 1, 0, 1);
      var _firstDayWeekdayOfLastYear = _firstDayOfLastYear.getDay();
      /** @type {Date} */
      var date_firstWeekLastYear;
      if (_firstDayWeekdayOfLastYear > 4 || _firstDayWeekdayOfLastYear === 0) {
        if (_firstDayWeekdayOfLastYear === 0) {
          date_firstWeekLastYear = addDate(_firstDayOfLastYear, 1);
        }
        else {
          date_firstWeekLastYear = addDate(_firstDayOfLastYear, 8 - _firstDayWeekdayOfLastYear);
        }
      }
      var count = sum.apply(null, getMonthsCount(date.getFullYear() - 1).slice(0, 12));
      count += date.getDate();
      if (date_firstWeekLastYear) {
        count -= date_firstWeekLastYear.getDate();
      }
      var _r_week = count / 7;
      if (('' + _r_week).indexOf('.') !== -1) {
        return parseInt(_r_week) + 1;
      }
      else {
        return parseInt(_r_week);
      }
    }
  }
  var m = date.getMonth();
  var count = sum.apply(null, MONTH_DATE_COUNT.slice(0, m));
  count += date.getDate();
  if (date_firstWeekCurrentYear) {
    count = count - date_firstWeekCurrentYear.getDate() + 1;
  }
  var _r_week = count / 7;
  if (('' + _r_week).indexOf('.') !== -1) {
    return parseInt(_r_week) + 1;
  }
  else {
    return parseInt(_r_week);
  }
}
