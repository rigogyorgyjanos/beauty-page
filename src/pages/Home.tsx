
import AboutTeam from '../components/AboutTeam';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import FloatingButton from '../components/FloatingButton';



const Home: React.FC = () => {
  return (
    <>
      <div>
        <Hero />
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
