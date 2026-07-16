import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, MapPin } from 'lucide-react';
import marriageImg from '../assets/Image/3a9588f697000fffec0e6dcac056ba14.jpg';
import receptionImg from '../assets/Image/9d124385492fb5882c8339336b825f9f.jpg';
import bgDecoration from '../assets/Image/6f6e5cfd602ab4c25cc8018823549f63.jpg';

const cards = [
  {
    id: 1,
    title: "Dinner, dancing, and a night to remember together",
    time: "7:00 PM Onwards",
    venue: "Chamanthi - Wedding and Events Venue",
    location: "Hosur",
    mapLink: "https://maps.app.goo.gl/wqMKv7hmZn3ws7ub9",
    dateNum: "13",
    dateMonth: "SEPT",
    logo: (
      <div className="flex items-center gap-1.5 uppercase">
        <span className="font-bold tracking-widest text-sm font-['Cormorant_Garamond']">RECEPTION</span>
      </div>
    ),
    image: receptionImg, 
  },
  {
    id: 2,
    title: "Join us as we exchange vows and say 'I Do'",
    time: "9:00 AM - 11:30 AM",
    venue: "Sacred Heart Church",
    location: "Hosur",
    mapLink: "https://maps.app.goo.gl/2QGp6t3MdBhHzTXL6",
    dateNum: "14",
    dateMonth: "SEPT",
    logo: (
      <div className="flex items-center justify-center">
        <span className="font-bold tracking-widest text-sm uppercase font-['Cormorant_Garamond']">MARRIAGE</span>
      </div>
    ),
    image: marriageImg, 
  },
  {
    id: 3,
    title: "Celebrating love with our closest family and friends",
    families: [
      "The Samdaniel Family",
      "The Vinoliya Family"
    ],
    logo: (
      <div className="flex items-center justify-center uppercase">
        <span className="font-bold tracking-widest text-sm font-['Cormorant_Garamond']">FAMILY</span>
      </div>
    ),
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1200", 
  }
];

export default function App() {
  const [active, setActive] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const weddingDate = new Date("2026-09-14T09:00:00").getTime();
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="min-h-screen bg-[#f1f3f0] flex flex-col items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgDecoration})` }}
    >
      <div className="max-w-4xl w-full text-center mt-8 md:mt-16 mb-10 md:mb-12">
        <h1 className="text-6xl md:text-[5.5rem] text-[#1c1c1c] mb-2 tracking-normal leading-[1.1] font-['Priestacy',_'Great_Vibes',_cursive] font-normal drop-shadow-sm">
          Samdaniel & Vinoliya
        </h1>
        <p className="text-[#555] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed uppercase tracking-[0.3em] font-['Montserrat'] font-medium mb-8">
          Are getting married • September 14, 2026
        </p>

        <div className="flex justify-center gap-4 md:gap-8 font-['Cormorant_Garamond'] text-[#1c1c1c]">
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-semibold">{timeLeft.days}</span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#555] mt-1 font-['Montserrat'] font-medium">Days</span>
          </div>
          <div className="text-2xl md:text-3xl font-light text-[#888] mt-1">:</div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-semibold">{timeLeft.hours}</span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#555] mt-1 font-['Montserrat'] font-medium">Hours</span>
          </div>
          <div className="text-2xl md:text-3xl font-light text-[#888] mt-1">:</div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-semibold">{timeLeft.minutes}</span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#555] mt-1 font-['Montserrat'] font-medium">Mins</span>
          </div>
          <div className="text-2xl md:text-3xl font-light text-[#888] mt-1">:</div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-semibold">{timeLeft.seconds}</span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#555] mt-1 font-['Montserrat'] font-medium">Secs</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-[550px] md:h-[400px] w-full max-w-4xl gap-3 md:gap-4">
        {cards.map((card) => {
          const isActive = active === card.id;
          
          return (
            <motion.div
              layout
              key={card.id}
              className="relative rounded-3xl overflow-hidden cursor-pointer bg-gray-200 flex-shrink-0"
              initial={false}
              animate={{
                flex: isActive ? (isMobile ? 3 : 4) : 1
              }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              onMouseEnter={() => !isMobile && setActive(card.id)}
              onClick={() => setActive(card.id)}
            >
              <motion.img
                src={card.image}
                alt={`Background for ${card.title}`}
                className="absolute inset-0 w-full h-full object-cover origin-center"
                initial={false}
                animate={{ scale: isActive ? 1 : 1.15 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 pointer-events-none" />

              {card.dateNum && (
                <div className={`absolute left-6 md:left-8 flex flex-col items-center justify-center text-white drop-shadow-md z-10 ${!isActive && isMobile ? 'top-1/2 -translate-y-1/2' : 'top-6 md:top-8'}`}>
                  <span className="text-4xl md:text-5xl font-['Cormorant_Garamond'] leading-none">{card.dateNum}</span>
                  <span className="text-xs md:text-sm tracking-[0.2em] uppercase font-medium mt-1">{card.dateMonth}</span>
                </div>
              )}

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key="readmore"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-6 right-8 hidden md:block"
                  >
                    <div className="text-white text-sm font-medium flex items-center gap-1.5 drop-shadow-md tracking-wider uppercase font-['Cormorant_Garamond']">
                      Details <ChevronRight size={16} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={`absolute inset-x-4 md:inset-x-8 flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between gap-4 md:gap-0 overflow-hidden z-20 ${!isActive && isMobile ? 'top-1/2 -translate-y-1/2 bottom-auto' : 'bottom-6 md:bottom-8'}`}>
                <AnimatePresence mode="popLayout">
                  {isActive && (
                    <motion.div
                      key="title"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="w-full md:w-[75%] flex flex-col items-center md:items-start gap-2 md:gap-3 text-center md:text-left"
                    >
                      <h2 className="text-white text-[1.35rem] leading-[1.2] md:text-[1.6rem] font-medium md:leading-[1.1] drop-shadow-md">
                        {card.title}
                      </h2>
                      
                      {/* Additional Details */}
                      {card.time && card.venue && (
                        <div className="flex flex-col items-center md:items-start gap-1 text-white/90 text-sm md:text-base font-['Cormorant_Garamond'] tracking-wide">
                          <p className="mb-0.5 md:mb-1">{card.time}</p>
                          <div className="flex items-start justify-center md:justify-start gap-1.5 text-center md:text-left">
                            <MapPin size={16} className="mt-0.5 shrink-0 hidden md:block" />
                            <div className="flex flex-col items-center md:items-start">
                              <a href={card.mapLink} target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold flex items-center justify-center gap-1">
                                <MapPin size={14} className="shrink-0 md:hidden block" />
                                {card.venue}
                              </a>
                              <a href={card.mapLink} target="_blank" rel="noopener noreferrer" className="hover:underline opacity-90">
                                {card.location}
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {card.families && (
                        <div className="flex flex-col items-center md:items-start gap-1 text-white/90 text-sm md:text-base font-['Cormorant_Garamond'] tracking-wider uppercase mt-1 md:mt-2">
                          {card.families.map((family, index) => (
                            <p key={index}>{family}</p>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  layout
                  className={`text-white flex items-center justify-center drop-shadow-md whitespace-nowrap z-10 ${isActive ? '' : 'mx-auto'}`}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                >
                  {card.logo}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
