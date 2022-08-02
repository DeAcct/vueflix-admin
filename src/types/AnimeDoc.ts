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

export interface AnimeDoc {
  copy: string;
  director: string;
  genre: Array<string>;
  idNumber: number;
  isEnd: boolean;
  keywordReview: {
    [key: string]: KeywordReviewItem; // 향후 키워드리뷰 항목이 늘어날 것을 고려
  };
  madeBy: Array<string>;
  name: string;
  parts: Array<Part>;
  poster: ImageFileName;
  price: number;
  rating: string;
  release: Array<string>;
  reviews: Array<ReviewItem>;
  shortName: string;
  slideCopy: string;
  summary: string;
  tag: Array<string>;
  type: string;
}
