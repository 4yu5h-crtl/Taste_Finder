
import Hero from '@/components/Hero';
import FeaturedRestaurants from '@/components/FeaturedRestaurants';
import HowItWorks from '@/components/HowItWorks';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedRestaurants />
      <HowItWorks />
    </div>
  );
};

export default Index;
