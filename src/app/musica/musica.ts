import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cancion } from '../interfaces/cancion.interface';
import { MusicaService } from './musica.service';
import { SesionService } from '../servicios/sesion.service';

@Component({
  imports: [FormsModule],
  selector: 'app-musica',
  styleUrl: './musica.css',
  templateUrl: './musica.html',
})
export class Musica {
  private readonly sesionService = inject(SesionService);

ngOnInit() {
  console.log(
    'Token en música:',
    this.sesionService.obtenerToken()
  );
}

  private musicaService = inject(MusicaService);

  canciones: Cancion[] = this.musicaService.obtenerCanciones();
  consulta = '';
  buscando = false;
  mensaje = '';

  buscarEnSpotify(): void {
    if (!this.consulta.trim()) {
      this.mensaje = 'Escribe una canción o artista para buscar.';
      return;
    }

    this.buscando = true;
    this.mensaje = '';
    this.musicaService.buscarEnSpotify(this.consulta.trim()).subscribe({
      next: (canciones) => {
        this.canciones = canciones;
        this.buscando = false;
      },
      error: () => {
        this.mensaje = 'No se pudo consultar Spotify. Revisa tu access token.';
        this.buscando = false;
      },
    });
  }

}
