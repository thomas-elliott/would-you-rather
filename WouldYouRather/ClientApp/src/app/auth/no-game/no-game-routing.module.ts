import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoGamePage } from './no-game.page';

const routes: Routes = [
  {
    path: '',
    component: NoGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoGamePageRoutingModule {}
