import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLowercase]'
})
export class LowercaseDirective {
  @HostListener('input', ['$event']) onInput(event: { target: { value: string; }; }) {
    event.target.value = event.target.value.toLowerCase();
    return true;
  }
}
