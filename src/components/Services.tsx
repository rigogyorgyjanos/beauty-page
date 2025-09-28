import React, { useEffect, useState } from 'react';
import manicureImage from '../assets/images/pexels-photo-4677849.webp';
import pedicureImage from '../assets/images/pedicure-spa-salon-24495476.webp';
import massageImage from '../assets/images/360_F_93554369_ua12Lwh68f82aJunZeXvhB8R3AVMYj9I.jpg';

interface Service {
  title: string;
  description: string;
  image: string;
  features?: string[];
}

const services: Service[] = [
  {
    title: 'Manikűr',
    description: 'Különféle manikűr szolgáltatások, amelyek ápolják és kiemelik kezeid szépségét.',
    image: manicureImage,
    features: [
      'Géllakk',
      'Francia manikűr',
      'Japán manikűr',
      'Klasszikus manikűr',
      'Erősített géllakk',
    ],
  },
  {
    title: 'Pedikűr',
    description: 'Professzionális pedikűr megoldások, amelyek felfrissítik és ápolják lábaid.',
    image: pedicureImage,
    features: [
      'Klasszikus pedikűr',
      'Esztétikai pedikűr',
      'Géllakk lábra',
      'Callus peeling',
      'Spa pedikűr',
    ],
  },
  {
    title: 'Masszázs',
    description: 'Kényeztető és gyógyító masszázs típusok testnek és léleknek.',
    image: massageImage,
    features: [
      'Frissítő svédmasszázs',
      'Relaxáló aromaterápiás masszázs',
      'Mézes masszázs',
      'Hátmasszázs',
      'Talpmasszázs',
    ],
  },
];

const ServicesWithScroll: React.FC = () => {
  const [visible, setVisible] = useState<boolean[]>(services.map(() => false));
  const refs = services.map(() => React.createRef<HTMLDivElement>());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.forEach((ref, idx) => {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setVisible(prev => {
                const updated = [...prev];
                updated[idx] = true;
                return updated;
              });
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.3,
        }
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
      observers.push(observer);
    });

    return () => {
      observers.forEach(o => o.disconnect());
    };
  }, [refs]);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-pink-500 mb-12">
        Szolgáltatásaink
      </h2>

      {services.map((service, idx) => {
        const fromLeft = idx % 2 === 0;

        return (
          <div
            key={idx}
            ref={refs[idx]}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              fromLeft ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Kép */}
            <div className="w-full max-h-[480px] md:w-1/2 overflow-hidden rounded-lg shadow-md">
              <img
                src={service.image}
                alt={service.title}
                className={`w-full h-auto object-cover transition-transform duration-1000 rounded-lg ${
                  visible[idx] ? 'scale-100' : 'scale-110'
                }`}
              />
            </div>

            {/* Szöveg */}
            <div
              className={`w-full md:w-1/2 transition-all duration-1000 ${
                visible[idx]
                  ? 'translate-x-0 opacity-100'
                  : fromLeft
                  ? '-translate-x-10 opacity-0'
                  : 'translate-x-10 opacity-0'
              }`}
            >
              <h3 className="text-2xl sm:text-3xl font-semibold text-pink-600 mb-4">{service.title}</h3>
              <p className="text-gray-700 mb-4">{service.description}</p>

              {service.features && (
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ServicesWithScroll;
