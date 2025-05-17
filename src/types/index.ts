
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
  address: string;
  priceRange: string;
  description: string;
  reactions: {
    love: number;
    meh: number;
    dislike: number;
  };
}

export type ReactionType = 'love' | 'meh' | 'dislike';

export interface CuisineFilter {
  id: string;
  name: string;
}
