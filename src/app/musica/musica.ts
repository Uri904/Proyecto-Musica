import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-musica',
  standalone: true,
  templateUrl: './musica.html',
  styleUrls: ['./musica.css']
})
export class Musica {
  private readonly sesionService = inject(SesionService);
  private readonly router = inject(Router);

  canciones: any[] = [];
  
  // Estado para mostrar/ocultar el menú flotante
  menuAbierto = false;

  // Alternar el estado del menú flotante al hacer clic en el icono
  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  // Cerrar el menú si el usuario da clic fuera o ejecuta una acción
  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  // Método para cerrar sesión y limpiar localStorage
  salir(): void {
    this.sesionService.cerrarSesion();
    this.router.navigate(['/']);
  }
}