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

  iniciarSesion(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensaje = '';
    const { usuario, password } = this.formulario.getRawValue();

    this.usuarioService.iniciarSesion({ username: usuario, password }).subscribe({
      next: async (respuesta: any) => {
        try {
          // 1. Extraer el token de la respuesta de la API
          const tokenRecibido = respuesta?.accessToken || respuesta?.token || respuesta?.access_token || 'token_activo_sesion';

          // 2. Guardar el token en el almacenamiento persistente (localStorage)
          this.sesionService.guardarToken(tokenRecibido);

          // 3. Guardar el usuario y la clave con Hash SHA-256 en localStorage
          await this.sesionService.guardarCredencialesPersistentes(usuario, password);

          // 4. Redirigir a la pantalla principal (/musica)
          await this.router.navigate(['/musica']);

          // 5. Generar y descargar el archivo .txt con el hash
          const hash = await this.sesionService.hashPassword(password);
          this.sesionService.descargarCredencialesTxt(usuario, hash);

        } catch (error) {
          console.error('Error durante el proceso de persistencia o navegación:', error);
          // Asegura la navegación en caso de error secundario con el hash o txt
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