import { Component, inject } from '@angular/core';
import { Cancion } from '../interfaces/cancion.interface';
import { MusicaService } from './musica.service';
import { SesionService } from '../servicios/sesion.service';

@Component({
  imports: [],
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

}
