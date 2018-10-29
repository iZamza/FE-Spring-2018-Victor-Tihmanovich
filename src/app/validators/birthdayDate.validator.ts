import {
  FormControl,
  ValidatorFn
} from '@angular/forms';
import * as helpers from './helper';

export function birthdayDateValidator(dateSeparator): ValidatorFn {
  return (control: FormControl): { [key: string]: boolean } | null => {
    const date = control.value.split(dateSeparator);

    if (date.length !== 3) {
      return {
        'lengthError': true
      };
    } else {
      const day = parseInt(date[2]);
      const month = parseInt(date[1]);
      const year = parseInt(date[0]);

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
