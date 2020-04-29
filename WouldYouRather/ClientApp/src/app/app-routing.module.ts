import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './service/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'submit/:id',
    loadChildren: () => import('./auth/load-game/load-game.module').then( m => m.LoadGamePageModule)
  },
  {
    path: 'play/:id',
    loadChildren: () => import('./auth/load-game/load-game.module').then( m => m.LoadGamePageModule)
  },
  {
    path: 'no-game',
    loadChildren: () => import('./auth/no-game/no-game.module').then( m => m.NoGamePageModule)
  },
  {
    path: '',
    redirectTo: '/submit/nogame',
    pathMatch: 'full'
  },
  {
    path: 'enter-name',
    loadChildren: () => import('./auth/enter-name/enter-name.module').then( m => m.EnterNamePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
