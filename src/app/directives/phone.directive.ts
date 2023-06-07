import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhone]',
  standalone: true,
})
export class PhoneDirective {
    @HostListener("input", ["$event.target"])
    handleInput(target: HTMLInputElement){
        let newValue = target.value.replace(/[^\+\s0-9]/g,'')
        if (newValue.length > 20) {newValue = newValue.slice(0, -1)}
        target.value = newValue
    }
}
