import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { SelectOption } from './select-option.interface';
import { SelectValue } from './select-value.type';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() public id = 'select-id';
  @Input() public label = '';
  @Input() public options: SelectOption[] = [];

  public control = new FormControl<SelectValue>(null);
  public selectedOption: SelectOption | null = null;
  public opened = false;

  public onChange!: (value: SelectValue) => void;
  public onTouched!: () => void;

  private changeSubscription: Subscription | null = null;
  private hostElement = this.elementRef.nativeElement as HTMLElement;

  @HostListener('document:click', ['$event'])
  clickoutside(event: MouseEvent) {
    if (!this.opened) return;

    if (!this.hostElement.contains(event.target as HTMLElement)) {
      this.closeDropown();
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.changeSubscription = this.control.valueChanges.subscribe(
      (value: SelectValue) => {
        this.onChange(value);
      }
    );
  }

  ngOnDestroy(): void {
    this.changeSubscription?.unsubscribe();
  }

  writeValue(value: SelectValue): void {
    this.setValue(value, false);
  }

  registerOnChange(fn: (value: SelectValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  trackByFn(_index: number, option: SelectOption): string {
    return option.name;
  }

  onSelectOption(option: SelectOption): void {
    this.setValue(option.value);
    this.closeDropown();
  }

  toggleDropdown(): void {
    this.opened = !this.opened;
  }

  closeDropown(): void {
    this.opened = false;
  }

  private setValue(value: SelectValue, emitEvent = true) {
    this.selectedOption = this.findOptionByValue(value);
    this.control.setValue(value, { emitEvent });
  }

  private findOptionByValue(value: SelectValue): SelectOption | null {
    if (value === null) return null;
    return this.options.find((option) => option.value === value) ?? null;
  }
}
