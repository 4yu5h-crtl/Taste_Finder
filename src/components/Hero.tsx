
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-restaurant-orange/10 to-restaurant-red/10 py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            Discover Your Next Favorite <span className="text-restaurant-orange">Restaurant</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto animate-slide-up [animation-delay:200ms]">
            Find and share the best dining experiences in your area with our emoji reaction system. Browse by cuisine, see ratings, and get personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-slide-up [animation-delay:400ms]">
            <Button asChild size="lg" className="text-md">
              <Link to="/explore">Explore Restaurants</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-md border-restaurant-orange text-restaurant-orange hover:bg-restaurant-orange/10">
              <Link to="/explore">Get Random Recommendation</Link>
            </Button>
          </div>
          
          <div className="mt-12 relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-2">
                <span className="emoji-reaction text-3xl animate-slide-up [animation-delay:600ms]">😍</span>
                <span className="emoji-reaction text-3xl animate-slide-up [animation-delay:700ms]">😐</span>
                <span className="emoji-reaction text-3xl animate-slide-up [animation-delay:800ms]">👎</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-xl p-4 border animate-slide-up [animation-delay:500ms]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-100 rounded p-3 text-center">
                  <div className="text-2xl font-bold text-restaurant-orange">500+</div>
                  <div className="text-sm text-gray-600">Restaurants</div>
                </div>
                <div className="bg-gray-100 rounded p-3 text-center">
                  <div className="text-2xl font-bold text-restaurant-orange">15+</div>
                  <div className="text-sm text-gray-600">Cuisine Types</div>
                </div>
                <div className="bg-gray-100 rounded p-3 text-center">
                  <div className="text-2xl font-bold text-restaurant-orange">10k+</div>
                  <div className="text-sm text-gray-600">User Ratings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
