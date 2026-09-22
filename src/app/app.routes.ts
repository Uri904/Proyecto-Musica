import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Musica } from './musica/musica';
import { Registro } from './registro/registro';

export const routes: Routes = [
	{ path: '', component: Login },
	{ path: 'registro', component: Registro },
	{ path: 'musica', component: Musica },
	{ path: '**', redirectTo: '' },
];
