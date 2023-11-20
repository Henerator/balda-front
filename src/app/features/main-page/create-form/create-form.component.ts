import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectOption } from '@shared/controls/select/select-option.interface';
import { CreateRoomDto } from '@shared/room-api/create-room-dto.interface';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent {
  @Output() formSubmit = new EventEmitter<CreateRoomDto>();

  public createForm = new FormGroup({
    size: new FormControl<number>(5),
    allowDiagonalLetter: new FormControl<boolean>(false),
    allowDuplicateLetter: new FormControl<boolean>(false),
  });

  public sizeOptions: SelectOption[] = [
    {
      name: '5x5 ячеек',
      value: 5,
    },
    {
      name: '6x6 ячеек',
      value: 6,
    },
  ];
}
