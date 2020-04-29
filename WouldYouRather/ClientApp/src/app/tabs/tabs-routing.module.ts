import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'play',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/play/play.module').then(m => m.PlayPageModule)
          }
        ]
      },
      {
        path: 'submit',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/submit/submit.module').then(m => m.SubmitPageModule)
          }
        ]
      },
      {
        path: 'players',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/players/players.module').then(m => m.PlayersPageModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/submit',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
