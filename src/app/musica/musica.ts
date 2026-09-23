import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-musica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './musica.html',
  styleUrls: ['./musica.css']
})
export class Musica {
  private readonly sesionService = inject(SesionService);
  private readonly router = inject(Router);

  // Variables existentes
  consulta = '';
  buscando = false;
  mensaje = '';
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