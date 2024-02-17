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

export interface IGenre {
  name: string;
  registrationDate: any;
  id: string;
}

export interface IItemListing {
  id: string;
  name: string;
  urlImg: string;
}

export interface IDashboardReleases {
  dataAnime: IItemListing[];
  dataFilmes: IItemListing[];
}

export interface IDashboardPopular {
  id: string;
  name: string;
  urlImg: string;
  releaseYear: string;
  note: string;
}

export interface IDataPagination {
  result: IItemListing[];
  totalRecords: number;
}

export interface IDataGenre {
  id: string;
  name: string;
  registrationDate: string;
  selected: boolean;
}

export interface IDashboardItem {
  item: IEntitieAnime | IEntitieFilme;
  recommendations: IItemListing[];
}

export interface IMessageReturn{
  message?:string,
  details:string,
  error?:string,
}

export interface IAuthentication{
  message?:string,
  tolken?:string,
  type?:string,
  error?:string,
  details?:string,
}