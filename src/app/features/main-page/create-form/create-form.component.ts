import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StorageService } from '@core/storage/storage.service';
import { CreateRoomDto } from '@shared/room-api/create-room-dto.interface';
import { defaultSettings } from './default-settings.const';
import { repeatLimitOptions } from './repeat-limit-options.const';
import { sizeOptions } from './size-options.const';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<CreateRoomDto>();

  public createForm = new FormGroup({
    size: new FormControl<number>(defaultSettings.size),
    repeatLimit: new FormControl<number>(defaultSettings.repeatLimit),
    allowDiagonalLetter: new FormControl<boolean>(
      defaultSettings.allowDiagonalLetter
    ),
    allowDuplicateLetter: new FormControl<boolean>(
      defaultSettings.allowDuplicateLetter
    ),
  });

  public sizeOptions = sizeOptions;
  public repeatLimitOptions = repeatLimitOptions;

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
      const settings = this.fillMissedSettings(roomSettings);
      this.createForm.setValue(settings);
    }
  }

  private fillMissedSettings(settings: CreateRoomDto): CreateRoomDto {
    return {
      ...defaultSettings,
      ...settings,
    };
  }
}
