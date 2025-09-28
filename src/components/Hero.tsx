import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper stílusok
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

const Hero = ({ services }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Egyszerű méret figyelés (window resize)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint alatt mobil
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    // Mobil swiper nézet
    return (
      <div className="w-full mt-5 px-5 h-[640px]">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          
          autoplay={{ delay: 4000 }}
          className="h-full"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full group cursor-pointer overflow-hidden rounded-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 rounded-lg"
                />
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-pink-500 text-2xl drop-shadow-xl transition-all duration-300 ease-in-out group-hover:translate-y-[-20px]">
                  {service.title}
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-xs opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
                  <p className="relative inline-block text-pink-100 group-hover:text-pink-100 transition duration-600
                                    after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px]
                                    after:w-0 group-hover:after:w-full after:bg-pink-600 after:transition-all after:duration-600">
                    Részletek
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  // Desktop flex nézet
  return (
    <div className="w-full mt-5 flex flex-row justify-center items-stretch gap-5 px-5 h-[640px]">
      {services.map((service, index) => (
        <div
          key={index}
          className="w-1/3 h-full relative overflow-hidden group cursor-pointer rounded-lg"
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 rounded-lg"
          />

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-pink-500 text-2xl drop-shadow-xl transition-all duration-300 ease-in-out group-hover:translate-y-[-20px]">
            {service.title}
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-xs opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
            <p className="relative inline-block text-pink-100 group-hover:text-pink-100 transition duration-600
                              after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px]
                              after:w-0 group-hover:after:w-full after:bg-pink-600 after:transition-all after:duration-600">
              Részletek
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
