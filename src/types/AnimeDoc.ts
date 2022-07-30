import type { ImageFileName } from "./MediaExtension";

interface KeywordReviewItem {
  keyword: string;
  value: number;
}

interface Episode {
  date: string;
  index: number;
  thumbnail: ImageFileName;
  title: string;
}

interface Part {
  episodes: Array<Episode>;
  maxIndex: number;
  part: string;
}

interface Time {
  date: number;
  hour: number;
  min: number;
  month: number;
  year: number;
}

interface ReviewItem {
  aniTitle: string;
  author: string;
  content: string;
  thumbsUp: number;
  time: Time;
  uid: string;
}

interface SlideMeta {
  copy: string;
  shortName: string;
}

export interface AnimeDoc {
  copy: string;
  director: string;
  genre: Array<string>;
  idNumber: number;
  isEnd: boolean;
  keywordReview: {
    [key: string]: KeywordReviewItem;
  };
  madeBy: Array<string>;
  name: string;
  parts: Array<Part>;
  poster: ImageFileName;
  price: number;
  rating: string;
  release: Array<string>;
  reviews: Array<ReviewItem>;
  slideMeta: SlideMeta;
  summary: string;
  type: string;
}
