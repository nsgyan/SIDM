
import { AbstractControl, FormGroup } from '@angular/forms';


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
    return { panValidation: 'please enter valid pan number' };
  } else {
    return null;
  }
}
export function fileSizeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const file: File = control.value
  var size = file.size
  console.log(size);
  let forbidden = true
  if (file) {
    const fileSizeInMB = Math.round(size / 1024);
    if (fileSizeInMB < 1024) {
      //console.log('less than 1024', fileSizeInMB);
      forbidden = false;
    }

  }
  return forbidden ? { 'inValidSize': true } : null;
}
export function CrossEmailValidation(
  control: AbstractControl
): { [key: string]: any } | null {
  const email = control.get('email');
  const confirmEmail = control.get('confirmEmail');

  if (email?.pristine && confirmEmail?.pristine) {
    return null;
  }

  if (email && confirmEmail && email.value !== confirmEmail.value) {
    console.log('hello');


    return { crossEmailNotValid: 'email\'s don\'t match.' };
  } else {
    return null;
  }
}
export function CrossMobileValidation(
  control: AbstractControl
): { [key: string]: any } | null {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls['mobileNumber'];
    const matchingControl = formGroup.controls['confirmMobileNumber'];
    if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
export function CrossPanValidation(
  control: AbstractControl
): { [key: string]: any } | null {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls['panNumberOfOrganization'];
    const matchingControl = formGroup.controls['confirmPanNumberOfOrganization'];
    if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}


export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
export function Confirmed(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}