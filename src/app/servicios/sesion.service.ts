import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router'; // 👈 Importar Router

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private isBrowser: boolean;
  private router = inject(Router); // 👈 Inyectar Router

  constructor() {
    const platformId = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  guardarToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('access_token', token);
    }
  }

  obtenerToken(): string {
    if (this.isBrowser) {
      return localStorage.getItem('access_token') || '';
    }
    return '';
  }

  estaAutenticado(): boolean {
    if (!this.isBrowser) return false;

    const token = localStorage.getItem('access_token');

    // IMPORTANTE: La sesión sólo está activa si existe un token válido en localStorage
    return !!token && token !== 'undefined' && token !== 'null' && token.trim() !== '';
  }

  cerrarSesion(): void {
    if (this.isBrowser) {
      // 1. Eliminamos únicamente el token activo
      localStorage.removeItem('access_token');

      // 2. Redirigimos al usuario a la pantalla de Login
      this.router.navigate(['/']);
    }
  }

  // --- HASH Y PERSISTENCIA TXT ---
  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async guardarCredencialesPersistentes(usuario: string, clavePlana: string): Promise<string> {
    if (!this.isBrowser) return '';

    const passwordHash = await this.hashPassword(clavePlana);
    const datosPersistentes = {
      usuario,
      passwordHash,
      fechaGuardado: new Date().toISOString()
    };

    localStorage.setItem('usuario_persistencia', JSON.stringify(datosPersistentes));
    return passwordHash;
  }

  async validarCredencialesLocales(usuarioInput: string, claveInput: string): Promise<boolean> {
    if (!this.isBrowser) return false;

    const datosGuardados = localStorage.getItem('usuario_persistencia');
    if (!datosGuardados) return false;

    try {
      const { usuario, passwordHash } = JSON.parse(datosGuardados);
      const hashInput = await this.hashPassword(claveInput);

      return usuario.toLowerCase() === usuarioInput.toLowerCase() && passwordHash === hashInput;
    } catch (error) {
      console.error('Error al validar credenciales locales:', error);
      return false;
    }
  }

  descargarCredencialesTxt(usuario: string, passwordHash: string): void {
    if (!this.isBrowser) return;

    const contenido = `Usuario: ${usuario}\nHash256: ${passwordHash}`;
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);

    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = `${usuario}_credenciales.txt`;
    enlace.click();

    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  }
}