import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'room',
    loadChildren: () =>
      import('./features/room/room.module').then((m) => m.RoomModule),
  },
  {
    path: '404',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./features/main-page/main-page.module').then(
        (m) => m.MainPageModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
