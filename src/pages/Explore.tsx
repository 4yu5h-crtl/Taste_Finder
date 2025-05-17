
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Restaurant, ReactionType } from '@/types';
import { restaurants, cuisineFilters } from '@/data/restaurants';
import CuisineFilter from '@/components/CuisineFilter';
import RestaurantCard from '@/components/RestaurantCard';

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);
  const [loading, setLoading] = useState(true);
  const [localRestaurants, setLocalRestaurants] = useState<Restaurant[]>(restaurants);
  
  const activeCuisine = searchParams.get('cuisine') || 'all';

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    
    setTimeout(() => {
      if (activeCuisine === 'all') {
        setFilteredRestaurants(localRestaurants);
      } else {
        const filtered = localRestaurants.filter(r => r.cuisine === activeCuisine);
        setFilteredRestaurants(filtered);
      }
      setLoading(false);
    }, 500);
  }, [activeCuisine, localRestaurants]);

  const handleFilterChange = (filterId: string) => {
    setSearchParams({ cuisine: filterId });
  };

  const handleReaction = (id: string, reaction: ReactionType) => {
    const updatedRestaurants = localRestaurants.map(restaurant => {
      if (restaurant.id === id) {
        const updatedReactions = { ...restaurant.reactions };
        updatedReactions[reaction] += 1;
        
        return {
          ...restaurant,
          reactions: updatedReactions
        };
      }
      return restaurant;
    });
    
    setLocalRestaurants(updatedRestaurants);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Explore Restaurants</h1>
        <p className="text-gray-600">
          Discover the best dining experiences and share your reactions with the community.
        </p>
      </div>
      
      <CuisineFilter 
        filters={cuisineFilters} 
        activeFilter={activeCuisine} 
        onFilterChange={handleFilterChange} 
      />
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow animate-pulse">
              <div className="h-48 bg-gray-300 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                <div className="h-5 bg-gray-300 rounded w-1/4 mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant, index) => (
            <div 
              key={restaurant.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <RestaurantCard 
                restaurant={restaurant} 
                onReaction={handleReaction} 
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🍽️</div>
          <h3 className="text-2xl font-semibold mb-2">No restaurants found</h3>
          <p className="text-gray-600">
            We couldn't find any restaurants with the selected filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Explore;
