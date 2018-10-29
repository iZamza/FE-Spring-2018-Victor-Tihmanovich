import {
  FormControl
} from '@angular/forms';

export function nameValidator(control: FormControl): Promise<{ [key: string]: boolean } | null> {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      const value = control.value;
      const result = value.split(' ');
      const invalidSymbols = /^[A-Za-z_\s]+$/;

      if (result.length > 2) {
        resolve({
          'moreThenMaxWords': true
        });
      } else if (!value.match(invalidSymbols)) {
        resolve({
          'forbiddenSymbols': true
        });
      }
      resolve(null);
    }, 3000);
  });
}
