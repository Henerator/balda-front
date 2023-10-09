import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room.component';

const routes: Routes = [
  { path: ':id', component: RoomComponent },
  { path: '', pathMatch: 'full', redirectTo: '0' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomRoutingModule {}
