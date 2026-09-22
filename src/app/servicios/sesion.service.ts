import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SesionService{
      private accessToken = '';
      
        constructor() {
    console.log('SesionService creado');
  }

  guardarToken(token: string): void {
    this.accessToken = token;
        console.log('Token guardado:', this.accessToken);
  }

  obtenerToken(): string {
        console.log('Token obtenido:', this.accessToken);
    return this.accessToken;
    
  }

  cerrarSesion(): void {
    this.accessToken = '';
  }
}