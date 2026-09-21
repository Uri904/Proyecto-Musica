import { Injectable } from '@angular/core';
import { Cancion } from '../interfaces/cancion.interface';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {

  private canciones: Cancion[] = [
    {
      id: 1,
      titulo: 'ni pedo',
      artista: 'Peso Pluma, Tito Double P',
      imagen: 'img/ni-pedo.jpg',
      reproducciones: 150
    },
    {
      id: 2,
      titulo: 'Bien Bebé',
      artista: 'El Malilla',
      imagen: 'img/bien-bebe.jpg',
      reproducciones: 120
    },
    {
      id: 3,
      titulo: 'Quisiera Saber',
      artista: 'Los Daniels, Natalia Lafourcade',
      imagen: 'img/quisiera-saber.jpg',
      reproducciones: 100
    }
  ];

  obtenerCanciones(): Cancion[] {
    return this.canciones;
  }
}
