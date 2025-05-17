
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Restaurant } from '@/types';
import RestaurantCard from './RestaurantCard';
import { restaurants } from '@/data/restaurants';

const FeaturedRestaurants = () => {
  const [featured, setFeatured] = useState<Restaurant[]>([]);
  
  useEffect(() => {
    // Get top 4 restaurants by love reactions
    const sortedByLove = [...restaurants]
      .sort((a, b) => b.reactions.love - a.reactions.love)
      .slice(0, 4);
    
    setFeatured(sortedByLove);
  }, []);

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-restaurant-dark">Featured Restaurants</h2>
        <Link to="/explore" className="text-restaurant-orange hover:text-restaurant-red font-medium">
          View All →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((restaurant) => (
          <div key={restaurant.id} className="animate-slide-up">
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
