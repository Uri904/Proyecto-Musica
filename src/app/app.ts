import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Musica } from './musica/musica';

@Component({
  imports: [RouterOutlet, Musica],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('mi-primer-proyecto-lazcano');
}
