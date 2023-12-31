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
      name: '5x5 ячеек',
      value: 5,
    },
    {
      name: '6x6 ячеек',
      value: 6,
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
