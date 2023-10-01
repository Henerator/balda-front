import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WindowModule } from '@core/window/window.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateRoomComponent } from './features/create-room/create-room.component';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, WindowModule],
  declarations: [AppComponent, CreateRoomComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
