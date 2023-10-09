import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-field-cell',
  templateUrl: './field-cell.component.html',
  styleUrls: ['./field-cell.component.scss'],
})
export class FieldCellComponent {
  @Input() public value: string | null = null;
  @Input() public highlighted = false;
  @Input() public editable = false;

  @Output() letterSelected = new EventEmitter<void>();

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

  @HostListener('click')
  public onClick(): void {
    if (!this.value && this.editable && !this.isEditing) {
      this.control.reset();
      this.control.valueChanges.subscribe((value) => {
        // TODO: remove unsupported chars
        if (!value) return;

        this.value = value.substring(0, 1);
        this.isEditing = false;
        this.letterSelected.emit();
      });
      this.isEditing = true;
      setTimeout(() => {
        (this.input?.nativeElement as HTMLInputElement).focus();
      });
    }
  }

  public resetEditing(): void {
    this.isEditing = false;
  }
}
