import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Menü linkek tömbként (könnyebb kezelni)
  const menuLinks = [
    { to: '/manicure', label: 'Manikűr' },
    { to: '/pedicure', label: 'Pedikűr' },
    { to: '/massage', label: 'Masszázs' },
    { to: '/about', label: 'Rólunk' },
    { to: '/contact', label: 'Kontakt' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full bg-white shadow-md transition-transform duration-300 z-50 ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between">
          {/* Bal oldal - logó */}
          <Link to="/" className="text-xl font-bold text-pink-600">
            Beauty Saloon
          </Link>

          {/* Desktop menü */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            {menuLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="relative inline-block text-gray-700 hover:text-pink-600 transition duration-300
                          after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px]
                          after:w-0 hover:after:w-full after:bg-pink-600 after:transition-all after:duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobil hamburger ikon */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[4px] w-5 h-5 cursor-pointer z-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Mobil menü"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`block h-0.5 w-full bg-pink-600 rounded transition-transform duration-300 origin-left ${
                isMenuOpen ? 'rotate-45 -translate-y-1.5' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-pink-600 rounded transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-pink-600 rounded transition-transform duration-300 origin-left ${
                isMenuOpen ? '-rotate-45 -translate-y-1' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Fullscreen overlay menü mobilon */}
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col pt-20 font-semibold text-pink-600 transition-transform duration-600 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {menuLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-pink-600 transition py-3 px-5 border-b-1 border-pink-100 "
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Header;
