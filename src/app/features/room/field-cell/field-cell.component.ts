import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-field-cell',
  templateUrl: './field-cell.component.html',
  styleUrls: ['./field-cell.component.scss'],
})
export class FieldCellComponent implements OnDestroy {
  @Input() public value: string | null = null;
  @Input() public editable = false;

  @HostBinding('class.highlighted')
  @Input()
  public highlighted = false;

  @Output() letterChanged = new EventEmitter<string>();

  @ViewChild('input')
  public input: ElementRef | null = null;

  public isEditing = false;
  public control = new FormControl('');

  @HostBinding('class.editable')
  get canSetValue() {
    return this.editable && !this.value;
  }

  @HostBinding('class.filled')
  get filled() {
    return Boolean(this.value);
  }

  private changeSubscription?: Subscription;

  ngOnDestroy(): void {
    this.changeSubscription?.unsubscribe();
  }

  @HostListener('click')
  public onClick(): void {
    if (!this.value && this.editable && !this.isEditing) {
      this.control.reset();

      this.changeSubscription?.unsubscribe();
      this.changeSubscription = this.control.valueChanges.subscribe((value) => {
        // TODO: remove unsupported chars
        if (!value) return;

        const letter = value.substring(0, 1);
        this.isEditing = false;
        this.letterChanged.emit(letter);
      });
      this.isEditing = true;
      this.focusInput();
    }
  }

  public resetEditing(): void {
    this.isEditing = false;
  }

  private focusInput(): void {
    setTimeout(() => (this.input?.nativeElement as HTMLInputElement).focus());
  }
}