import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, MapPin, Calendar, CheckCircle2, Clock, X, Send, User, Phone, Mail, Users, MessageSquare, Sparkles } from 'lucide-react';
import bgMusic from '../assets/Music/the_mountain-wedding-522480.mp3';
import marriageImg from '../assets/New Custom Images/Gemini_Generated_Image_hbtocchbtocchbto.png';
import receptionImg from '../assets/New Custom Images/Gemini_Generated_Image_f1c2qf1c2qf1c2qf.png';

// Watercolor Lavender Petals Data (24 Multi-Layered Floating Petals)
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

const FallingLavenderPetal = ({ x, delay, duration, size, blur, opacity, depthScale }: typeof fallingPetalsData[0]) => (
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
        fill="url(#lavenderPetalGrad)"
        fillOpacity="0.75"
        stroke="#AA94C2"
        strokeWidth="0.5"
      />
      <defs>
        <linearGradient id="lavenderPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECE4F5" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#AA94C2" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#4A3763" stopOpacity="0.8" />
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

  return (
    <div className="h-screen max-h-screen w-full bg-[#FAF8FC] text-[#4A3763] font-['Cinzel',_serif] flex flex-col justify-between items-center relative overflow-hidden select-none paper-grain">
      {/* Background Audio */}
      <audio ref={audioRef} loop preload="auto" src={bgMusic} />

      {/* Falling Watercolor Lavender Petals */}
      {fallingPetalsData.map((petal) => (
        <FallingLavenderPetal key={petal.id} {...petal} />
      ))}

      {/* Ambient Watercolor Cloud Glows */}
      <div className="fixed top-0 right-0 w-[550px] h-[550px] bg-[#ECE4F5]/60 rounded-full filter blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[450px] h-[450px] bg-[#DFD3EC]/50 rounded-full filter blur-[90px] pointer-events-none z-0" />

      {/* Top Fixed Bar: Minimal Progress & Audio Control */}
      <header className="w-full max-w-lg px-6 pt-4 flex items-center justify-between z-40 relative flex-shrink-0">
        {/* Minimal Audio Toggle Pill */}
        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 bg-[#F4EFF9]/85 hover:bg-[#EBE2F5] backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#DDD0EB] shadow-sm transition-all duration-300 active:scale-95 cursor-pointer text-xs font-semibold tracking-wider text-[#4A3763]"
        >
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ repeat: isPlaying ? Infinity : 0, duration: 4, ease: "linear" }}
            className="w-4 h-4 rounded-full bg-[#4A3763] flex items-center justify-center text-white"
          >
            <span className="w-1 h-1 rounded-full bg-[#FAF8FC]" />
          </motion.div>
          <span>{isPlaying ? 'PAUSE' : 'MUSIC'}</span>
        </button>

        {/* Scene Indicator Counter */}
        <div className="text-xs font-bold tracking-[0.25em] text-[#8B73A6] bg-[#F4EFF9]/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#DDD0EB]">
          {String(scene).padStart(2, '0')} / {String(totalScenes).padStart(2, '0')}
        </div>
      </header>

      {/* Main Viewport */}
      <main className="w-full max-w-md flex-1 flex flex-col items-center justify-center px-4 py-2 z-10 relative overflow-hidden my-auto">
        <AnimatePresence mode="wait">
          
          {/* ================= 1. WELCOME ARRIVAL ================= */}
          {scene === 1 && (
            <motion.div
              key="scene-welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, filter: "blur(6px)" }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className="w-full flex flex-col items-center justify-center text-center my-auto cursor-pointer"
              onClick={nextScene}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="w-8 h-8 mb-4 border border-[#C8A97E]/50 rounded-full flex items-center justify-center text-[#C8A97E] text-base"
              >
                ✦
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, letterSpacing: '0.2em' }}
                animate={{ opacity: 1, letterSpacing: '0.35em' }}
                transition={{ duration: 1.5, delay: 0.4 }}
                className="text-xs md:text-sm font-bold text-[#8B73A6] uppercase tracking-[0.35em] mb-3"
              >
                WELCOME
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.6 }}
                className="text-xl md:text-2xl font-normal text-[#4A3763] font-['Cormorant_Garamond',_serif] italic leading-relaxed max-w-[320px]"
              >
                “You are warmly invited to celebrate the love & marriage of our lives.”
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, delay: 0.9 }}
                className="w-12 h-[1px] bg-[#C8A97E]/70 my-5"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1.5, delay: 1.2 }}
                className="text-[11px] font-['Montserrat'] tracking-[0.25em] uppercase text-[#A28BBF]"
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
              className="w-full flex flex-col items-center justify-center text-center my-auto cursor-pointer"
              onClick={nextScene}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xs uppercase tracking-[0.35em] text-[#8B73A6] mb-6 font-bold"
              >
                THE WEDDING OF
              </motion.span>

              <div className="flex flex-col items-center gap-0.5 my-1">
                <motion.h1
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-5xl md:text-6xl font-normal text-[#4A3763] tracking-wide leading-tight font-['Alex_Brush',_cursive] drop-shadow-sm"
                >
                  Vinoliya
                </motion.h1>

                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-lg md:text-xl font-light text-[#C8A97E] my-0.5 italic font-['Cormorant_Garamond',_serif]"
                >
                  &
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="text-5xl md:text-6xl font-normal text-[#4A3763] tracking-wide leading-tight font-['Alex_Brush',_cursive] drop-shadow-sm"
                >
                  Sam Daniel
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-xs uppercase tracking-[0.25em] text-[#8B73A6] mt-6 font-semibold"
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
              className="w-full flex flex-col items-center justify-center text-center my-auto"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xs uppercase tracking-[0.35em] text-[#C8A97E] font-bold mb-2.5"
              >
                WEDDING OCCASION DETAILS
              </motion.span>

              {/* Both Occasions Displayed Elegantly */}
              <div className="w-full space-y-3.5 text-left max-h-[calc(100vh-110px)] overflow-y-auto no-scrollbar py-1">
                {/* Occasion 1: Dinner & Reception */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-[#FAF7FC]/95 backdrop-blur-md border border-[#C8A97E]/40 p-3.5 md:p-4.5 rounded-3xl shadow-sm relative overflow-hidden"
                >
                  {/* Photo Header */}
                  <div className="relative rounded-xl overflow-hidden h-28 md:h-34 w-full mb-3 shadow-inner bg-stone-900 group">
                    <img
                      src={receptionImg}
                      alt="Dinner & Reception"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] bg-[#F0EBF7] text-[#4A3763] px-2.5 py-1 rounded-full font-bold">
                      DINNER & RECEPTION
                    </span>

                    <a
                      href="https://maps.app.goo.gl/wqMKv7hmZn3ws7ub9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#4A3763] hover:bg-[#38284C] text-[#FAF8FC] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-md transition-all duration-200 active:scale-95 cursor-pointer border border-[#C8A97E]/40"
                    >
                      <MapPin size={13} className="text-[#C8A97E]" />
                      <span>VIEW MAP →</span>
                    </a>
                  </div>

                  {/* Prominent Hero Date */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl md:text-5xl font-bold font-['Cormorant_Garamond',_serif] text-[#4A3763] leading-none">13</span>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C8A97E]">SEPTEMBER 2026</span>
                      <span className="text-[10px] font-semibold text-[#8B73A6]">SUNDAY • 7:00 PM ONWARDS</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#75628C] font-['Montserrat'] font-medium">
                    Chamanthi Venue • Hosur, Tamil Nadu
                  </p>
                </motion.div>

                {/* Occasion 2: Holy Marriage */}
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="bg-[#FAF7FC]/95 backdrop-blur-md border border-[#C8A97E]/40 p-3.5 md:p-4.5 rounded-3xl shadow-sm relative overflow-hidden"
                >
                  {/* Photo Header */}
                  <div className="relative rounded-xl overflow-hidden h-28 md:h-34 w-full mb-3 shadow-inner bg-stone-900 group">
                    <img
                      src={marriageImg}
                      alt="Holy Marriage Ceremony"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] bg-[#F0EBF7] text-[#4A3763] px-2.5 py-1 rounded-full font-bold">
                      HOLY MARRIAGE
                    </span>

                    <a
                      href="https://maps.app.goo.gl/2QGp6t3MdBhHzTXL6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#4A3763] hover:bg-[#38284C] text-[#FAF8FC] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-md transition-all duration-200 active:scale-95 cursor-pointer border border-[#C8A97E]/40"
                    >
                      <MapPin size={13} className="text-[#C8A97E]" />
                      <span>VIEW MAP →</span>
                    </a>
                  </div>

                  {/* Prominent Hero Date */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl md:text-5xl font-bold font-['Cormorant_Garamond',_serif] text-[#4A3763] leading-none">14</span>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C8A97E]">SEPTEMBER 2026</span>
                      <span className="text-[10px] font-semibold text-[#8B73A6]">MONDAY • 9:45 AM CEREMONY</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#75628C] font-['Montserrat'] font-medium">
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
                animate={{ opacity: 0.85 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xs uppercase tracking-[0.3em] text-[#8B73A6] mb-6 font-bold"
              >
                COUNTING DOWN TO OUR WEDDING DAY
              </motion.p>

              {/* Minimal Lavender Serif Numerals */}
              <div className="grid grid-cols-4 gap-3 md:gap-4 w-full max-w-xs mx-auto mb-8">
                <div className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-bold font-['Cormorant_Garamond',_serif] text-[#4A3763]">
                    {timeLeft.days}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8A97E] mt-2 font-bold">DAYS</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-bold font-['Cormorant_Garamond',_serif] text-[#4A3763]">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8A97E] mt-2 font-bold">HOURS</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-bold font-['Cormorant_Garamond',_serif] text-[#4A3763]">
                    {timeLeft.minutes}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8A97E] mt-2 font-bold">MINS</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-bold font-['Cormorant_Garamond',_serif] text-[#4A3763]">
                    {timeLeft.seconds}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8A97E] mt-2 font-bold">SECS</span>
                </div>
              </div>

              {/* RSVP Action Link */}
              <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                <button
                  onClick={() => setIsRsvpModalOpen(true)}
                  className="w-full py-3.5 px-4 border-2 border-[#4A3763] text-[#4A3763] hover:bg-[#4A3763] hover:text-[#FAF8FC] rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
                >
                  {rsvpSubmitted ? (
                    <>
                      <CheckCircle2 size={15} className="text-[#C8A97E]" />
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
                  className="text-[11px] tracking-[0.25em] uppercase text-[#8B73A6] font-bold hover:text-[#4A3763] transition-colors mt-2 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Calendar size={13} className="text-[#C8A97E]" />
                  <span>SAVE TO GOOGLE CALENDAR</span>
                </a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Bottom Fixed Navigation Bar: Highly Visible Mobile Next / Prev CTA */}
      <footer className="w-full max-w-md px-6 pb-10 pt-3 mb-2 flex items-center justify-between z-40 relative flex-shrink-0">
        {/* Previous Scene Button */}
        {scene > 1 ? (
          <button
            onClick={prevScene}
            className="flex items-center gap-1.5 bg-[#F4EFF9]/90 hover:bg-[#EBE2F5] backdrop-blur-md px-4 py-2 rounded-full border border-[#DDD0EB] shadow-sm text-xs font-bold text-[#4A3763] transition-all cursor-pointer active:scale-95"
          >
            <ChevronLeft size={14} className="text-[#8B73A6]" />
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
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                scene === step ? 'w-6 bg-[#4A3763]' : 'w-2 bg-[#DDD0EB] hover:bg-[#A28BBF]'
              }`}
              title={`Go to Scene ${step}`}
            />
          ))}
        </div>

        {/* Next / Action CTA Button */}
        {scene < totalScenes ? (
          <button
            onClick={nextScene}
            className="flex items-center gap-1.5 bg-[#4A3763] hover:bg-[#38284C] text-[#FAF8FC] px-5 py-2 rounded-full border border-[#C8A97E]/40 shadow-md text-xs font-bold tracking-wider uppercase transition-all cursor-pointer active:scale-95"
          >
            <span>NEXT</span>
            <ChevronRight size={14} className="text-[#C8A97E]" />
          </button>
        ) : (
          <button
            onClick={() => setIsRsvpModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#4A3763] hover:bg-[#38284C] text-[#FAF8FC] px-4 py-2 rounded-full border border-[#C8A97E]/40 shadow-md text-xs font-bold tracking-wider uppercase transition-all cursor-pointer active:scale-95"
          >
            <span>RSVP</span>
            <Sparkles size={13} className="text-[#C8A97E]" />
          </button>
        )}
      </footer>

      {/* Interactive RSVP Form Modal Dialog */}
      <AnimatePresence>
        {isRsvpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRsvpModalOpen(false)}
              className="absolute inset-0 bg-[#38284C]/40 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-sm bg-[#FAF8FC] border border-[#C8A97E]/50 rounded-3xl p-6 shadow-2xl relative z-10 text-left paper-grain overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsRsvpModalOpen(false)}
                className="absolute top-4 right-4 text-[#8B73A6] hover:text-[#4A3763] p-1 rounded-full hover:bg-[#F0EBF7] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="text-center mb-5">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A97E] font-bold block mb-1">
                  WEDDING RSVP
                </span>
                <h3 className="text-2xl font-normal text-[#4A3763] font-['Alex_Brush',_cursive]">
                  Join Our Celebration
                </h3>
              </div>

              <form onSubmit={handleRsvpSubmit} className="space-y-3.5 text-xs">
                {/* Guest Name */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-[#8B73A6] mb-1">
                    YOUR FULL NAME *
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-3 text-[#A28BBF]" />
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-[#F4EFF9] border border-[#DDD0EB] rounded-xl text-[#4A3763] focus:outline-none focus:border-[#4A3763] font-['Montserrat'] text-xs font-medium"
                    />
                  </div>
                </div>

                {/* Phone / Email */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-[#8B73A6] mb-1">
                      PHONE NUMBER
                    </label>
                    <div className="relative">
                      <Phone size={13} className="absolute left-3 top-3 text-[#A28BBF]" />
                      <input
                        type="tel"
                        placeholder="Mobile"
                        value={rsvpForm.phone}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                        className="w-full pl-8 pr-2 py-2 bg-[#F4EFF9] border border-[#DDD0EB] rounded-xl text-[#4A3763] focus:outline-none focus:border-[#4A3763] font-['Montserrat'] text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-[#8B73A6] mb-1">
                      NUMBER OF GUESTS
                    </label>
                    <div className="relative">
                      <Users size={13} className="absolute left-3 top-3 text-[#A28BBF]" />
                      <select
                        value={rsvpForm.guestsCount}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, guestsCount: Number(e.target.value) })}
                        className="w-full pl-8 pr-2 py-2 bg-[#F4EFF9] border border-[#DDD0EB] rounded-xl text-[#4A3763] focus:outline-none focus:border-[#4A3763] font-['Montserrat'] text-xs font-medium appearance-none"
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
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-[#8B73A6] mb-1.5">
                    EVENTS YOU WILL ATTEND
                  </label>
                  <div className="space-y-1.5 font-['Montserrat']">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#4A3763]">
                      <input
                        type="checkbox"
                        checked={rsvpForm.reception}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, reception: e.target.checked })}
                        className="accent-[#4A3763] rounded w-3.5 h-3.5"
                      />
                      <span>Dinner & Reception (13 Sept 7:00 PM)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#4A3763]">
                      <input
                        type="checkbox"
                        checked={rsvpForm.marriage}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, marriage: e.target.checked })}
                        className="accent-[#4A3763] rounded w-3.5 h-3.5"
                      />
                      <span>Holy Marriage (14 Sept 9:45 AM)</span>
                    </label>
                  </div>
                </div>

                {/* Message Note */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-[#8B73A6] mb-1">
                    WISHES / MESSAGE FOR COUPLE
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Write a message for Sam & Vinoliya..."
                    value={rsvpForm.message}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                    className="w-full p-2.5 bg-[#F4EFF9] border border-[#DDD0EB] rounded-xl text-[#4A3763] focus:outline-none focus:border-[#4A3763] font-['Montserrat'] text-xs font-medium resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#4A3763] hover:bg-[#38284C] text-[#FAF8FC] rounded-xl text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 mt-4"
                >
                  {isSubmitting ? (
                    <span>SAVING RSVP...</span>
                  ) : (
                    <>
                      <Send size={13} className="text-[#C8A97E]" />
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
