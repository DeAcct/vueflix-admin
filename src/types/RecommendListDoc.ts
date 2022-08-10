import type { ImageFileName } from "./MediaExtension";

export interface RecommendAnime {
  aniTitle: string;
  episodeThumbnail: ImageFileName;
}

export interface RecommendListDoc {
  list: Array<RecommendAnime>;
  subject: string;
  idNumber: number;
}
