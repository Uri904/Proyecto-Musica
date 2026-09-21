import { Component } from '@angular/core';
import { Cancion } from '../interfaces/cancion.interface';
import { MusicaService } from './musica.service';

@Component({
  imports: [],
  selector: 'app-musica',
  styleUrl: './musica.css',
  templateUrl: './musica.html',
})
export class Musica {

  canciones: Cancion[] = [];

  constructor(private musicaService: MusicaService) {
    this.canciones = this.musicaService.obtenerCanciones();
  }

}
