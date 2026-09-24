import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Registro } from './registro/registro';
import { authGuard } from './guards/auth-guard';
import { Registro } from './registro/registro';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'registro', component: Registro },
  { 
    path: 'musica', 
    loadComponent: () => import('./musica/musica').then(m => m.Musica),
    canActivate: [authGuard] 
  },
  { path: '**', redirectTo: '' }
];