import { AbstractControl } from '@angular/forms';


export function numberValidator(control: AbstractControl): { [key: string]: boolean } | null {
 if (isNaN(control.value)) {
  return { 'numberError': true };
 }

 return null;
}
