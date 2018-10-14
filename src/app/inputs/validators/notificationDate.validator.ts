import {
  FormControl,
  ValidatorFn
} from '@angular/forms';
import * as helpers from './helper';

export function notificationDateValidator(dateSeparator): ValidatorFn {
  return (control: FormControl): { [key: string]: boolean } | null => {
    const date = control.value.split(dateSeparator);
    const monthWord = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    if (date.length !== 3) {
      return {
        'lengthError': true
      };
    }
    if (date[2].split('').length > 2) {
      return {
        'notValidYear': true
      };
    }
    if (monthWord.indexOf(date[1].toLowerCase()) === -1) {
      return {
        'monthError': true
      };
    } else {
      const day = parseInt(date[0]);
      const month = monthWord.indexOf(date[1].toLowerCase()) + 1;
      const year = parseInt(date[2]);

      if (!helpers.isValidDateFormat(day, month, year)) {
        return {
          'notNumberDate': true
        };
      }

      if (!helpers.isValidNumberOfDays(day, month, year)) {
        return {
          'notSuchDate': true
        };
      }

      if (helpers.isFebruary(month)) {
        if (!helpers.isValidFebruary(day, month, year)) {
          return {
            'leapYear': true
          };
        }
      }

      return null;
    }
  };
}
