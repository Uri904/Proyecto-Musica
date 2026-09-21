import { Component, inject } from '@angular/core';
import { Cancion } from '../interfaces/cancion.interface';
import { MusicaService } from './musica.service';

@Component({
  imports: [],
  selector: 'app-musica',
  styleUrl: './musica.css',
  templateUrl: './musica.html',
})
export class Musica {

  private musicaService = inject(MusicaService);

  canciones: Cancion[] = this.musicaService.obtenerCanciones();

}
