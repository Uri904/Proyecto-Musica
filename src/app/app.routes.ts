import { Routes } from '@angular/router';
import { Login } from './login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Login },
  { 
    path: 'musica', 
    loadComponent: () => import('./musica/musica').then(m => m.Musica),
    canActivate: [authGuard] 
  },
  { path: '**', redirectTo: '' }
];