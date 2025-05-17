
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Restaurant, ReactionType } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onReaction?: (id: string, reaction: ReactionType) => void;
}

const RestaurantCard = ({ restaurant, onReaction }: RestaurantCardProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const handleReaction = (reaction: ReactionType) => {
    if (onReaction) {
      onReaction(restaurant.id, reaction);
      toast({
        title: "Thanks for your feedback!",
        description: `You rated ${restaurant.name} as ${reaction === 'love' ? 'Loved it! 😍' : reaction === 'meh' ? 'It was okay 😐' : 'Not for me 👎'}`,
        duration: 3000,
      });
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Card className="overflow-hidden card-hover">
      <Link to={`/restaurant/${restaurant.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
            onLoad={handleImageLoad}
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="font-medium">
              {restaurant.priceRange}
            </Badge>
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/restaurant/${restaurant.id}`}>
              <h3 className="text-lg font-bold hover:text-restaurant-orange transition-colors">
                {restaurant.name}
              </h3>
            </Link>
            <Badge variant="outline" className="mt-1">
              {restaurant.cuisine.charAt(0).toUpperCase() + restaurant.cuisine.slice(1)}
            </Badge>
            <div className="flex items-center mt-2 text-sm text-gray-600">
              <span className="flex items-center">
                <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {restaurant.rating}
              </span>
              <span className="mx-2">•</span>
              <span>{restaurant.address}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-sm text-gray-600 line-clamp-2">{restaurant.description}</p>
        </div>
        
        <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex space-x-4">
            <button 
              onClick={() => handleReaction('love')}
              className="emoji-reaction flex flex-col items-center text-center"
            >
              <span className="text-xl">😍</span>
              <span className="text-xs mt-1">{restaurant.reactions.love}</span>
            </button>
            <button 
              onClick={() => handleReaction('meh')}
              className="emoji-reaction flex flex-col items-center text-center"
            >
              <span className="text-xl">😐</span>
              <span className="text-xs mt-1">{restaurant.reactions.meh}</span>
            </button>
            <button 
              onClick={() => handleReaction('dislike')}
              className="emoji-reaction flex flex-col items-center text-center"
            >
              <span className="text-xl">👎</span>
              <span className="text-xs mt-1">{restaurant.reactions.dislike}</span>
            </button>
          </div>
          <Link 
            to={`/restaurant/${restaurant.id}`}
            className="text-restaurant-orange hover:text-restaurant-red font-medium text-sm"
          >
            Details →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
