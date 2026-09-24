import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../servicios/usuario';
import { SesionService } from '../servicios/sesion.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {
  private readonly formBuilder = inject(FormBuilder);
  private readonly usuarioService = inject(Usuario);
  private readonly sesionService = inject(SesionService);
  private readonly router = inject(Router);

  readonly formulario = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmarPassword: ['', Validators.required],
  });
  mensaje = '';
  cargando = false;

  async crearCuenta(): Promise<void> {
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
      next: async () => {
        // 1. Guardar credenciales con Hash256 en localStorage
        const hash = await this.sesionService.guardarCredencialesPersistentes(datos.correo, datos.password);
        
        // 2. Descargar el archivo .txt con el usuario y el Hash
        this.sesionService.descargarCredencialesTxt(datos.correo, hash);

        // 3. Redirigir al login
        this.router.navigate(['/']);
      },
      error: () => {
        this.mensaje = 'No se pudo crear la cuenta. Intenta de nuevo.';
        this.cargando = false;
      },
    });
  }
}