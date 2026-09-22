export interface Cancion {
  id: number | string;
  titulo: string;
  artista: string;
  imagen: string;
  reproducciones: number;
  spotifyUrl?: string;
}

export interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  popularity: number;
  external_urls: {
    spotify: string;
  };
  artists: Array<{ name: string }>;
  album: {
    images: Array<{ url: string }>;
  };
}