import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterNamePage } from './enter-name.page';

const routes: Routes = [
  {
    path: '',
    component: EnterNamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterNamePageRoutingModule {}
