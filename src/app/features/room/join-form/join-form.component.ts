import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JoinForm } from './models/join-form.interface';

@Component({
  selector: 'app-join-form',
  templateUrl: './join-form.component.html',
  styleUrls: ['./join-form.component.scss'],
})
export class JoinFormComponent {
  @Output() formSubmit = new EventEmitter<JoinForm>();

  public joinForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
  });

  onSubmit(): void {
    if (this.joinForm.invalid) return;

    this.formSubmit.emit(this.joinForm.value as JoinForm);
  }
}
