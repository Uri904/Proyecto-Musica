import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
	LoginRequest,
	LoginResponse,
	RegistroResponse,
	Usuario as UsuarioModel,
} from '../interfaces/usuario.interface';

@Injectable({ providedIn: 'root' })
export class Usuario {
	private readonly http = inject(HttpClient);
	private readonly apiUrl = 'https://dummyjson.com';

	iniciarSesion(datos: LoginRequest): Observable<LoginResponse> {
		return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, datos);
	}

	registrar(datos: UsuarioModel): Observable<RegistroResponse> {
		const [firstName, ...lastNameParts] = datos.nombre.trim().split(' ');

		return this.http.post<RegistroResponse>(`${this.apiUrl}/users/add`, {
			firstName,
			lastName: lastNameParts.join(' '),
			email: datos.correo,
			username: datos.correo.split('@')[0],
			password: datos.password,
		});
	}
}
