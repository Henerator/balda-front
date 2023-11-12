import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() public id = 'checkbox-id';
  @Input() public label = '';

  @Input() public set checked(value: boolean) {
    this.setValue(value);
  }

  public control = new FormControl<boolean>(false);

  public onChange!: (value: boolean) => void;
  public onTouched!: () => void;

  private changeSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.changeSubscription = this.control.valueChanges.subscribe((value) => {
      this.onChange(!!value);
    });
  }

  ngOnDestroy(): void {
    this.changeSubscription?.unsubscribe();
  }

  writeValue(value: boolean): void {
    this.setValue(value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private setValue(value: boolean) {
    this.control.setValue(value, { emitEvent: false });
  }
}
