import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './service/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
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
