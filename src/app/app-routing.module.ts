import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoomComponent } from './features/create-room/create-room.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'create',
  },
  {
    path: 'create',
    component: CreateRoomComponent,
  },
  {
    path: 'room',
    loadChildren: () =>
      import('./features/room/room.module').then((m) => m.RoomModule),
  },
  {
    path: '**',
    redirectTo: 'create',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
