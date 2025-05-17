
const HowItWorks = () => {
  const steps = [
    {
      icon: '🔍',
      title: 'Browse',
      description: 'Search for restaurants by cuisine type, location, or price range.'
    },
    {
      icon: '😍',
      title: 'React',
      description: 'Share your opinion with our simple emoji reaction system.'
    },
    {
      icon: '🍽️',
      title: 'Discover',
      description: 'Find new favorites based on community recommendations.'
    }
  ];

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-12">How TasteFinder Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
