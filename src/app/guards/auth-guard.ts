import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { SesionService } from '../servicios/sesion.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sesionService = inject(SesionService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Si se está ejecutando en el Servidor (SSR) durante el renderizado inicial,
  // permitimos la navegación para que el navegador reciba la app y lea el localStorage.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // Si estamos en el Navegador, verificamos si hay sesión persistente
  const autenticado = sesionService.estaAutenticado();
  console.log('¿Sesión activa detectada en el navegador?:', autenticado);

  if (autenticado) {
    return true; // Mantiene al usuario en /musica
  }

  // Si realmente no hay sesión en localStorage, redirige al Login
  return router.createUrlTree(['/']);
};