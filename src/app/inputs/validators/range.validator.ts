import { FormControl, ValidatorFn } from '@angular/forms';


export function rangeValidator(min: number, max: number): ValidatorFn {
 return (control: FormControl): { [key: string]: boolean} | null => {
 if (control.value < min || control.value > max) {
  return { 'rangeError': true };
   }
   return null;
 };
}
