import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterNamePageRoutingModule } from './enter-name-routing.module';

import { EnterNamePage } from './enter-name.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterNamePageRoutingModule
  ],
  declarations: [EnterNamePage]
})
export class EnterNamePageModule {}
