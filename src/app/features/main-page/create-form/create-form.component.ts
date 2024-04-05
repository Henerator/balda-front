import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StorageService } from '@core/storage/storage.service';
import { SelectOption } from '@shared/controls/select/select-option.interface';
import { CreateRoomDto } from '@shared/room-api/create-room-dto.interface';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<CreateRoomDto>();

  public createForm = new FormGroup({
    size: new FormControl<number>(5),
    allowDiagonalLetter: new FormControl<boolean>(false),
    allowDuplicateLetter: new FormControl<boolean>(false),
  });

  public sizeOptions: SelectOption[] = [
    {
      name: '3x3 ячейки',
      value: 3,
    },
    {
      name: '4x4 ячейки',
      value: 4,
    },
    {
      name: '5x5 ячеек',
      value: 5,
    },
    {
      name: '6x6 ячеек',
      value: 6,
    },
    {
      name: '7x7 ячеек',
      value: 7,
    },
    {
      name: '8x8 ячеек',
      value: 8,
    },
    {
      name: '9x9 ячеек',
      value: 9,
    },
    {
      name: '10x10 ячеек',
      value: 10,
    },
  ];

  private readonly storageKey = 'roomSettings';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.restoreSavedSettings();
  }

  public onSubmit(): void {
    const settings = this.createForm.value as CreateRoomDto;
    this.saveSettings(settings);
    this.formSubmit.emit(settings);
  }

  private saveSettings(settings: CreateRoomDto): void {
    this.storageService.setObject<CreateRoomDto>(this.storageKey, settings);
  }

  private restoreSavedSettings(): void {
    const roomSettings = this.storageService.getObject<CreateRoomDto>(
      this.storageKey
    );

    if (roomSettings) {
      this.createForm.setValue(roomSettings);
    }
  }
}
