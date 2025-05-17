
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Restaurant, ReactionType } from '@/types';
import { restaurants } from '@/data/restaurants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      const foundRestaurant = restaurants.find(r => r.id === id);
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleReaction = (reaction: ReactionType) => {
    if (restaurant) {
      const updatedRestaurant = { ...restaurant };
      updatedRestaurant.reactions[reaction] += 1;
      setRestaurant(updatedRestaurant);
      
      toast({
        title: "Thanks for your feedback!",
        description: `You rated ${restaurant.name} as ${reaction === 'love' ? 'Loved it! 😍' : reaction === 'meh' ? 'It was okay 😐' : 'Not for me 👎'}`,
        duration: 3000,
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="h-80 bg-gray-300 rounded mb-6"></div>
          <div className="h-6 bg-gray-300 rounded w-full mb-3"></div>
          <div className="h-6 bg-gray-300 rounded w-5/6 mb-3"></div>
          <div className="h-6 bg-gray-300 rounded w-4/6 mb-8"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="text-5xl mb-4">🍽️</div>
          <h3 className="text-2xl font-semibold mb-4">Restaurant not found</h3>
          <p className="text-gray-600 mb-8">
            The restaurant you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/explore')}>
            Back to Explore
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6"
        >
          ← Back
        </Button>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative h-80">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
            )}
            <img 
              src={restaurant.image} 
              alt={restaurant.name} 
              className="w-full h-full object-cover" 
              onLoad={() => setImageLoaded(true)}
              style={{ opacity: imageLoaded ? 1 : 0 }}
            />
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{restaurant.cuisine.charAt(0).toUpperCase() + restaurant.cuisine.slice(1)}</Badge>
              <Badge variant="outline">{restaurant.priceRange}</Badge>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-500 mr-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-bold ml-1">{restaurant.rating}</span>
              </div>
              <span className="text-gray-600">{restaurant.address}</span>
            </div>
            
            <div className="border-t border-b py-6 my-6">
              <h3 className="text-xl font-semibold mb-4">About</h3>
              <p className="text-gray-700">{restaurant.description}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">What do you think?</h3>
              <div className="flex justify-center gap-8 p-4 bg-gray-50 rounded-lg">
                <button 
                  onClick={() => handleReaction('love')}
                  className="emoji-reaction flex flex-col items-center"
                >
                  <span className="text-4xl">😍</span>
                  <span className="mt-2 font-medium">{restaurant.reactions.love}</span>
                  <span className="text-sm text-gray-600">Love it</span>
                </button>
                <button 
                  onClick={() => handleReaction('meh')}
                  className="emoji-reaction flex flex-col items-center"
                >
                  <span className="text-4xl">😐</span>
                  <span className="mt-2 font-medium">{restaurant.reactions.meh}</span>
                  <span className="text-sm text-gray-600">It's okay</span>
                </button>
                <button 
                  onClick={() => handleReaction('dislike')}
                  className="emoji-reaction flex flex-col items-center"
                >
                  <span className="text-4xl">👎</span>
                  <span className="mt-2 font-medium">{restaurant.reactions.dislike}</span>
                  <span className="text-sm text-gray-600">Not for me</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
