import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './service/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'load-game',
    pathMatch: 'full'
  },
  {
    path: 'load-game',
    loadChildren: () => import('./pages/load-game/load-game.module').then( m => m.LoadGamePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'submit/:id',
    loadChildren: () => import('./pages/load-game/load-game.module').then( m => m.LoadGamePageModule)
  },
  {
    path: 'play/:id',
    loadChildren: () => import('./pages/load-game/load-game.module').then( m => m.LoadGamePageModule)
  },
  {
    path: 'enter-name',
    loadChildren: () => import('./pages/enter-name/enter-name.module').then( m => m.EnterNamePageModule)
  },
  {
    path: 'lobby',
    loadChildren: () => import('./pages/lobby/lobby.module').then( m => m.LobbyPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
