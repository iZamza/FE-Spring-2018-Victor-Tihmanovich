function isValidDateFormat(day: number, month: number, year: number): boolean {
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return false;
  }

  return true;
}

function isValidNumberOfDays(day: number, month: number, year: number): boolean {
  const month31Days = [1, 3, 5, 7, 8, 10, 12];
  const month30Days = [4, 6, 9, 11];

  if (((day < 1 || day > 31) || (month < 1 || month > 12) || (year < 1 || year > 9999)) ||
    (month31Days.includes(month) && day > 31) || (month30Days.includes(month) && day > 30)) {
    return false;
  }

  return true;
}

function isValidFebruary(day: number, month: number, year: number): boolean {
  if (((year % 4) === 0 && (year % 100) !== 0) || ((year % 400) === 0 && (year % 100) === 0)) {
    if (day > 29) {
      return false;
    }
  } else if (day > 28) {
    return false;
  }

  return true;
}

function isFebruary(month: number): boolean {
  if (month === 2) {
    return true;
  }

  return false;
}

export {
  isValidDateFormat,
  isValidNumberOfDays,
  isValidFebruary,
  isFebruary
};
