import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRoomDto } from './create-room-dto.interface';
import { Room } from './room.interface';
import { environment } from '@env/environment';

@Injectable()
export class RoomApiService {
  private readonly apiPath = `${environment.apiUrl}/room/create`;

  constructor(private httpClient: HttpClient) {}

  public createRoom(dto: CreateRoomDto): Observable<Room> {
    return this.httpClient.post<Room>(this.apiPath, dto);
  }
}
