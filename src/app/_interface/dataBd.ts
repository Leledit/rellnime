export interface IEntitieAnime {
  readonly id: string | undefined;
  qtdEpisodes: number;
  releaseYear: number;
  name: string;
  synopsis: string;
  nextSeason: string;
  previousSeason: string;
  watched: boolean;
  updateDate?: Date;
  note: number;
  status: string;
  genres?: string[];
  urlImg?: string;
}

export interface IEntitieFilme {
  readonly id: string | undefined;
  name: string;
  visa: boolean;
  releaseYear: number;
  duration: string;
  note: number;
  synopsis: string;
  updateDate?: Date;
  genres?: string[];
  urlImg?: string;
}
