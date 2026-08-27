import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import marriageImg from '../assets/New Custom Images/Gemini_Generated_Image_hbtocchbtocchbto.png';
import receptionImg from '../assets/New Custom Images/Gemini_Generated_Image_f1c2qf1c2qf1c2qf.png';
import familyImg from '../assets/Image/fc7d2381369ce3c0b1ccfd6c18b43ecf.jpg';
import bgMusic from '../assets/Music/the_mountain-wedding-522480.mp3';

const cards = [
  {
    id: 1,
    tag: "RECEPTION",
    tagline: "Dinner & Evening Party",
    title: "Chamanthi Venue",
    subtitle: "Hosur, Tamil Nadu",
    description: "Dinner, dancing, and a night to remember together",
    stat1Val: "13 Sept",
    stat1Label: "Date",
    stat2Val: "7:00 PM",
    stat2Label: "Time",
    stat3Val: "Hosur",
    stat3Label: "Location",
    mapLink: "https://maps.app.goo.gl/wqMKv7hmZn3ws7ub9",
    image: receptionImg,
  },
  {
    id: 2,
    tag: "MARRIAGE",
    tagline: "Holy Marriage Ceremony",
    title: "Sacred Heart Church",
    subtitle: "Hosur, Tamil Nadu",
    description: "Join us as we exchange vows and say 'I Do'",
    stat1Val: "14 Sept",
    stat1Label: "Date",
    stat2Val: "9:45 AM",
    stat2Label: "Time",
    stat3Val: "Hosur",
    stat3Label: "Location",
    mapLink: "https://maps.app.goo.gl/2QGp6t3MdBhHzTXL6",
    image: marriageImg,
  },
  {
    id: 3,
    tag: "FAMILY",
    tagline: "With Beloved Families",
    title: "Vinoliya & Samdaniel",
    subtitle: "Celebrating Love & Joy",
    description: "Blessed by the Samdaniel & Vinoliya families",
    stat1Val: "14 Sept",
    stat1Label: "Date",
    stat2Val: "2 Families",
    stat2Label: "Hosts",
    stat3Val: "Hosur",
    stat3Label: "Location",
    mapLink: "https://maps.app.goo.gl/2QGp6t3MdBhHzTXL6",
    image: familyImg,
  }
];

const fallingPetalsData = [
  { id: 1, x: '4%', delay: 0, duration: 14, size: 22, blur: 'blur-[2.5px]', opacity: 0.8, depthScale: 1.4, zIndex: 40 },
  { id: 2, x: '11%', delay: 3, duration: 18, size: 16, blur: 'blur-[0px]', opacity: 0.9, depthScale: 1.0, zIndex: 30 },
  { id: 3, x: '18%', delay: 7, duration: 22, size: 12, blur: 'blur-[1.5px]', opacity: 0.65, depthScale: 0.75, zIndex: 20 },
  { id: 4, x: '25%', delay: 1.5, duration: 15, size: 19, blur: 'blur-[2px]', opacity: 0.85, depthScale: 1.3, zIndex: 40 },
  { id: 5, x: '32%', delay: 4.5, duration: 19, size: 14, blur: 'blur-[0px]', opacity: 0.9, depthScale: 1.0, zIndex: 30 },
  { id: 6, x: '39%', delay: 8, duration: 23, size: 11, blur: 'blur-[1px]', opacity: 0.6, depthScale: 0.7, zIndex: 20 },
  { id: 7, x: '46%', delay: 0.8, duration: 16, size: 20, blur: 'blur-[3px]', opacity: 0.75, depthScale: 1.5, zIndex: 40 },
  { id: 8, x: '53%', delay: 5, duration: 17, size: 15, blur: 'blur-[0px]', opacity: 0.88, depthScale: 1.0, zIndex: 30 },
  { id: 9, x: '60%', delay: 2, duration: 20, size: 13, blur: 'blur-[1.5px]', opacity: 0.65, depthScale: 0.8, zIndex: 20 },
  { id: 10, x: '67%', delay: 6.5, duration: 15, size: 18, blur: 'blur-[2px]', opacity: 0.82, depthScale: 1.3, zIndex: 40 },
  { id: 11, x: '74%', delay: 1, duration: 18.5, size: 16, blur: 'blur-[0px]', opacity: 0.9, depthScale: 1.0, zIndex: 30 },
  { id: 12, x: '81%', delay: 9.5, duration: 21, size: 12, blur: 'blur-[1.5px]', opacity: 0.7, depthScale: 0.75, zIndex: 20 },
  { id: 13, x: '88%', delay: 4, duration: 14.5, size: 21, blur: 'blur-[2.5px]', opacity: 0.8, depthScale: 1.4, zIndex: 40 },
  { id: 14, x: '95%', delay: 2.5, duration: 19.5, size: 14, blur: 'blur-[0px]', opacity: 0.85, depthScale: 1.0, zIndex: 30 },
  { id: 15, x: '15%', delay: 10, duration: 16.5, size: 17, blur: 'blur-[2px]', opacity: 0.8, depthScale: 1.2, zIndex: 40 },
  { id: 16, x: '42%', delay: 11.5, duration: 18, size: 13, blur: 'blur-[0.5px]', opacity: 0.85, depthScale: 0.9, zIndex: 30 },
  { id: 17, x: '70%', delay: 12, duration: 20, size: 15, blur: 'blur-[1px]', opacity: 0.7, depthScale: 1.0, zIndex: 30 },
  { id: 18, x: '85%', delay: 13, duration: 15.5, size: 19, blur: 'blur-[2.5px]', opacity: 0.78, depthScale: 1.35, zIndex: 40 },
];

const FallingPetal = ({ x, delay, duration, size, blur, opacity, depthScale, zIndex }: typeof fallingPetalsData[0]) => (
  <motion.div
    className={`fixed pointer-events-none ${blur}`}
    style={{ left: x, top: '-5%', zIndex }}
    initial={{ y: '-5vh', x: 0, rotate: 0, opacity: 0 }}
    animate={{
      y: ['0vh', '105vh'],
      x: [0, 25, -15, 20, -5],
      rotate: [0, 120, 240, 360, 480],
      opacity: [0, opacity, opacity, opacity * 0.8, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'linear',
      delay,
    }}
  >
    <svg width={size * depthScale} height={size * depthScale * 1.5} viewBox="0 0 20 30" fill="none">
      <path
        d="M 10 0 C 18 8, 20 20, 10 30 C 0 20, 2 8, 10 0 Z"
        fill="url(#lavenderPetalGrad)"
        fillOpacity="0.8"
        stroke="#B89DCE"
        strokeWidth="0.5"
      />
      <path
        d="M 10 4 C 14 10, 15 18, 10 26 C 7 19, 6 12, 10 4 Z"
        stroke="#6B5787"
        strokeWidth="0.3"
        strokeOpacity="0.4"
        fill="none"
      />

      <defs>
        <linearGradient id="lavenderPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5EFF9" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#B89DCE" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#6B5787" stopOpacity="0.85" />
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
);

const FloralBranchSVG = ({ width = 320, height = 260, flipped = false }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 320 260"
    fill="none"
    className={`w-full h-full ${flipped ? 'scale-x-[-1]' : ''}`}
  >
    <defs>
      <linearGradient id={`lavenderPetal1_${flipped ? 'r' : 'l'}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5EFF9" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#B89DCE" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#6B5787" stopOpacity="0.8" />
      </linearGradient>

      <linearGradient id={`lavenderPetal2_${flipped ? 'r' : 'l'}`} x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#543D73" stopOpacity="0.75" />
        <stop offset="60%" stopColor="#A28BBF" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#FAF7FC" stopOpacity="0.95" />
      </linearGradient>

      <linearGradient id={`leafGrad_${flipped ? 'r' : 'l'}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D8D2C3" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#7A8064" stopOpacity="0.5" />
      </linearGradient>
    </defs>

    <path
      d="M -10 -10 C 40 40, 80 90, 120 150 C 145 185, 160 230, 165 260"
      stroke="#7A8064"
      strokeWidth="2.5"
      strokeOpacity="0.6"
      strokeLinecap="round"
    />
    <path
      d="M 30 -10 C 75 35, 130 65, 195 90 C 230 105, 265 120, 295 125"
      stroke="#7A8064"
      strokeWidth="2"
      strokeOpacity="0.55"
      strokeLinecap="round"
    />
    <path
      d="M 90 130 C 70 85, 45 40, 15 -10"
      stroke="#7A8064"
      strokeWidth="1.8"
      strokeOpacity="0.5"
      strokeLinecap="round"
    />

    <path
      d="M 135 175 C 175 190, 205 220, 195 245 C 165 240, 140 210, 135 175 Z"
      fill={`url(#leafGrad_${flipped ? 'r' : 'l'})`}
      stroke="#6B7056"
      strokeWidth="0.6"
      strokeOpacity="0.5"
    />
    <path
      d="M 90 115 C 60 135, 38 165, 52 190 C 78 180, 90 150, 90 115 Z"
      fill={`url(#leafGrad_${flipped ? 'r' : 'l'})`}
      stroke="#6B7056"
      strokeWidth="0.6"
      strokeOpacity="0.5"
    />
    <path
      d="M 180 85 C 205 65, 230 55, 245 75 C 235 95, 205 105, 180 85 Z"
      fill={`url(#leafGrad_${flipped ? 'r' : 'l'})`}
      stroke="#6B7056"
      strokeWidth="0.6"
      strokeOpacity="0.5"
    />

    <g transform="translate(195, 90)">
      <path d="M 0 0 C 25 -45, 55 -65, 40 -90 C 15 -75, -10 -40, 0 0 Z" fill={`url(#lavenderPetal1_${flipped ? 'r' : 'l'})`} stroke="#8668A8" strokeWidth="0.6" strokeOpacity="0.5" />
      <path d="M 0 0 C -35 -40, -65 -45, -70 -20 C -45 5, -20 0, 0 0 Z" fill={`url(#lavenderPetal2_${flipped ? 'r' : 'l'})`} stroke="#8668A8" strokeWidth="0.6" strokeOpacity="0.5" />
      <path d="M 0 0 C 35 -15, 65 -10, 70 15 C 45 30, 20 15, 0 0 Z" fill={`url(#lavenderPetal1_${flipped ? 'r' : 'l'})`} stroke="#8668A8" strokeWidth="0.6" strokeOpacity="0.5" />
      <path d="M 0 0 C -15 35, -45 55, -60 40 C -55 15, -25 10, 0 0 Z" fill={`url(#lavenderPetal2_${flipped ? 'r' : 'l'})`} stroke="#8668A8" strokeWidth="0.6" strokeOpacity="0.5" />

      <path d="M 0 0 C 10 -55, 35 -75, 15 -85 C -5 -65, -15 -35, 0 0 Z" fill={`url(#lavenderPetal2_${flipped ? 'r' : 'l'})`} stroke="#A28BBF" strokeWidth="0.5" strokeOpacity="0.6" />
      <path d="M 0 0 C -20 -55, 0 -75, -10 -65 C -25 -45, -15 -25, 0 0 Z" fill={`url(#lavenderPetal1_${flipped ? 'r' : 'l'})`} stroke="#A28BBF" strokeWidth="0.5" strokeOpacity="0.6" />

      <path d="M 0 0 C 18 -35, 32 -55, 28 -70" stroke="#543D73" strokeWidth="0.4" strokeOpacity="0.4" fill="none" />
      <path d="M 0 0 C -20 -30, -45 -32, -50 -15" stroke="#543D73" strokeWidth="0.4" strokeOpacity="0.4" fill="none" />

      <path d="M 0 0 Q 5 -20 10 -30" stroke="#7A8064" strokeWidth="0.8" fill="none" />
      <circle cx="10" cy="-30" r="2" fill="#D4AF37" />
      <path d="M 0 0 Q -5 -18 -8 -26" stroke="#7A8064" strokeWidth="0.8" fill="none" />
      <circle cx="-8" cy="-26" r="1.8" fill="#D4AF37" />
    </g>

    <g transform="translate(120, 155) scale(1.15)">
      <path d="M 0 0 C -30 -50, -45 -80, -20 -100 C 5 -80, 10 -45, 0 0 Z" fill={`url(#lavenderPetal1_${flipped ? 'r' : 'l'})`} stroke="#8668A8" strokeWidth="0.6" strokeOpacity="0.55" />
      <path d="M 0 0 C 30 -55, 55 -75, 45 -95 C 15 -80, 0 -45, 0 0 Z" fill={`url(#lavenderPetal2_${flipped ? 'r' : 'l'})`} stroke="#8668A8" strokeWidth="0.6" strokeOpacity="0.55" />
      <path d="M 0 0 C -55 -25, -75 -45, -80 -15 C -60 10, -25 5, 0 0 Z" fill={`url(#lavenderPetal1_${flipped ? 'r' : 'l'})`} stroke="#8668A8" strokeWidth="0.6" strokeOpacity="0.55" />
      <path d="M 0 0 C 55 -25, 75 -45, 80 -15 C 60 10, 25 5, 0 0 Z" fill={`url(#lavenderPetal2_${flipped ? 'r' : 'l'})`} stroke="#8668A8" strokeWidth="0.6" strokeOpacity="0.55" />

      <path d="M 0 0 C -15 -60, 5 -85, -5 -90 C -25 -70, -20 -35, 0 0 Z" fill={`url(#lavenderPetal2_${flipped ? 'r' : 'l'})`} stroke="#A28BBF" strokeWidth="0.5" strokeOpacity="0.6" />
      <path d="M 0 0 C 15 -60, 35 -75, 20 -85 C 0 -65, -5 -35, 0 0 Z" fill={`url(#lavenderPetal1_${flipped ? 'r' : 'l'})`} stroke="#A28BBF" strokeWidth="0.5" strokeOpacity="0.6" />

      <path d="M 0 0 C -20 -40, -32 -65, -15 -82" stroke="#543D73" strokeWidth="0.4" strokeOpacity="0.45" fill="none" />
      <path d="M 0 0 C 20 -40, 38 -60, 32 -78" stroke="#543D73" strokeWidth="0.4" strokeOpacity="0.45" fill="none" />

      <path d="M 0 0 Q -2 -22 -4 -35" stroke="#7A8064" strokeWidth="0.9" fill="none" />
      <circle cx="-4" cy="-35" r="2.2" fill="#D4AF37" />
      <path d="M 0 0 Q 4 -20 7 -32" stroke="#7A8064" strokeWidth="0.9" fill="none" />
      <circle cx="7" cy="-32" r="2" fill="#D4AF37" />
    </g>

    <g transform="translate(245, 140) scale(0.85)">
      <path d="M 0 0 C -25 -40, -35 -65, -15 -80 C 10 -65, 10 -35, 0 0 Z" fill={`url(#lavenderPetal1_${flipped ? 'r' : 'l'})`} stroke="#8668A8" strokeWidth="0.6" strokeOpacity="0.5" />
      <path d="M 0 0 C 25 -40, 35 -65, 15 -80 C -10 -65, -10 -35, 0 0 Z" fill={`url(#lavenderPetal2_${flipped ? 'r' : 'l'})`} stroke="#8668A8" strokeWidth="0.6" strokeOpacity="0.5" />
    </g>
  </svg>
);

const TopFlowersDepthOfField = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {fallingPetalsData.map((petal) => (
        <FallingPetal key={petal.id} {...petal} />
      ))}

      <div className="absolute inset-x-0 top-0 z-[1] opacity-65 filter blur-[2.5px]">
        <motion.div
          className="absolute -top-8 -left-10 w-72 md:w-96"
          animate={{ rotate: [-2, 2, -2], y: [0, 6, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FloralBranchSVG width={360} height={240} />
        </motion.div>

        <motion.div
          className="absolute -top-8 -right-10 w-72 md:w-96"
          animate={{ rotate: [2, -2, 2], y: [0, 6, 0] }}
          transition={{ duration: 8.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FloralBranchSVG width={360} height={240} flipped />
        </motion.div>
      </div>

      <div className="absolute inset-x-0 top-0 z-[2] drop-shadow-md">
        <motion.div
          className="absolute -top-4 -left-6 w-80 md:w-[440px] origin-top-left"
          animate={{ rotate: [-3, 3, -3], y: [0, 8, 0], x: [0, 4, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FloralBranchSVG width={440} height={280} />
        </motion.div>

        <motion.div
          className="absolute -top-4 -right-6 w-80 md:w-[440px] origin-top-right"
          animate={{ rotate: [3, -3, 3], y: [0, 8, 0], x: [0, -4, 0] }}
          transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FloralBranchSVG width={440} height={280} flipped />
        </motion.div>
      </div>

      <div className="absolute inset-x-0 top-0 z-[3] filter blur-[3.8px] opacity-85">
        <motion.div
          className="absolute -top-2 -left-4 w-96 md:w-[500px] origin-top-left scale-125"
          animate={{ rotate: [-4, 4, -4], y: [0, 12, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FloralBranchSVG width={500} height={300} />
        </motion.div>

        <motion.div
          className="absolute -top-2 -right-4 w-96 md:w-[500px] origin-top-right scale-125"
          animate={{ rotate: [4, -4, 4], y: [0, 12, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FloralBranchSVG width={500} height={300} flipped />
        </motion.div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeCardId, setActiveCardId] = useState(2);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollToCard = (id: number) => {
    setActiveCardId(id);
    const cardElement = document.getElementById(`card-${id}`);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

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

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
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
    const weddingDate = new Date("2026-09-14T09:45:00").getTime();
    
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
    <div className="min-h-screen bg-[#D8C7B5] flex flex-col items-center justify-start p-4 md:p-8 font-sans relative overflow-x-hidden pb-24">
      <TopFlowersDepthOfField />

      <div className="fixed top-0 left-0 w-96 h-96 bg-[#E8DFF2]/40 rounded-full filter blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#F5E8EF]/35 rounded-full filter blur-3xl pointer-events-none z-0" />

      {/* Main Header Invitation Section (Text floats directly on background without card container) */}
      <div className="max-w-2xl w-full text-center mt-6 md:mt-10 mb-10 z-10 relative">
        
        <p className="text-[#6B5787]/90 text-xs md:text-sm font-['Cinzel',_serif] uppercase tracking-[0.25em] font-semibold mb-6">
          You are invited to be a guest at our wedding
        </p>

        <h1 className="text-5xl md:text-7xl text-[#6B5787] mb-2 tracking-wide leading-[1.15] font-['Alex_Brush',_'Great_Vibes',_cursive] font-normal drop-shadow-sm">
          Vinoliya & Samdaniel
        </h1>

        <div className="my-8 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="h-[1px] bg-[#9B7B56]/50 flex-1 max-w-[80px]" />
            <span className="text-[#9B7B56] text-xs md:text-sm font-['Cinzel',_serif] uppercase tracking-[0.3em] font-semibold">
              SEPTEMBER
            </span>
            <span className="h-[1px] bg-[#9B7B56]/50 flex-1 max-w-[80px]" />
          </div>

          <div className="flex items-center justify-center gap-4 py-2 border-y border-[#9B7B56]/40 font-['Cinzel',_serif]">
            <span className="text-xs md:text-sm font-semibold tracking-widest text-[#6B5787] uppercase">
              MON
            </span>
            <span className="text-3xl md:text-4xl font-bold font-['Cormorant_Garamond',_serif] text-[#6B5787] px-3">
              14
            </span>
            <span className="text-xs md:text-sm font-semibold tracking-widest text-[#6B5787] uppercase">
              AT 10 AM
            </span>
          </div>

          <p className="text-[#9B7B56] text-xs md:text-sm font-['Cinzel',_serif] font-medium tracking-[0.25em] mt-3">
            2026
          </p>
        </div>

        <div className="flex justify-center items-center gap-3 md:gap-6 font-['Cormorant_Garamond'] text-[#6B5787] bg-[#F5EFF9]/90 backdrop-blur-md px-6 py-2.5 rounded-full w-fit mx-auto shadow-sm border border-[#E6DDF2]">
          <div className="flex flex-col items-center min-w-[40px]">
            <span className="text-2xl md:text-3xl font-semibold leading-none">{timeLeft.days}</span>
            <span className="text-[9px] uppercase tracking-widest text-[#9B7B56] mt-0.5 font-['Cinzel',_serif] font-semibold">Days</span>
          </div>
          <span className="text-lg font-light text-[#A28BBF] -mt-2">:</span>
          <div className="flex flex-col items-center min-w-[40px]">
            <span className="text-2xl md:text-3xl font-semibold leading-none">{timeLeft.hours}</span>
            <span className="text-[9px] uppercase tracking-widest text-[#9B7B56] mt-0.5 font-['Cinzel',_serif] font-semibold">Hours</span>
          </div>
          <span className="text-lg font-light text-[#A28BBF] -mt-2">:</span>
          <div className="flex flex-col items-center min-w-[40px]">
            <span className="text-2xl md:text-3xl font-semibold leading-none">{timeLeft.minutes}</span>
            <span className="text-[9px] uppercase tracking-widest text-[#9B7B56] mt-0.5 font-['Cinzel',_serif] font-semibold">Mins</span>
          </div>
          <span className="text-lg font-light text-[#A28BBF] -mt-2">:</span>
          <div className="flex flex-col items-center min-w-[40px]">
            <span className="text-2xl md:text-3xl font-semibold leading-none">{timeLeft.seconds}</span>
            <span className="text-[9px] uppercase tracking-widest text-[#9B7B56] mt-0.5 font-['Cinzel',_serif] font-semibold">Secs</span>
          </div>
        </div>
      </div>

      {/* Unified Tab Bar Slider (High Z-Index so it is ALWAYS on top) */}
      <div className="flex items-center justify-center mb-14 relative z-40">
        <div className="bg-[#FAF7FC]/95 backdrop-blur-md p-1.5 rounded-full border border-[#E6DDF2] shadow-lg flex items-center gap-1 relative">
          {cards.map((c) => {
            const isSelected = c.id === activeCardId;
            return (
              <button
                key={c.id}
                onClick={() => scrollToCard(c.id)}
                className={`relative px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-colors duration-300 z-10 cursor-pointer ${
                  isSelected ? 'text-white' : 'text-[#6B5787] hover:text-[#4A3963]'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="unifiedTabSlider"
                    className="absolute inset-0 bg-[#6B5787] rounded-full shadow-md -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {c.tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Wallet-Style Card Stack Container */}
      <div className="relative w-full max-w-md mx-auto h-[530px] md:h-[570px] z-10 flex justify-center items-start mb-16 pt-2">
        {cards.map((card) => {
          const isSelected = card.id === activeCardId;
          const orderOffset = card.id - activeCardId;

          // Controlled offsets so stacked cards stay within bounds below z-40 slider
          const yPos = isSelected ? 0 : (orderOffset < 0 ? orderOffset * 35 : orderOffset * 48);
          const scaleVal = isSelected ? 1 : Math.max(0.88, 1 - Math.abs(orderOffset) * 0.06);
          const zIndexVal = isSelected ? 30 : 20 - Math.abs(orderOffset) * 5;

          return (
            <motion.div
              key={card.id}
              onClick={() => setActiveCardId(card.id)}
              initial={false}
              animate={{
                y: yPos,
                scale: scaleVal,
                zIndex: zIndexVal,
                opacity: isSelected ? 1 : 0.9,
              }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 28,
              }}
              whileHover={{
                y: isSelected ? -8 : yPos - 8,
                scale: isSelected ? 1.02 : scaleVal + 0.02,
              }}
              className="absolute top-0 w-full max-w-[370px] bg-[#FAF7FC] rounded-[34px] p-3.5 md:p-4 shadow-[0_25px_60px_rgba(107,87,135,0.18)] border border-[#E6DDF2] transition-shadow duration-300 flex flex-col justify-between cursor-pointer select-none"
            >
              {/* Top Media Box with Hero Image */}
              <div className="relative rounded-[24px] overflow-hidden aspect-[4/3] w-full shadow-inner bg-stone-900 group">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Bottom Scrim / Dark Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />

                {/* Bottom Content Overlay inside Top Photo Box */}
                <div className="absolute inset-x-4 md:inset-x-5 bottom-4 flex items-end justify-between gap-2 text-white">
                  <div className="flex flex-col gap-0.5 max-w-[65%]">
                    <h2 className="text-lg md:text-xl font-bold text-white tracking-tight leading-tight drop-shadow-sm font-['Montserrat']">
                      {card.title}
                    </h2>
                    <p className="text-xs text-stone-200/90 font-medium tracking-wide font-['Montserrat'] truncate">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Directions Pill Button */}
                  <a
                    href={card.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#6B5787] hover:bg-[#584572] text-white px-3.5 md:px-4 py-2 rounded-full text-[11px] md:text-xs font-semibold tracking-wide flex items-center gap-1 shadow-lg backdrop-blur-md border border-white/10 transition-all duration-200 active:scale-95 shrink-0"
                  >
                    <span>Directions</span>
                  </a>
                </div>
              </div>

              {/* Bottom Card Details Section */}
              <div className="px-2 pt-3 pb-1">
                {/* Header Title & Subtitle */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#6B5787] tracking-tight font-['Montserrat']">
                      {card.tagline}
                    </h3>
                    <span className="text-[10px] font-bold tracking-widest uppercase bg-[#F0EBF7] text-[#6B5787] px-2.5 py-0.5 rounded-full">
                      {card.tag}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 font-medium leading-relaxed font-['Montserrat'] mt-1">
                    {card.description}
                  </p>
                </div>

                {/* Horizontal Divider Line */}
                <div className="border-b border-[#9B7B56]/30 my-3" />

                {/* Bottom Row: Stats Columns */}
                <div className="flex items-center justify-between px-1">
                  {/* Stat 1 */}
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-bold text-[#6B5787] font-['Montserrat']">
                      {card.stat1Val}
                    </span>
                    <span className="text-[10px] text-[#9B7B56] font-medium font-['Montserrat'] mt-0.5">
                      {card.stat1Label}
                    </span>
                  </div>

                  {/* Stat 2 */}
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-bold text-[#6B5787] font-['Montserrat']">
                      {card.stat2Val}
                    </span>
                    <span className="text-[10px] text-[#9B7B56] font-medium font-['Montserrat'] mt-0.5">
                      {card.stat2Label}
                    </span>
                  </div>

                  {/* Stat 3 */}
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-bold text-[#6B5787] font-['Montserrat']">
                      {card.stat3Val}
                    </span>
                    <span className="text-[10px] text-[#9B7B56] font-medium font-['Montserrat'] mt-0.5">
                      {card.stat3Label}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Minimal Simple Floating Music Player */}
      <div className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-50">
        <audio
          ref={audioRef}
          loop
          preload="auto"
          src={bgMusic}
        />

        <div className="flex items-center gap-3 bg-[#FAF7FC]/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#E6DDF2] shadow-[0_10px_25px_rgba(107,87,135,0.15)]">
          {/* Animated Mini Disc Icon */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ repeat: isPlaying ? Infinity : 0, duration: 4, ease: "linear" }}
            className="w-7 h-7 rounded-full bg-[#35274A] flex items-center justify-center relative border border-[#543D73] shadow-sm shrink-0"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#E8DFF2] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#35274A]" />
            </div>
          </motion.div>

          {/* Song Label */}
          <span className="text-xs font-semibold text-[#6B5787] font-['Cinzel',_serif] tracking-wide pr-1">
            Music
          </span>

          {/* Simple Play / Pause Button */}
          <button
            onClick={toggleMusic}
            className="w-8 h-8 rounded-full bg-[#6B5787] hover:bg-[#584572] text-white flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" className="ml-0.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
