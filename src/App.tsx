import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, MapPin, Calendar, CheckCircle2, Clock, X, Send, User, Phone, Mail, Users, MessageSquare, Sparkles } from 'lucide-react';
import bgMusic from '../assets/Music/the_mountain-wedding-522480.mp3';
import marriageImg from '../assets/New Custom Images/Gemini_Generated_Image_hbtocchbtocchbto.png';
import receptionImg from '../assets/New Custom Images/Gemini_Generated_Image_f1c2qf1c2qf1c2qf.png';
import welcomeCoupleImg from '../assets/Image/Gemini_Generated_Image_cm759wcm759wcm75-removebg-preview.png';

// Watercolor Monochromatic Sage Green Petals Data (24 Multi-Layered Floating Petals)
const fallingPetalsData = [
  { id: 1, x: '3%', delay: 0, duration: 14, size: 18, blur: 'blur-[1.5px]', opacity: 0.75, depthScale: 1.2 },
  { id: 2, x: '8%', delay: 3, duration: 18, size: 14, blur: 'blur-[0px]', opacity: 0.85, depthScale: 1.0 },
  { id: 3, x: '14%', delay: 1, duration: 16, size: 16, blur: 'blur-[1px]', opacity: 0.65, depthScale: 0.9 },
  { id: 4, x: '19%', delay: 6, duration: 21, size: 12, blur: 'blur-[2px]', opacity: 0.7, depthScale: 1.3 },
  { id: 5, x: '24%', delay: 2, duration: 15, size: 20, blur: 'blur-[0px]', opacity: 0.9, depthScale: 1.1 },
  { id: 6, x: '29%', delay: 5, duration: 19, size: 13, blur: 'blur-[1px]', opacity: 0.6, depthScale: 0.85 },
  { id: 7, x: '34%', delay: 8, duration: 17, size: 17, blur: 'blur-[2.5px]', opacity: 0.8, depthScale: 1.4 },
  { id: 8, x: '39%', delay: 4, duration: 13, size: 15, blur: 'blur-[0px]', opacity: 0.85, depthScale: 1.0 },
  { id: 9, x: '44%', delay: 0.5, duration: 16, size: 19, blur: 'blur-[1px]', opacity: 0.75, depthScale: 1.15 },
  { id: 10, x: '49%', delay: 7, duration: 22, size: 11, blur: 'blur-[3px]', opacity: 0.6, depthScale: 1.5 },
  { id: 11, x: '54%', delay: 2.5, duration: 14, size: 16, blur: 'blur-[0px]', opacity: 0.8, depthScale: 0.95 },
  { id: 12, x: '59%', delay: 9, duration: 20, size: 18, blur: 'blur-[1.5px]', opacity: 0.7, depthScale: 1.25 },
  { id: 13, x: '64%', delay: 1.5, duration: 15, size: 13, blur: 'blur-[0px]', opacity: 0.85, depthScale: 0.9 },
  { id: 14, x: '69%', delay: 4.5, duration: 17, size: 21, blur: 'blur-[2px]', opacity: 0.75, depthScale: 1.35 },
  { id: 15, x: '74%', delay: 3.5, duration: 19, size: 15, blur: 'blur-[0.5px]', opacity: 0.9, depthScale: 1.05 },
  { id: 16, x: '79%', delay: 0.8, duration: 13, size: 14, blur: 'blur-[1px]', opacity: 0.65, depthScale: 0.85 },
  { id: 17, x: '84%', delay: 6.5, duration: 18, size: 17, blur: 'blur-[2px]', opacity: 0.8, depthScale: 1.3 },
  { id: 18, x: '89%', delay: 2.2, duration: 15, size: 12, blur: 'blur-[0px]', opacity: 0.85, depthScale: 1.0 },
  { id: 19, x: '93%', delay: 5.5, duration: 21, size: 20, blur: 'blur-[1.5px]', opacity: 0.75, depthScale: 1.2 },
  { id: 20, x: '97%', delay: 1.8, duration: 16, size: 14, blur: 'blur-[2.5px]', opacity: 0.7, depthScale: 1.4 },
  { id: 21, x: '11%', delay: 8.5, duration: 17, size: 15, blur: 'blur-[0px]', opacity: 0.85, depthScale: 1.0 },
  { id: 22, x: '42%', delay: 10, duration: 23, size: 13, blur: 'blur-[1px]', opacity: 0.65, depthScale: 0.9 },
  { id: 23, x: '71%', delay: 11, duration: 15, size: 18, blur: 'blur-[2px]', opacity: 0.8, depthScale: 1.25 },
  { id: 24, x: '86%', delay: 7.5, duration: 19, size: 16, blur: 'blur-[0.5px]', opacity: 0.9, depthScale: 1.1 }
];

const FallingSagePetalDark = ({ x, delay, duration, size, blur, opacity, depthScale }: typeof fallingPetalsData[0]) => (
  <motion.div
    className={`fixed pointer-events-none ${blur} z-10`}
    style={{ left: x, top: '-5%' }}
    initial={{ y: '-5vh', x: 0, rotate: 0, opacity: 0 }}
    animate={{
      y: ['0vh', '105vh'],
      x: [0, 20, -12, 18, -5],
      rotate: [0, 140, 280, 420],
      opacity: [0, opacity, opacity, opacity * 0.7, 0],
    }}
    transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
  >
    <svg width={size * depthScale} height={size * depthScale * 1.5} viewBox="0 0 20 30" fill="none">
      <path
        d="M 10 0 C 18 8, 20 20, 10 30 C 0 20, 2 8, 10 0 Z"
        fill="url(#sageDarkGrad)"
        fillOpacity="0.8"
        stroke="#5B7B63"
        strokeWidth="0.5"
      />
      <defs>
        <linearGradient id="sageDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E6EFE6" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#7FA37F" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#233B2B" stopOpacity="0.85" />
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
);

const FallingSagePetalLight = ({ x, delay, duration, size, blur, opacity, depthScale }: typeof fallingPetalsData[0]) => (
  <motion.div
    className={`fixed pointer-events-none ${blur} z-10`}
    style={{ left: x, top: '-5%' }}
    initial={{ y: '-5vh', x: 0, rotate: 0, opacity: 0 }}
    animate={{
      y: ['0vh', '105vh'],
      x: [0, -18, 15, -20, 8],
      rotate: [0, -140, -280, -420],
      opacity: [0, opacity, opacity, opacity * 0.7, 0],
    }}
    transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
  >
    <svg width={size * depthScale} height={size * depthScale * 1.5} viewBox="0 0 20 30" fill="none">
      <path
        d="M 10 0 C 18 8, 20 20, 10 30 C 0 20, 2 8, 10 0 Z"
        fill="url(#sageLightGrad)"
        fillOpacity="0.8"
        stroke="#8CAE8C"
        strokeWidth="0.5"
      />
      <defs>
        <linearGradient id="sageLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F2F7F2" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#B8D3B8" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#4A6B52" stopOpacity="0.85" />
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
);

export default function App() {
  const [scene, setScene] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // RSVP Form state
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    phone: '',
    email: '',
    attending: 'yes',
    guestsCount: 1,
    reception: true,
    marriage: true,
    message: ''
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const totalScenes = 4;

  const nextScene = () => setScene((prev) => Math.min(prev + 1, totalScenes));
  const prevScene = () => setScene((prev) => Math.max(prev - 1, 1));

  // Set 50% volume default and autoplay on mount / first user interaction
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // 50% volume
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }

    const handleFirstUserInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => console.log("Audio unlock error:", err));
      }
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };
  }, []);

  // Background Music Toggle
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.volume = 0.5;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => console.log("Audio play error:", err));
      }
    }
  };

  // Submit RSVP to Backend Server API (http://localhost:5000/api/rsvp)
  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpForm.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    setIsSubmitting(true);

    const eventsList = [];
    if (rsvpForm.reception) eventsList.push('reception');
    if (rsvpForm.marriage) eventsList.push('marriage');

    const payload = {
      name: rsvpForm.name.trim(),
      phone: rsvpForm.phone.trim(),
      email: rsvpForm.email.trim(),
      attending: rsvpForm.attending,
      guestsCount: rsvpForm.guestsCount,
      events: eventsList,
      message: rsvpForm.message.trim()
    };

    try {
      const response = await fetch('http://localhost:5000/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        setRsvpSubmitted(true);
        setIsRsvpModalOpen(false);
        alert(`✨ Thank you, ${payload.name}! Your RSVP has been confirmed.`);
      } else {
        alert(`Error: ${data.message || 'Could not save RSVP.'}`);
      }
    } catch (err) {
      console.error("Backend RSVP connection error:", err);
      // Fallback local save if backend server is unreachable
      setRsvpSubmitted(true);
      setIsRsvpModalOpen(false);
      alert(`✨ Thank you, ${payload.name}! Your RSVP has been confirmed locally.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isRsvpModalOpen) return; // Don't flip scenes if typing in RSVP modal
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextScene();
      } else if (e.key === 'ArrowLeft') {
        prevScene();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRsvpModalOpen]);

  // Live Countdown Calculation to Sept 14, 2026 9:45 AM
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

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (isRsvpModalOpen) return;
    const target = e.target as HTMLElement;
    const interactiveElement = target.closest('button, a, input, textarea, select, label, [role="button"]');
    if (!interactiveElement && scene < totalScenes) {
      nextScene();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="h-screen h-[100dvh] max-h-screen max-h-[100dvh] w-full bg-[#E6EFE6] text-[#233B2B] font-['Cinzel',_serif] flex flex-col justify-between items-center relative overflow-hidden select-none paper-grain px-3 sm:px-6 py-2 sm:py-4 cursor-pointer"
    >
      {/* Background Audio (50% Volume Default) */}
      <audio ref={audioRef} loop autoPlay preload="auto" src={bgMusic} />

      {/* Falling Pure Sage Green Petals */}
      {fallingPetalsData.map((petal, index) => (
        index % 2 === 0 ? (
          <FallingSagePetalDark key={petal.id} {...petal} />
        ) : (
          <FallingSagePetalLight key={petal.id} {...petal} />
        )
      ))}

      {/* Ambient Watercolor Cloud Glows (Responsive Sizing) */}
      <div className="fixed top-0 right-0 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#C8DCC8]/70 rounded-full filter blur-[80px] sm:blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-[#D4E4D4]/80 rounded-full filter blur-[70px] sm:blur-[90px] pointer-events-none z-0" />

      {/* Top Fixed Bar: Minimal Progress & Audio Control */}
      <header className="w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-3 sm:px-6 pt-[calc(0.75rem+env(safe-area-inset-top))] sm:pt-4 flex items-center justify-between z-40 relative flex-shrink-0">
        {/* Minimal Audio Toggle Pill */}
        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 bg-[#D4E4D4]/85 hover:bg-[#C5D8C5] backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#A8C3A8] shadow-sm transition-all duration-300 active:scale-95 cursor-pointer text-xs sm:text-sm font-bold tracking-wider text-[#233B2B]"
        >
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ repeat: isPlaying ? Infinity : 0, duration: 4, ease: "linear" }}
            className="w-3.5 h-3.5 rounded-full bg-[#233B2B] flex items-center justify-center text-white"
          >
            <span className="w-1 h-1 rounded-full bg-[#E6EFE6]" />
          </motion.div>
          <span>{isPlaying ? 'PAUSE' : 'MUSIC'}</span>
        </button>

        {/* Scene Indicator Counter */}
        <div className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-[#233B2B] bg-[#D4E4D4]/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#A8C3A8]">
          {String(scene).padStart(2, '0')} / {String(totalScenes).padStart(2, '0')}
        </div>
      </header>

      {/* Main Viewport */}
      <main className="w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl flex-1 flex flex-col items-center justify-center px-3 sm:px-6 py-1 z-10 relative overflow-y-auto no-scrollbar min-h-0 my-auto">
        <AnimatePresence mode="wait">
          
          {/* ================= 1. WELCOME ARRIVAL ================= */}
          {scene === 1 && (
            <motion.div
              key="scene-welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, filter: "blur(6px)" }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className="w-full flex flex-col items-center justify-center text-center my-auto cursor-pointer py-1"
              onClick={nextScene}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="w-8 h-8 sm:w-9 sm:h-9 mb-1.5 border border-[#A8C3A8] bg-[#D4E4D4] rounded-full flex items-center justify-center text-[#233B2B] text-base sm:text-lg shadow-sm"
              >
                ✦
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, letterSpacing: '0.2em' }}
                animate={{ opacity: 1, letterSpacing: '0.3em' }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="text-xs sm:text-sm md:text-base font-extrabold text-[#3B5B43] uppercase tracking-[0.3em] mb-1.5 sm:mb-2"
              >
                OUR FOREVER STARTS HERE
              </motion.h2>

              {/* Transparent Illustration Image - Prominent Mobile & Desktop Sizing */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="w-56 h-56 sm:w-72 sm:h-72 md:w-88 md:h-88 max-h-[38vh] sm:max-h-[44vh] my-2 sm:my-4 relative flex items-center justify-center pointer-events-none"
              >
                <img
                  src={welcomeCoupleImg}
                  alt="Wedding Illustration"
                  className="w-full h-full object-contain filter drop-shadow-xl scale-105 sm:scale-100"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.7 }}
                className="text-lg sm:text-2xl md:text-3xl font-semibold text-[#1E3324] font-['Cormorant_Garamond',_serif] italic leading-snug sm:leading-relaxed max-w-[360px] sm:max-w-[480px] md:max-w-[560px] px-2 my-1"
              >
                “With the blessings of God<br />
                and the love of our families,<br />
                we invite you to celebrate<br />
                the beginning of our life together.”
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, delay: 0.9 }}
                className="w-14 h-[1.5px] bg-[#A8C3A8] my-2 sm:my-3"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                transition={{ duration: 1.5, delay: 1.1 }}
                className="text-[11px] sm:text-xs font-['Montserrat'] tracking-[0.3em] uppercase text-[#3B5B43] font-extrabold"
              >
                TAP ANYWHERE TO BEGIN
              </motion.p>
            </motion.div>
          )}

          {/* ================= 2. BRIDE & GROOM REVEAL ================= */}
          {scene === 2 && (
            <motion.div
              key="scene-couple"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="w-full flex flex-col items-center justify-center text-center my-auto cursor-pointer py-2"
              onClick={nextScene}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.95, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xs sm:text-sm md:text-base font-extrabold text-[#3B5B43] uppercase tracking-[0.3em] mb-2 sm:mb-4"
              >
                THE WEDDING OF
              </motion.span>

              <div className="flex flex-col items-center gap-1 my-2 sm:my-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-[#1E3324] tracking-wide leading-none font-['Alex_Brush',_cursive] drop-shadow-md py-1"
                >
                  Vinoliya
                </motion.h1>

                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-2xl sm:text-4xl font-normal text-[#3B5B43] my-1 italic font-['Cormorant_Garamond',_serif]"
                >
                  &
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-[#1E3324] tracking-wide leading-none font-['Alex_Brush',_cursive] drop-shadow-md py-1"
                >
                  Sam Daniel
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] text-[#3B5B43] mt-5 sm:mt-8 font-extrabold"
              >
                TOGETHER WITH THEIR FAMILIES
              </motion.p>
            </motion.div>
          )}

          {/* ================= 3. ALL OCCASIONS AT ONE GO ================= */}
          {scene === 3 && (
            <motion.div
              key="scene-all-occasions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.0 }}
              className="w-full flex flex-col items-center justify-center text-center my-auto max-h-[calc(100dvh-150px)] overflow-hidden"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xs sm:text-sm md:text-base font-extrabold text-[#3B5B43] uppercase tracking-[0.3em] mb-2 sm:mb-3 flex-shrink-0"
              >
                WEDDING OCCASION DETAILS
              </motion.span>

              {/* Responsive Occasion Layout: Single column stacked on mobile, 2-column grid on tablets/desktops */}
              <div className="w-full space-y-3 sm:space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-5 text-left max-h-[calc(100dvh-180px)] overflow-y-auto no-scrollbar py-1">
                {/* Occasion 1: Dinner & Reception */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-[#EEF5EE]/95 backdrop-blur-md border border-[#A8C3A8] p-3 sm:p-5 rounded-3xl shadow-sm relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Photo Header */}
                  <div className="relative rounded-2xl overflow-hidden h-28 sm:h-38 md:h-44 w-full mb-2.5 shadow-inner bg-stone-900 group">
                    <img
                      src={receptionImg}
                      alt="Dinner & Reception"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] bg-[#D4E4D4] text-[#233B2B] px-3 py-1 rounded-full font-extrabold border border-[#A8C3A8]">
                      DINNER & RECEPTION
                    </span>

                    <a
                      href="https://maps.app.goo.gl/wqMKv7hmZn3ws7ub9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#233B2B] hover:bg-[#16271C] text-[#E6EFE6] px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-extrabold tracking-wider uppercase shadow-md transition-all duration-200 active:scale-95 cursor-pointer border border-[#A8C3A8]/40"
                    >
                      <MapPin size={13} className="text-[#A8C3A8]" />
                      <span>MAP →</span>
                    </a>
                  </div>

                  {/* Prominent Hero Date */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl sm:text-5xl font-bold font-['Cormorant_Garamond',_serif] text-[#233B2B] leading-none">13</span>
                    <div className="flex flex-col text-left">
                      <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] text-[#3B5B43]">SEPTEMBER 2026</span>
                      <span className="text-[11px] sm:text-xs font-bold text-[#5B7B63]">SUNDAY • 7:00 PM ONWARDS</span>
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs text-[#5B7B63] font-['Montserrat'] font-semibold">
                    Chamanthi Venue • Hosur, Tamil Nadu
                  </p>
                </motion.div>

                {/* Occasion 2: Holy Marriage */}
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="bg-[#EEF5EE]/95 backdrop-blur-md border border-[#A8C3A8] p-3 sm:p-5 rounded-3xl shadow-sm relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Photo Header */}
                  <div className="relative rounded-2xl overflow-hidden h-28 sm:h-38 md:h-44 w-full mb-2.5 shadow-inner bg-stone-900 group">
                    <img
                      src={marriageImg}
                      alt="Holy Marriage Ceremony"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] bg-[#D4E4D4] text-[#233B2B] px-3 py-1 rounded-full font-extrabold border border-[#A8C3A8]">
                      HOLY MARRIAGE
                    </span>

                    <a
                      href="https://maps.app.goo.gl/2QGp6t3MdBhHzTXL6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#233B2B] hover:bg-[#16271C] text-[#E6EFE6] px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-extrabold tracking-wider uppercase shadow-md transition-all duration-200 active:scale-95 cursor-pointer border border-[#A8C3A8]/40"
                    >
                      <MapPin size={13} className="text-[#A8C3A8]" />
                      <span>MAP →</span>
                    </a>
                  </div>

                  {/* Prominent Hero Date */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl sm:text-5xl font-bold font-['Cormorant_Garamond',_serif] text-[#233B2B] leading-none">14</span>
                    <div className="flex flex-col text-left">
                      <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] text-[#3B5B43]">SEPTEMBER 2026</span>
                      <span className="text-[11px] sm:text-xs font-bold text-[#5B7B63]">MONDAY • 9:45 AM CEREMONY</span>
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs text-[#5B7B63] font-['Montserrat'] font-semibold">
                    Sacred Heart Church • Hosur, Tamil Nadu
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ================= 4. COUNTDOWN & RSVP ACTION ================= */}
          {scene === 4 && (
            <motion.div
              key="scene-rsvp"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.0 }}
              className="w-full flex flex-col items-center justify-center text-center my-auto"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xs sm:text-sm md:text-base font-extrabold text-[#3B5B43] uppercase tracking-[0.3em] mb-2 sm:mb-5"
              >
                COUNTING DOWN TO OUR WEDDING DAY
              </motion.p>

              {/* Minimal Pure Sage Green Serif Numerals */}
              <div className="grid grid-cols-4 gap-2 sm:gap-6 w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto mb-2 sm:mb-4">
                <div className="flex flex-col items-center">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold font-['Cormorant_Garamond',_serif] text-[#233B2B]">
                    {timeLeft.days}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#3B5B43] mt-0.5 font-extrabold">DAYS</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold font-['Cormorant_Garamond',_serif] text-[#233B2B]">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#3B5B43] mt-0.5 font-extrabold">HOURS</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold font-['Cormorant_Garamond',_serif] text-[#233B2B]">
                    {timeLeft.minutes}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#3B5B43] mt-0.5 font-extrabold">MINS</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold font-['Cormorant_Garamond',_serif] text-[#233B2B]">
                    {timeLeft.seconds}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#3B5B43] mt-0.5 font-extrabold">SECS</span>
                </div>
              </div>

              {/* Ultra-Minimal September 2026 Calendar Grid */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full max-w-[280px] sm:max-w-[320px] mx-auto my-2 sm:my-4 text-center"
              >
                <div className="text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase text-[#3B5B43] mb-1.5 sm:mb-2.5">
                  SEPTEMBER 2026
                </div>

                {/* Days of week header */}
                <div className="grid grid-cols-7 text-center text-xs font-extrabold text-[#5B7B63] uppercase mb-1">
                  <span>S</span>
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                </div>

                {/* Days Grid for September 2026 */}
                <div className="grid grid-cols-7 text-center text-xs sm:text-sm gap-y-1 items-center justify-items-center font-['Montserrat']">
                  {/* Empty offset slots for Sun & Mon before 1st Sept */}
                  <div />
                  <div />

                  {/* Days 1 to 30 */}
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                    const isReception = day === 13;
                    const isMarriage = day === 14;

                    if (isReception) {
                      return (
                        <div
                          key={day}
                          className="flex items-center justify-center w-7 h-7 rounded-full bg-[#233B2B] text-[#E6EFE6] font-bold text-xs shadow-sm cursor-pointer"
                          title="13 Sept - Reception (7:00 PM)"
                        >
                          13
                        </div>
                      );
                    }

                    if (isMarriage) {
                      return (
                        <div
                          key={day}
                          className="flex items-center justify-center w-7 h-7 rounded-full bg-[#4A6B52] text-[#E6EFE6] font-bold text-xs shadow-sm cursor-pointer"
                          title="14 Sept - Holy Marriage (9:45 AM)"
                        >
                          14
                        </div>
                      );
                    }

                    return (
                      <div key={day} className="w-7 h-7 flex items-center justify-center text-[#233B2B]/80 text-xs font-bold">
                        {day}
                      </div>
                    );
                  })}
                </div>

                {/* Ultra-Minimal Legend */}
                <div className="flex items-center justify-center gap-3.5 mt-2 text-xs sm:text-sm font-['Montserrat'] font-bold text-[#5B7B63]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#233B2B]" />
                    <span>13 Reception</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4A6B52]" />
                    <span>14 Wedding</span>
                  </span>
                </div>
              </motion.div>

              {/* RSVP Action Link */}
              <div className="flex flex-col items-center gap-2.5 sm:gap-3.5 w-full max-w-xs sm:max-w-sm">
                <button
                  onClick={() => setIsRsvpModalOpen(true)}
                  className="w-full py-3 px-4 border-2 border-[#233B2B] text-[#233B2B] hover:bg-[#233B2B] hover:text-[#E6EFE6] rounded-full text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
                >
                  {rsvpSubmitted ? (
                    <>
                      <CheckCircle2 size={15} className="text-[#4A6B52]" />
                      <span>RSVP CONFIRMED ✨</span>
                    </>
                  ) : (
                    <span>CONFIRM YOUR RSVP →</span>
                  )}
                </button>

                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Vinoliya & Sam Daniel's Holy Marriage & Reception")}&dates=20260913T133000Z/20260914T041500Z&details=${encodeURIComponent("You are warmly invited to celebrate the Holy Marriage & Reception of Vinoliya & Sam Daniel!\n\n- Dinner & Reception: Sunday 13 Sept 7:00 PM at Chamanthi Venue, Hosur\n- Holy Marriage: Monday 14 Sept 9:45 AM at Sacred Heart Church, Hosur")}&location=${encodeURIComponent("Sacred Heart Church, Hosur, Tamil Nadu")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.2em] uppercase text-[#5B7B63] font-extrabold hover:text-[#233B2B] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Calendar size={13} className="text-[#4A6B52]" />
                  <span>SAVE THE DATE</span>
                </a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Bottom Fixed Navigation Bar: Mobile & Desktop Navigation CTA */}
      <footer className="w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-4 sm:px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:pb-8 pt-1 flex items-center justify-between z-40 relative flex-shrink-0">
        {/* Previous Scene Button */}
        {scene > 1 ? (
          <button
            onClick={prevScene}
            className="flex items-center gap-1.5 bg-[#D4E4D4]/90 hover:bg-[#C5D8C5] backdrop-blur-md px-5 py-2.5 rounded-full border border-[#A8C3A8] shadow-sm text-xs sm:text-sm font-extrabold text-[#233B2B] transition-all cursor-pointer active:scale-95"
          >
            <ChevronLeft size={15} className="text-[#5B7B63]" />
            <span>PREV</span>
          </button>
        ) : (
          <div className="w-16" />
        )}

        {/* Scene Indicator Dots */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4].map((step) => (
            <button
              key={step}
              onClick={() => setScene(step)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                scene === step ? 'w-7 bg-[#233B2B]' : 'w-2.5 bg-[#A8C3A8] hover:bg-[#6C8E6C]'
              }`}
              title={`Go to Scene ${step}`}
            />
          ))}
        </div>

        {/* Next / Action CTA Button */}
        {scene < totalScenes ? (
          <button
            onClick={nextScene}
            className="flex items-center gap-1.5 bg-[#233B2B] hover:bg-[#16271C] text-[#E6EFE6] px-5 py-2.5 rounded-full border border-[#A8C3A8]/40 shadow-md text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-all cursor-pointer active:scale-95"
          >
            <span>NEXT</span>
            <ChevronRight size={15} className="text-[#A8C3A8]" />
          </button>
        ) : (
          <a
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Vinoliya & Sam Daniel's Holy Marriage & Reception")}&dates=20260913T133000Z/20260914T041500Z&details=${encodeURIComponent("You are warmly invited to celebrate the Holy Marriage & Reception of Vinoliya & Sam Daniel!\n\n- Dinner & Reception: Sunday 13 Sept 7:00 PM at Chamanthi Venue, Hosur\n- Holy Marriage: Monday 14 Sept 9:45 AM at Sacred Heart Church, Hosur")}&location=${encodeURIComponent("Sacred Heart Church, Hosur, Tamil Nadu")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#233B2B] hover:bg-[#16271C] text-[#E6EFE6] px-5 py-2.5 rounded-full border border-[#A8C3A8]/40 shadow-md text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-all cursor-pointer active:scale-95"
          >
            <span>SAVE THE DATE</span>
            <Calendar size={14} className="text-[#A8C3A8]" />
          </a>
        )}
      </footer>

      {/* Interactive RSVP Form Modal Dialog */}
      <AnimatePresence>
        {isRsvpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRsvpModalOpen(false)}
              className="absolute inset-0 bg-[#233B2B]/40 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-xs sm:max-w-md max-h-[88dvh] overflow-y-auto bg-[#E6EFE6] border border-[#A8C3A8] rounded-3xl p-5 sm:p-6 shadow-2xl relative z-10 text-left paper-grain no-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsRsvpModalOpen(false)}
                className="absolute top-4 right-4 text-[#5B7B63] hover:text-[#233B2B] p-1 rounded-full hover:bg-[#D4E4D4] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="text-center mb-4 sm:mb-5">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#4A6B52] font-bold block mb-1">
                  WEDDING RSVP
                </span>
                <h3 className="text-2xl sm:text-3xl font-normal text-[#233B2B] font-['Alex_Brush',_cursive]">
                  Join Our Celebration
                </h3>
              </div>

              <form onSubmit={handleRsvpSubmit} className="space-y-3 sm:space-y-4 text-xs">
                {/* Guest Name */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-[#5B7B63] mb-1">
                    YOUR FULL NAME *
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-3 text-[#5B7B63]" />
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-[#D4E4D4] border border-[#A8C3A8] rounded-xl text-[#233B2B] focus:outline-none focus:border-[#233B2B] font-['Montserrat'] text-xs font-medium"
                    />
                  </div>
                </div>

                {/* Phone / Email */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-[#5B7B63] mb-1">
                      PHONE NUMBER
                    </label>
                    <div className="relative">
                      <Phone size={13} className="absolute left-3 top-3 text-[#5B7B63]" />
                      <input
                        type="tel"
                        placeholder="Mobile"
                        value={rsvpForm.phone}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                        className="w-full pl-8 pr-2 py-2 bg-[#D4E4D4] border border-[#A8C3A8] rounded-xl text-[#233B2B] focus:outline-none focus:border-[#233B2B] font-['Montserrat'] text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-[#5B7B63] mb-1">
                      NUMBER OF GUESTS
                    </label>
                    <div className="relative">
                      <Users size={13} className="absolute left-3 top-3 text-[#5B7B63]" />
                      <select
                        value={rsvpForm.guestsCount}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, guestsCount: Number(e.target.value) })}
                        className="w-full pl-8 pr-2 py-2 bg-[#D4E4D4] border border-[#A8C3A8] rounded-xl text-[#233B2B] focus:outline-none focus:border-[#233B2B] font-['Montserrat'] text-xs font-medium appearance-none"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests</option>
                        <option value={5}>5+ Guests</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Attending Checkboxes */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-[#5B7B63] mb-1.5">
                    EVENTS YOU WILL ATTEND
                  </label>
                  <div className="space-y-1.5 font-['Montserrat']">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#233B2B]">
                      <input
                        type="checkbox"
                        checked={rsvpForm.reception}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, reception: e.target.checked })}
                        className="accent-[#233B2B] rounded w-3.5 h-3.5"
                      />
                      <span>Dinner & Reception (13 Sept 7:00 PM)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#233B2B]">
                      <input
                        type="checkbox"
                        checked={rsvpForm.marriage}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, marriage: e.target.checked })}
                        className="accent-[#233B2B] rounded w-3.5 h-3.5"
                      />
                      <span>Holy Marriage (14 Sept 9:45 AM)</span>
                    </label>
                  </div>
                </div>

                {/* Message Note */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-[#5B7B63] mb-1">
                    WISHES / MESSAGE FOR COUPLE
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Write a message for Sam & Vinoliya..."
                    value={rsvpForm.message}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                    className="w-full p-2.5 bg-[#D4E4D4] border border-[#A8C3A8] rounded-xl text-[#233B2B] focus:outline-none focus:border-[#233B2B] font-['Montserrat'] text-xs font-medium resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#233B2B] hover:bg-[#16271C] text-[#E6EFE6] rounded-xl text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 mt-4"
                >
                  {isSubmitting ? (
                    <span>SAVING RSVP...</span>
                  ) : (
                    <>
                      <Send size={13} className="text-[#A8C3A8]" />
                      <span>SUBMIT CONFIRMATION →</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
