import React from 'react';

const ProductHero = () => {
  // Your custom primary color
  const primaryColor = "#8bf606";

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden p-8">
      {/* Container for the composition */}
      <div className="relative w-full max-w-4xl flex items-center justify-center">
        
        {/* Background Splash Layer */}
        <div className="absolute inset-0 z-0 flex items-center justify-center transform scale-110 opacity-90">
          {/* Note: Replace 'splash-image.png' with your edited splash file.
              The 'mix-blend-multiply' or 'brightness' filters help achieve the 
              black/green mix look.
          */}
          <img 
            src="/path-to-your-green-splash.png" 
            alt="Background Splash" 
            className="w-full h-auto object-contain"
            style={{ 
              filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))',
              // Example of mixing colors via CSS filters if the image is pure green
              borderImage: `linear-gradient(to bottom, ${primaryColor}, #000) 1`
            }}
          />
        </div>

        {/* Foreground Product Layer */}
        <div className="relative z-10 w-full">
          <img 
            src="/path-to-your-s.jpg" 
            alt="Product Collection" 
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
};

export default ProductHero;