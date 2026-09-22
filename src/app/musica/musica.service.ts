import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  Cancion,
  SpotifySearchResponse,
} from '../interfaces/cancion.interface';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  private readonly http = inject(HttpClient);
  private readonly spotifyUrl = 'https://api.spotify.com/v1';

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

  buscarEnSpotify(consulta: string): Observable<Cancion[]> {
    const token = localStorage.getItem('spotify_access_token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http
      .get<SpotifySearchResponse>(`${this.spotifyUrl}/search`, {
        headers,
        params: { q: consulta, type: 'track', limit: '10' },
      })
      .pipe(
        map((respuesta) =>
          respuesta.tracks.items.map((cancion) => ({
            id: cancion.id,
            titulo: cancion.name,
            artista: cancion.artists.map((artista) => artista.name).join(', '),
            imagen: cancion.album.images[0]?.url ?? 'img/default-song.jpg',
            reproducciones: cancion.popularity,
            spotifyUrl: cancion.external_urls.spotify,
          }))
        )
      );
  }
}
