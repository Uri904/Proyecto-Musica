import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../servicios/usuario';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {
  private readonly formBuilder = inject(FormBuilder);
  private readonly usuarioService = inject(Usuario);
  private readonly router = inject(Router);

  readonly formulario = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmarPassword: ['', Validators.required],
  });
  mensaje = '';
  cargando = false;

  crearCuenta(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos = this.formulario.getRawValue();
    if (datos.password !== datos.confirmarPassword) {
      this.mensaje = 'Las contraseñas no coinciden.';
      return;
    }

    this.cargando = true;
    this.mensaje = '';
    this.usuarioService.registrar(datos).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.mensaje = 'No se pudo crear la cuenta. Intenta de nuevo.';
        this.cargando = false;
      },
    });
  }
}
