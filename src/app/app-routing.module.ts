import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'create',
    loadChildren: () =>
      import('./features/create-room/create-room.module').then(
        (m) => m.CreateRoomModule
      ),
  },
  {
    path: 'room',
    loadChildren: () =>
      import('./features/room/room.module').then((m) => m.RoomModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'create',
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
