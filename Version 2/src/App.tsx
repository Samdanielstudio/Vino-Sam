import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Globe, Heart, MapPin, Check, X, Send } from 'lucide-react';

import bwBalconyImg from '../assets/Image/bw_balcony_couple.png';
import img1 from '../assets/Image/228f860771de3e4f00fdf3af15d946f6.jpg';
import img2 from '../assets/Image/3a9588f697000fffec0e6dcac056ba14.jpg';
import img3 from '../assets/Image/6f6e5cfd602ab4c25cc8018823549f63.jpg';
import img4 from '../assets/Image/9d124385492fb5882c8339336b825f9f.jpg';
import img5 from '../assets/Image/b7081b661d2fd7852604cf8e83faa078.jpg';
import img6 from '../assets/Image/d245e47d826ffbbbf13e3ff9960583eb.jpg';
import bgMusic from '../assets/Music/the_mountain-wedding-522480.mp3';

export default function App() {
  const [lang, setLang] = useState<'ru' | 'en'>('ru');
  const [couple, setCouple] = useState<'arsen_adelia' | 'vino_sam'>('arsen_adelia');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // RSVP Form State
  const [guestName, setGuestName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | null>('yes');
  const [guestCount, setGuestCount] = useState(1);
  const [foodPreference, setFoodPreference] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Audio Reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(bgMusic);
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const coupleNames = couple === 'arsen_adelia' ? 'Arsen & Adelia' : 'Vino & Sam';

  // Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const targetDate = new Date('2026-07-10T17:00:00');
    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setRsvpSubmitted(true);
    setTimeout(() => {
      setIsRsvpOpen(false);
      setRsvpSubmitted(false);
      setGuestName('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-[#111111] font-sans flex flex-col items-center py-6 px-3 sm:px-6">
      
      {/* Quick Settings Bar (Language & Couple Switcher) */}
      <header className="w-full max-w-[440px] flex items-center justify-between px-3 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-md text-xs mb-4 text-[#333]">
        <div className="flex items-center gap-1 font-medium">
          <Globe size={14} className="text-[#666]" />
          <button
            onClick={() => setLang('ru')}
            className={`px-2 py-0.5 rounded-full transition-all ${lang === 'ru' ? 'bg-black text-white font-semibold' : 'text-[#666] hover:text-black'}`}
          >
            RU
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setLang('en')}
            className={`px-2 py-0.5 rounded-full transition-all ${lang === 'en' ? 'bg-black text-white font-semibold' : 'text-[#666] hover:text-black'}`}
          >
            EN
          </button>
        </div>

        <button
          onClick={() => setCouple(c => c === 'arsen_adelia' ? 'vino_sam' : 'arsen_adelia')}
          className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-all text-[11px] text-[#222]"
        >
          <Heart size={12} className="fill-black text-black" />
          <span>{couple === 'arsen_adelia' ? 'Arsen & Adelia' : 'Vino & Sam'}</span>
        </button>
      </header>

      {/* Main Taplink Card Container */}
      <main className="w-full max-w-[440px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-neutral-200 relative">

        {/* TOP BANNER TITLE */}
        <div className="w-full py-5 text-center bg-white border-b border-neutral-100">
          <p className="font-serif-title uppercase tracking-[0.25em] text-[13px] text-[#222] font-semibold">
            {lang === 'ru' ? 'САЙТ НА TAPLINK' : 'TAPLINK WEDDING WEBSITE'}
          </p>
          <p className="font-script text-2xl text-[#444] mt-0.5">
            {lang === 'ru' ? 'свадебное приглашение' : 'wedding invitation'}
          </p>
        </div>

        {/* HERO IMAGE SECTION */}
        <section className="relative w-full h-[480px] bg-neutral-900 overflow-hidden cursor-pointer" onClick={() => setSelectedImg(bwBalconyImg)}>
          <img
            src={bwBalconyImg}
            alt="Couple Hero"
            className="w-full h-full object-cover bw-filter"
          />
          {/* Subtle gradient vignette at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          {/* Cursive Overlay Name */}
          <div className="absolute bottom-6 left-0 right-0 text-center px-4 pointer-events-none">
            <h1 className="font-script text-5xl sm:text-6xl text-white drop-shadow-md tracking-wide">
              {coupleNames}
            </h1>
          </div>
        </section>

        {/* SECTION 1: WEDDING INVITATION */}
        <section className="px-7 py-10 text-center flex flex-col items-center bg-white border-b border-neutral-100">
          <h2 className="font-script text-4xl text-[#111] mb-6">
            {lang === 'ru' ? 'Wedding invitation' : 'Wedding invitation'}
          </h2>

          <p className="text-xs sm:text-[13px] leading-relaxed text-[#444] font-normal max-w-[340px]">
            {lang === 'ru'
              ? 'Дорогие родные и близкие! Совсем скоро состоится один из самых важных дней в нашей жизни — наша свадьба. Мы будем счастливы разделить этот день вместе с вами.'
              : 'Dear family and friends! Very soon one of the most important days of our lives will take place — our wedding. We will be happy to share this day together with you.'}
          </p>

          {/* Minimalist Vertical Divider Line */}
          <div className="w-[1px] h-12 bg-neutral-300 my-6" />

          <p className="text-[12px] text-[#555] mb-6">
            {lang === 'ru'
              ? 'Пожалуйста, подтвердите своё присутствие, нажав на кнопку ниже.'
              : 'Please confirm your attendance by clicking the button below.'}
          </p>

          <button
            onClick={() => setIsRsvpOpen(true)}
            className="w-full max-w-[280px] py-3 px-6 border border-black hover:bg-black hover:text-white transition-all duration-300 text-xs tracking-wider uppercase font-medium rounded-none text-black"
          >
            {lang === 'ru' ? 'Подтвердить участие' : 'Confirm Attendance'}
          </button>
        </section>

        {/* SECTION 2: TIMING OF THE DAY */}
        <section className="px-7 py-10 bg-white border-b border-neutral-100 flex flex-col items-center">
          <h2 className="font-script text-4xl text-[#111] mb-8 text-center">
            {lang === 'ru' ? 'Timing of the day' : 'Timing of the day'}
          </h2>

          <div className="w-full space-y-4 mb-8">
            {/* Timeline Item 1 */}
            <div className="flex items-center gap-4">
              <div className="px-4 py-1.5 bg-black text-white text-xs font-semibold rounded-full min-w-[75px] text-center tracking-wider">
                17:00
              </div>
              <div className="text-xs text-[#333] border-b border-neutral-200 pb-1 flex-1">
                {lang === 'ru' ? 'сбор гостей' : 'guest arrival'}
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="flex items-center gap-4">
              <div className="px-4 py-1.5 bg-black text-white text-xs font-semibold rounded-full min-w-[75px] text-center tracking-wider">
                18:00
              </div>
              <div className="text-xs text-[#333] border-b border-neutral-200 pb-1 flex-1">
                {lang === 'ru' ? 'церемония' : 'ceremony'}
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="flex items-center gap-4">
              <div className="px-4 py-1.5 bg-black text-white text-xs font-semibold rounded-full min-w-[75px] text-center tracking-wider">
                19:00
              </div>
              <div className="text-xs text-[#333] border-b border-neutral-200 pb-1 flex-1">
                {lang === 'ru' ? 'праздничный ужин' : 'festive dinner'}
              </div>
            </div>
          </div>

          {/* Couple Artistic B&W Photo */}
          <div
            className="w-full h-[320px] rounded-xl overflow-hidden cursor-pointer shadow-sm"
            onClick={() => setSelectedImg(img1)}
          >
            <img
              src={img1}
              alt="Couple Timing"
              className="w-full h-full object-cover bw-filter"
            />
          </div>
        </section>

        {/* SECTION 3: DRESS CODE */}
        <section className="px-7 py-10 bg-white border-b border-neutral-100 flex flex-col items-center">
          {/* Dress Code Image Banner */}
          <div
            className="w-full h-[260px] rounded-xl overflow-hidden cursor-pointer mb-8 relative shadow-sm"
            onClick={() => setSelectedImg(img3)}
          >
            <img
              src={img3}
              alt="Dress code attire"
              className="w-full h-full object-cover bw-filter"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <h2 className="font-script text-5xl text-white drop-shadow-lg">
                {lang === 'ru' ? 'Dress Code' : 'Dress Code'}
              </h2>
            </div>
          </div>

          <p className="text-xs text-center leading-relaxed text-[#444] max-w-[320px] mb-6">
            {lang === 'ru'
              ? 'Мы будем рады, если ваш образ будет выполнен в чёрно-белой гамме.'
              : 'We will be delighted if your outfit is styled in a black-and-white color palette.'}
          </p>

          {/* Color Palette Swatches */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 bg-black rounded-lg shadow-md border border-neutral-800" />
              <span className="text-[10px] text-[#666] uppercase tracking-wider">
                {lang === 'ru' ? 'Чёрный' : 'Black'}
              </span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 bg-white rounded-lg border border-neutral-300 shadow-sm" />
              <span className="text-[10px] text-[#666] uppercase tracking-wider">
                {lang === 'ru' ? 'Белый' : 'White'}
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 4: LOCATION */}
        <section className="px-7 py-10 bg-white border-b border-neutral-100 flex flex-col items-center">
          {/* Venue B&W Image */}
          <div
            className="w-full h-[240px] rounded-xl overflow-hidden cursor-pointer mb-6 shadow-sm"
            onClick={() => setSelectedImg(img4)}
          >
            <img
              src={img4}
              alt="Wedding Venue"
              className="w-full h-full object-cover bw-filter"
            />
          </div>

          <h2 className="font-script text-4xl text-[#111] mb-3">
            {lang === 'ru' ? 'Location' : 'Location'}
          </h2>

          <div className="text-center mb-6">
            <p className="font-serif-title uppercase tracking-widest text-sm font-semibold text-black">
              SHERWOOD DOME
            </p>
            <p className="text-xs text-[#666] mt-1">
              г. Уфа, ул. Малая д. 1/1
            </p>
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-black underline underline-offset-4 hover:opacity-75 transition-opacity font-medium mb-8"
          >
            <MapPin size={13} />
            <span>{lang === 'ru' ? 'Посмотреть на карте' : 'View on Google Maps'}</span>
          </a>

          {/* Location Gallery Grid */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="h-36 rounded-lg overflow-hidden cursor-pointer" onClick={() => setSelectedImg(img2)}>
              <img src={img2} alt="Gallery 1" className="w-full h-full object-cover bw-filter" />
            </div>
            <div className="h-36 rounded-lg overflow-hidden cursor-pointer" onClick={() => setSelectedImg(img5)}>
              <img src={img5} alt="Gallery 2" className="w-full h-full object-cover bw-filter" />
            </div>
          </div>
        </section>

        {/* SECTION 5: DETAILS */}
        <section className="px-7 py-10 bg-white border-b border-neutral-100 flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-center w-full">
            <div className="sm:col-span-3 text-left">
              <h2 className="font-script text-4xl text-[#111] mb-4">
                {lang === 'ru' ? 'Details' : 'Details'}
              </h2>
              <p className="text-xs leading-relaxed text-[#444]">
                {lang === 'ru'
                  ? 'Классические силуэты, сдержанные образы и минимализм будут особенно уместны в этот день.'
                  : 'Classic silhouettes, restrained looks, and minimalism will be especially fitting for this special day.'}
              </p>
            </div>

            <div
              className="sm:col-span-2 h-44 rounded-xl overflow-hidden cursor-pointer shadow-sm"
              onClick={() => setSelectedImg(img6)}
            >
              <img src={img6} alt="Detail view" className="w-full h-full object-cover bw-filter" />
            </div>
          </div>
        </section>

        {/* SECTION 6: RSVP & COUNTDOWN FOOTER */}
        <section className="px-7 py-10 bg-neutral-50 text-center flex flex-col items-center">
          <p className="text-xs leading-relaxed text-[#444] max-w-[340px] mb-4">
            {lang === 'ru'
              ? 'Этот день станет особенным благодаря вам — нашим родным и друзьям. Нам очень важно знать, сможете ли вы быть с нами.'
              : 'This day will become truly special thanks to you — our family and friends. It is very important for us to know if you can join us.'}
          </p>

          <p className="text-[12px] text-[#666] mb-6">
            {lang === 'ru'
              ? 'Пожалуйста, подтвердите своё присутствие, нажав на кнопку ниже.'
              : 'Please confirm your attendance by clicking the button below.'}
          </p>

          <button
            onClick={() => setIsRsvpOpen(true)}
            className="w-full max-w-[280px] py-3 px-6 border border-black hover:bg-black hover:text-white transition-all duration-300 text-xs tracking-wider uppercase font-medium rounded-none text-black mb-10"
          >
            {lang === 'ru' ? 'Подтвердить участие' : 'Confirm Attendance'}
          </button>

          {/* LIVE COUNTDOWN TIMER */}
          <div className="w-full max-w-[320px] bg-white border border-neutral-200 rounded-2xl p-4 mb-8 shadow-sm">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#666] mb-3">
              {lang === 'ru' ? 'До свадьбы осталось' : 'Countdown to Wedding'}
            </p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-neutral-100 rounded-lg p-2">
                <span className="block font-bold text-lg text-black font-serif-title">{timeLeft.days}</span>
                <span className="text-[9px] text-[#666] uppercase">{lang === 'ru' ? 'дней' : 'days'}</span>
              </div>
              <div className="bg-neutral-100 rounded-lg p-2">
                <span className="block font-bold text-lg text-black font-serif-title">{timeLeft.hours}</span>
                <span className="text-[9px] text-[#666] uppercase">{lang === 'ru' ? 'часов' : 'hrs'}</span>
              </div>
              <div className="bg-neutral-100 rounded-lg p-2">
                <span className="block font-bold text-lg text-black font-serif-title">{timeLeft.minutes}</span>
                <span className="text-[9px] text-[#666] uppercase">{lang === 'ru' ? 'минут' : 'mins'}</span>
              </div>
              <div className="bg-neutral-100 rounded-lg p-2">
                <span className="block font-bold text-lg text-black font-serif-title">{timeLeft.seconds}</span>
                <span className="text-[9px] text-[#666] uppercase">{lang === 'ru' ? 'сек' : 'secs'}</span>
              </div>
            </div>
          </div>

          {/* Date & Couple Sign-off */}
          <div className="space-y-2">
            <p className="font-serif-title text-base tracking-wider text-black">
              {lang === 'ru' ? 'До встречи! 10 июля 2026' : 'See you! July 10, 2026'}
            </p>
            <p className="font-script text-4xl text-[#111]">
              {coupleNames}
            </p>
          </div>
        </section>

        {/* BOTTOM BRANDING FOOTER */}
        <footer className="w-full py-6 bg-white text-center border-t border-neutral-100 flex flex-col items-center justify-center gap-1">
          <p className="text-[11px] text-[#777] font-script text-lg">
            by @maslina18
          </p>
          <div className="text-xs text-neutral-400">🌿</div>
        </footer>
      </main>

      {/* FLOATING MUSIC TOGGLE BUTTON */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border border-neutral-800"
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      {/* RSVP MODAL FORM */}
      <AnimatePresence>
        {isRsvpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsRsvpOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-[400px] bg-white rounded-2xl p-6 shadow-2xl border border-neutral-200 relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsRsvpOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full text-neutral-400 hover:text-black transition-colors"
              >
                <X size={18} />
              </button>

              <h3 className="font-script text-3xl text-black mb-1 text-center">
                RSVP
              </h3>
              <p className="text-xs text-neutral-500 text-center mb-6">
                {lang === 'ru' ? 'Подтверждение участия' : 'Confirm Your Attendance'}
              </p>

              {rsvpSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto">
                    <Check size={24} />
                  </div>
                  <h4 className="font-serif-title text-xl font-bold text-black">
                    {lang === 'ru' ? 'Спасибо!' : 'Thank You!'}
                  </h4>
                  <p className="text-xs text-neutral-600">
                    {lang === 'ru'
                      ? 'Ваш ответ успешно получен. Ждём встречи!'
                      : 'Your response has been received. We look forward to seeing you!'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-600 mb-1">
                      {lang === 'ru' ? 'Ваше имя и фамилия' : 'Your Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder={lang === 'ru' ? 'Иван Иванов' : 'John Doe'}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-600 mb-1">
                      {lang === 'ru' ? 'Сможете ли вы прийти?' : 'Will you attend?'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setAttending('yes')}
                        className={`py-2 px-3 text-xs rounded-lg border transition-all ${
                          attending === 'yes'
                            ? 'bg-black text-white border-black font-semibold'
                            : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                        }`}
                      >
                        {lang === 'ru' ? 'Да, я приду' : 'Yes, I will attend'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttending('no')}
                        className={`py-2 px-3 text-xs rounded-lg border transition-all ${
                          attending === 'no'
                            ? 'bg-black text-white border-black font-semibold'
                            : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                        }`}
                      >
                        {lang === 'ru' ? 'Не смогу' : 'Cannot attend'}
                      </button>
                    </div>
                  </div>

                  {attending === 'yes' && (
                    <>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-600 mb-1">
                          {lang === 'ru' ? 'Количество гостей' : 'Number of Guests'}
                        </label>
                        <select
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-600 mb-1">
                          {lang === 'ru' ? 'Предпочтения по напиткам / меню' : 'Dietary / Drink Preferences'}
                        </label>
                        <input
                          type="text"
                          value={foodPreference}
                          onChange={(e) => setFoodPreference(e.target.value)}
                          placeholder={lang === 'ru' ? 'Белое вино, без мяса...' : 'White wine, vegetarian...'}
                          className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                        />
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{lang === 'ru' ? 'Отправить ответ' : 'Submit Response'}</span>
                    <Send size={12} />
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImg(null)}
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImg}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl bw-filter"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
