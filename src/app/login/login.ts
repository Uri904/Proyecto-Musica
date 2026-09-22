import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../servicios/usuario';
import { SesionService } from '../servicios/sesion.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private readonly usuarioService = inject(Usuario);
  private readonly sesionService = inject(SesionService);
  private readonly router = inject(Router);

  readonly formulario = this.formBuilder.nonNullable.group({
    usuario: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  mensaje = '';
  cargando = false;

  iniciarSesion(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensaje = '';
    const { usuario, password } = this.formulario.getRawValue();

    this.usuarioService.iniciarSesion({ username: usuario, password }).subscribe({
      next: (respuesta) => {
      this.sesionService.guardarToken(respuesta.accessToken);
      this.router.navigate(['/musica']);
      },
      error: () => {
        this.mensaje = 'No se pudo iniciar sesión. Verifica tus datos.';
        this.cargando = false;
      },
    });
  }
}
