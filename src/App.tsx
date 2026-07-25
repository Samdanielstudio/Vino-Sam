import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Volume2, VolumeX, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import marriageImg from '../assets/New Custom Images/Gemini_Generated_Image_hbtocchbtocchbto.png';
import receptionImg from '../assets/New Custom Images/Gemini_Generated_Image_f1c2qf1c2qf1c2qf.png';
import familyImg from '../assets/Image/fc7d2381369ce3c0b1ccfd6c18b43ecf.jpg';
import bgMusic from '../assets/Music/the_mountain-wedding-522480.mp3';

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
    image: familyImg, 
  }
];

const butterflyData = [
  { id: 1, color: '#A3B9A1', size: 24, duration: 22, delay: 0, pathX: [5, 30, 60, 85, 45, 5], pathY: [80, 40, 70, 20, 60, 80] },
  { id: 2, color: '#B7C9B2', size: 20, duration: 19, delay: 2, pathX: [90, 65, 35, 10, 50, 90], pathY: [60, 25, 75, 35, 80, 60] },
  { id: 3, color: '#CFE1C9', size: 26, duration: 25, delay: 5, pathX: [20, 55, 80, 40, 15, 20], pathY: [20, 65, 30, 85, 40, 20] },
  { id: 4, color: '#D8DEE3', size: 18, duration: 21, delay: 1, pathX: [75, 45, 15, 55, 85, 75], pathY: [85, 50, 20, 65, 30, 85] },
  { id: 5, color: '#8FA68C', size: 22, duration: 24, delay: 4, pathX: [40, 80, 50, 10, 70, 40], pathY: [15, 45, 80, 50, 15, 15] },
  { id: 6, color: '#E4EBDD', size: 20, duration: 20, delay: 7, pathX: [85, 25, 60, 15, 75, 85], pathY: [40, 75, 20, 60, 85, 40] },
];

const Butterfly = ({ color, size, duration, delay, pathX, pathY }: (typeof butterflyData)[0]) => {
  return (
    <motion.div
      className="fixed pointer-events-none z-30 drop-shadow-sm"
      initial={{ x: `${pathX[0]}vw`, y: `${pathY[0]}vh`, opacity: 0, scale: 0.8 }}
      animate={{
        x: pathX.map((x) => `${x}vw`),
        y: pathY.map((y) => `${y}vh`),
        opacity: [0, 0.85, 0.95, 0.85, 0.9, 0],
        rotate: [0, 18, -12, 15, -10, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Left Wing */}
        <motion.div
          animate={{ rotateY: [0, 70, 0] }}
          transition={{ duration: 0.32, repeat: Infinity, ease: "easeInOut" }}
          className="origin-right"
        >
          <svg width={size / 2} height={size} viewBox="0 0 12 24" fill="none">
            <path
              d="M12 12C12 12 2 8 1 4C0 0 8 1 11 8C11 8 5 14 2 18C0 21 6 23 11 16L12 12Z"
              fill={color}
              fillOpacity="0.85"
              stroke="#ffffff"
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />
          </svg>
        </motion.div>

        {/* Body line */}
        <div className="w-[1.5px] h-3 bg-stone-700/60 rounded-full z-10 -mx-[0.75px]" />

        {/* Right Wing */}
        <motion.div
          animate={{ rotateY: [0, -70, 0] }}
          transition={{ duration: 0.32, repeat: Infinity, ease: "easeInOut" }}
          className="origin-left"
        >
          <svg width={size / 2} height={size} viewBox="0 0 12 24" fill="none">
            <path
              d="M0 12C0 12 10 8 11 4C12 0 4 1 1 8C1 8 7 14 10 18C12 21 6 23 1 16L0 12Z"
              fill={color}
              fillOpacity="0.85"
              stroke="#ffffff"
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [active, setActive] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log("Audio play error:", err);
        });
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    // Attempt default playback on mount
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser blocks unmuted autoplay, play on first user touch/click
          const handleFirstInteraction = () => {
            if (audioRef.current && audioRef.current.paused) {
              audioRef.current.play().then(() => {
                setIsPlaying(true);
              }).catch(() => {});
            }
            window.removeEventListener('pointerdown', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
          };

          window.addEventListener('pointerdown', handleFirstInteraction);
          window.addEventListener('keydown', handleFirstInteraction);
        });
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(currentTime + 10, duration || 100);
    }
  };

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
    <div className="min-h-screen bg-[#E4EBDD] flex flex-col items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Animated Floating Butterflies */}
      {butterflyData.map((b) => (
        <Butterfly key={b.id} {...b} />
      ))}
      <div className="max-w-4xl w-full text-center mt-8 md:mt-16 mb-10 md:mb-12">
        <h1 className="text-6xl md:text-[5.5rem] text-[#364736] mb-2 tracking-normal leading-[1.1] font-['Priestacy',_'Great_Vibes',_cursive] font-normal drop-shadow-sm">
          Vinoliya & Samdaniel
        </h1>
        <p className="text-[#5B6E5B] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed uppercase tracking-[0.3em] font-['Montserrat'] font-medium mb-8">
          Are getting married • September 14, 2026
        </p>

        <div className="flex justify-center gap-4 md:gap-8 font-['Cormorant_Garamond'] text-[#364736]">
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-semibold">{timeLeft.days}</span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#5B6E5B] mt-1 font-['Montserrat'] font-medium">Days</span>
          </div>
          <div className="text-2xl md:text-3xl font-light text-[#A3B9A1] mt-1">:</div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-semibold">{timeLeft.hours}</span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#5B6E5B] mt-1 font-['Montserrat'] font-medium">Hours</span>
          </div>
          <div className="text-2xl md:text-3xl font-light text-[#A3B9A1] mt-1">:</div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-semibold">{timeLeft.minutes}</span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#5B6E5B] mt-1 font-['Montserrat'] font-medium">Mins</span>
          </div>
          <div className="text-2xl md:text-3xl font-light text-[#A3B9A1] mt-1">:</div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-semibold">{timeLeft.seconds}</span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#5B6E5B] mt-1 font-['Montserrat'] font-medium">Secs</span>
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
                animate={{ scale: card.id === 3 ? 1 : (isActive ? 1 : 1.15) }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              />
              
              {/* Soft Light Scrims so artwork remains vibrant while keeping text readable */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none z-10" />

              {card.dateNum && (
                <div className={`absolute left-6 md:left-8 flex flex-col items-center justify-center text-white z-20 ${!isActive && isMobile ? 'top-1/2 -translate-y-1/2' : 'top-6 md:top-8'}`}>
                  <span className="text-4xl md:text-5xl font-['Cormorant_Garamond'] leading-none font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">{card.dateNum}</span>
                  <span className="text-xs md:text-sm tracking-[0.2em] uppercase font-bold mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{card.dateMonth}</span>
                </div>
              )}



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
                      <h2 className="text-white text-[1.35rem] leading-[1.2] md:text-[1.6rem] font-semibold md:leading-[1.1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        {card.title}
                      </h2>
                      
                      {/* Additional Details */}
                      {card.time && card.venue && (
                        <div className="flex flex-col items-center md:items-start gap-1 text-white text-sm md:text-base font-['Cormorant_Garamond'] tracking-wide font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                          <p className="mb-0.5 md:mb-1 font-semibold">{card.time}</p>
                          <div className="flex items-start justify-center md:justify-start gap-1.5 text-center md:text-left">
                            <MapPin size={16} className="mt-0.5 shrink-0 hidden md:block" />
                            <div className="flex flex-col items-center md:items-start">
                              <a href={card.mapLink} target="_blank" rel="noopener noreferrer" className="hover:underline font-bold flex items-center justify-center gap-1">
                                <MapPin size={14} className="shrink-0 md:hidden block" />
                                {card.venue}
                              </a>
                              <a href={card.mapLink} target="_blank" rel="noopener noreferrer" className="hover:underline opacity-95">
                                {card.location}
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {card.families && (
                        <div className="flex flex-col items-center md:items-start gap-1 text-white text-sm md:text-base font-['Cormorant_Garamond'] tracking-wider uppercase mt-1 md:mt-2 font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
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
                  className={`text-white flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] whitespace-nowrap z-20 ${isActive ? '' : 'mx-auto'}`}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                >
                  {card.logo}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Vinyl Record Music Player on the Left */}
      <div className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-50">
        <audio
          ref={audioRef}
          loop
          preload="auto"
          src={bgMusic}
        />

        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2.5 bg-[#E4EBDD]/90 hover:bg-[#E4EBDD] backdrop-blur-md p-2 rounded-full border border-[#B7C9B2] shadow-lg transition-all duration-300 group cursor-pointer"
            title="Expand Vinyl Music Player"
          >
            {/* Mini Spinning Vinyl Record Icon */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: isPlaying ? Infinity : 0, duration: 4, ease: "linear" }}
              className="w-9 h-9 rounded-full bg-[#1e1e1e] flex items-center justify-center relative border-2 border-[#2d2d2d] shadow-sm"
            >
              <div className="w-3.5 h-3.5 rounded-full bg-[#CFE1C9] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#1e1e1e]" />
              </div>
            </motion.div>
            <span className="text-[11px] font-bold text-[#364736] font-['Montserrat'] tracking-wide pr-2">
              Music
            </span>
          </button>
        ) : (
          <div className="relative w-48 sm:w-52 bg-[#fafaf9]/95 backdrop-blur-md rounded-3xl p-4 pt-2 border border-[#B7C9B2]/80 shadow-2xl flex flex-col items-center text-center transition-all duration-300">
            {/* Minimize button */}
            <button
              onClick={() => setIsMinimized(true)}
              className="absolute top-2.5 right-3 text-[#5B6E5B] hover:text-[#364736] text-xs font-bold transition-colors z-10"
              title="Minimize"
            >
              ✕
            </button>

            {/* Vinyl Record Disc */}
            <div className="relative -mt-10 mb-2.5 flex items-center justify-center">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: isPlaying ? Infinity : 0, duration: 8, ease: "linear" }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#1a1a1a] border-4 border-[#2b2b2b] shadow-xl flex items-center justify-center relative overflow-hidden shrink-0"
              >
                {/* Grooves */}
                <div className="absolute inset-2 border border-white/10 rounded-full" />
                <div className="absolute inset-4 border border-white/10 rounded-full" />
                <div className="absolute inset-6 border border-white/10 rounded-full" />

                {/* Center Label */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#CFE1C9] border-2 border-[#1a1a1a] flex items-center justify-center shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a]" />
                </div>
              </motion.div>
            </div>

            {/* Indicator Dots */}
            <div className="flex items-center gap-1 mb-1.5">
              <span className={`w-3 h-1 rounded-full ${isPlaying ? 'bg-[#364736]' : 'bg-[#A3B9A1]'}`} />
              <span className="w-1 h-1 rounded-full bg-[#B7C9B2]" />
            </div>

            {/* Track Title */}
            <h3 className="text-xs font-bold text-[#364736] font-['Montserrat'] tracking-wide truncate max-w-full px-1 mb-2">
              The Mountain Wedding
            </h3>

            {/* Progress Bar */}
            <div className="w-full px-1 mb-3">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-[#D8DEE3] rounded-lg appearance-none cursor-pointer accent-[#364736]"
              />
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4 text-[#364736]">
              <button
                onClick={skipBack}
                className="hover:scale-110 active:scale-95 transition-transform p-1 text-[#5B6E5B] hover:text-[#364736]"
                title="Restart"
              >
                <SkipBack size={15} fill="currentColor" />
              </button>

              <button
                onClick={toggleMusic}
                className="w-8 h-8 rounded-full bg-[#364736] text-[#E4EBDD] flex items-center justify-center hover:scale-105 active:scale-95 shadow-md transition-all"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
              </button>

              <button
                onClick={skipForward}
                className="hover:scale-110 active:scale-95 transition-transform p-1 text-[#5B6E5B] hover:text-[#364736]"
                title="Skip +10s"
              >
                <SkipForward size={15} fill="currentColor" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
