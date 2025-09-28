import manicureImage from '../assets/images/pexels-photo-4677849.webp';
import pedicureImage from '../assets/images/pedicure-spa-salon-24495476.webp';
import massageImage from '../assets/images/360_F_93554369_ua12Lwh68f82aJunZeXvhB8R3AVMYj9I.jpg';
import AboutTeam from '../components/AboutTeam';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import FloatingButton from '../components/FloatingButton';



const Home: React.FC = () => {

  const services = [
    { title: 'Manikűr', image: manicureImage },
    { title: 'Pedikűr', image: pedicureImage },
    { title: 'Masszázs', image: massageImage },
  ];

  return (
    <>
      <div>
        <Hero services={services} />
      </div>
      <div>
        <AboutTeam />
      </div>
      <div>
        <Services />
      </div>
      <div>
        <Reviews />
      </div>
      <div>
        <Contact />
      </div>
      <div>
        <FloatingButton />
      </div>
    </>
  ); 
};

export default Home;
