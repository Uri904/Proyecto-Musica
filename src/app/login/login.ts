import { Component, inject, OnInit } from '@angular/core';
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
export class Login implements OnInit {
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

  ngOnInit(): void {
    // Si la sesión ya está activa en localStorage, redirige de inmediato a /musica
    if (this.sesionService.estaAutenticado()) {
      this.router.navigate(['/musica']);
    }
  }

  async iniciarSesion(): Promise<void> {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensaje = '';
    const { usuario, password } = this.formulario.getRawValue();

    // 1. Verificar si las credenciales coinciden con el Hash SHA-256 guardado localmente
    const esValidoLocal = await this.sesionService.validarCredencialesLocales(usuario, password);

    if (esValidoLocal) {
      this.sesionService.guardarToken('token_activo_sesion_' + Date.now());
      this.cargando = false;
      await this.router.navigate(['/musica']);
      return;
    }

    // 2. Si no coincide localmente, intentamos mediante el servicio/API
    this.usuarioService.iniciarSesion({ username: usuario, password }).subscribe({
      next: async (respuesta: any) => {
        try {
          const tokenRecibido = respuesta?.accessToken || respuesta?.token || respuesta?.access_token || 'token_activo_sesion';

          this.sesionService.guardarToken(tokenRecibido);
          await this.sesionService.guardarCredencialesPersistentes(usuario, password);
          await this.router.navigate(['/musica']);

          const hash = await this.sesionService.hashPassword(password);
          this.sesionService.descargarCredencialesTxt(usuario, hash);

        } catch (error) {
          console.error('Error durante el proceso de persistencia o navegación:', error);
          this.router.navigate(['/musica']);
        } finally {
          this.cargando = false;
        }
      },
      error: (err) => {
        console.error('Error devuelto por la API/Servidor al iniciar sesión:', err);
        this.mensaje = 'No se pudo iniciar sesión. Verifica tus credenciales.';
        this.cargando = false;
      },
    });
  }
}