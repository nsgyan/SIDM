
import { AbstractControl } from '@angular/forms';


export function PasswordValidation(
  control: AbstractControl
): { [key: string]: any } | null {
  const text = new RegExp('^(?=.*?[A-Z])(?=.*[@$!%*#?&])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
  const valid = text.test(control.value)
  if (!valid) {
    return {
      passwordNotValid: ' Password should have atleast  1 lowercase,  1 uppercase,  1 Special Character, 1 number & 8 character long'
    };
  } else {
    return null;
  }

}
export function CellNumValidation(
  control: AbstractControl
): { [key: string]: any } | null {
  const text = new RegExp('^((\\+91-?)|0)?[0-9]{10}$');
  const valid = text.test(control.value);

  if (!valid) {
    return { cellNumNotValid: 'Mobile Number should be 10 digit  long' };
  } else {
    return null;
  }
}

export function panValidation(
  control: AbstractControl
): { [key: string]: any } | null {
  const text = new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}');
  const valid = text.test(control.value);

  if (!valid) {
    return { cellNumNotValid: 'please enter valid pan number' };
  } else {
    return null;
  }
}