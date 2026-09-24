import { Routes } from '@angular/router';
import { Login } from './login/login';
import { authGuard } from './guards/auth-guard';
import { Registro } from './registro/registro';

export const routes: Routes = [
  { path: '', component: Login },
  // Ruta del Registro
  { path: 'registro', component: Registro },
  { 
    path: 'musica', 
    loadComponent: () => import('./musica/musica').then(m => m.Musica),
    canActivate: [authGuard] 
  },
  { path: '**', redirectTo: '' }
];