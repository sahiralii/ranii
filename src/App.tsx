import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'motion/react';
import { 
  Heart, 
  Music, 
  ChevronDown, 
  Camera, 
  MessageSquare, 
  Volume2, 
  VolumeX, 
  Pause, 
  Play
} from 'lucide-react';
import { cn } from './lib/utils';
import { STORY_CONTENT } from './constants';

// --- Hero Component ---
const Hero = ({ onEnter }: { onEnter: () => void }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <motion.section 
      style={{ opacity }}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-pink-soft/30"
    >
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-pink-soft/20 to-[#FFF0F3] z-10" />
      
      <div className="relative z-20 text-center px-4">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-sm tracking-[0.4em] uppercase text-pink-deep/50 mb-6"
        >
          Our Story
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 1 }}
          className="text-6xl md:text-8xl font-serif mb-8 text-pink-deep text-glow"
        >
          {STORY_CONTENT.hero.title}<br/>
          <span className="italic font-light opacity-80">{STORY_CONTENT.hero.subtitle}</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="max-w-xl mx-auto text-lg font-light leading-relaxed mb-12 text-pink-deep/70"
        >
          {STORY_CONTENT.hero.description}
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="group relative px-8 py-4 bg-white/40 border border-pink-primary/20 rounded-full text-pink-deep overflow-hidden shadow-pink-200/50 shadow-xl"
        >
          <div className="absolute inset-0 bg-pink-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10 font-display text-sm tracking-widest flex items-center gap-3">
            ENTER OUR STORY <ChevronDown className="w-4 h-4 animate-bounce" />
          </span>
        </motion.button>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 4 }}
        className="absolute bottom-10 z-20"
      >
        <div className="h-20 w-px bg-gradient-to-b from-pink-primary/40 to-transparent mx-auto" />
      </motion.div>
    </motion.section>
  );
};

// --- Timeline Section Component ---
const TimelineSection = ({ month, index }: { month: any, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4, once: false });
  
  return (
    <section 
      ref={ref}
      className={cn(
        "min-h-screen py-24 flex items-center sticky top-0 bg-gradient-to-b",
        month.color
      )}
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <p className={cn("font-display text-xl mb-4 font-semibold", month.accent)}>{month.date}</p>
          <h2 className="text-4xl md:text-6xl mb-8 font-serif italic text-pink-deep/80 text-glow">{month.title}</h2>
          <p className="text-lg text-stone-600 leading-relaxed font-light max-w-lg mb-12">
            {month.content}
          </p>
          <div className="flex gap-12 text-pink-deep/30 font-display text-xs tracking-widest uppercase">
            <div>0{index + 1} / 06</div>
            <div>SCENE {index + 1}</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative aspect-[4/5] group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-primary/10 to-transparent z-10 pointer-events-none" />
          <img 
            src={month.image} 
            alt={month.title}
            className="w-full h-full object-cover rounded-3xl transition-all duration-1000 group-hover:scale-[1.02] shadow-2xl shadow-pink-200/50"
          />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/60 backdrop-blur-md rounded-full border border-pink-primary/20 flex items-center justify-center -z-10 group-hover:scale-110 transition-transform duration-700">
             <Heart className="w-8 h-8 text-pink-primary/40 fill-pink-primary/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Letters Section ---
const Letters = () => {
  return (
    <section className="py-32 bg-pink-soft/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/20 skew-x-12 translate-x-1/2 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12">
          {STORY_CONTENT.letters.map((letter, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="p-12 glass border-none rounded-[2rem] relative shadow-xl shadow-pink-100"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-pink-primary/30" />
              <p className="font-display text-[10px] uppercase tracking-[0.3em] text-pink-deep/40 mb-8">Letter 0{i+1}</p>
              <h3 className="text-2xl font-serif italic mb-6 leading-tight text-pink-deep">{letter.title}</h3>
              <p className="text-stone-600 leading-relaxed font-light italic">
                 "{letter.content}"
              </p>
              <div className="mt-8 flex justify-end">
                <Heart className="w-4 h-4 text-pink-primary/30 fill-pink-primary/10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Music Player Component ---
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showList, setShowList] = useState(false);

  return (
    <motion.div 
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-4"
    >
      <AnimatePresence>
        {showList && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass p-6 rounded-[2rem] w-64 shadow-2xl mb-4 border-none shadow-pink-100"
          >
            <h4 className="text-[10px] font-display uppercase tracking-widest opacity-40 mb-4 px-2 text-pink-deep">Playlist</h4>
            <div className="space-y-4">
              {STORY_CONTENT.playlist.map((track, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer px-2">
                  <div>
                    <p className="text-xs font-semibold group-hover:text-pink-deep transition-colors text-stone-700">{track.title}</p>
                    <p className="text-[10px] opacity-40 uppercase text-stone-500">{track.artist}</p>
                  </div>
                  <p className="text-[10px] opacity-40 text-stone-500">{track.duration}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 glass px-4 py-3 rounded-full shadow-2xl border-none shadow-pink-100">
        <button 
          onClick={() => setShowList(!showList)}
          className="p-2 hover:bg-pink-soft rounded-full transition-colors"
        >
          <Music className="w-4 h-4 text-pink-deep/60" />
        </button>
        <div className="h-4 w-px bg-pink-primary/10 mx-1" />
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 bg-pink-primary/20 rounded-full hover:bg-pink-primary/30 transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4 text-pink-deep" /> : <Play className="w-4 h-4 text-pink-deep" />}
        </button>
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 hover:bg-pink-soft rounded-full transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-pink-deep/60" /> : <Volume2 className="w-4 h-4 text-pink-deep/60" />}
        </button>
      </div>
    </motion.div>
  );
};

// --- Cursor Glow ---
const CursorGlow = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    return (
        <motion.div 
            animate={{ x: pos.x - 250, y: pos.y - 250 }}
            transition={{ type: 'spring', damping: 30, stiffness: 100, restDelta: 0.001 }}
            className="fixed top-0 left-0 w-[500px] h-[500px] pointer-events-none z-[1] bg-pink-primary/[0.08] rounded-full blur-[100px]"
        />
    );
};

// --- Main App Component ---
export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    setHasEntered(true);
    setTimeout(() => {
        mainRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="relative selection:bg-pink-primary/20">
      <CursorGlow />
      <MusicPlayer />
      
      <Hero onEnter={handleEnter} />

      <main ref={mainRef} className="relative z-10 transition-opacity duration-1000">
        <div id="timeline">
            {STORY_CONTENT.months.map((month, i) => (
                <TimelineSection key={month.id} month={month} index={i} />
            ))}
        </div>

        <Letters />

        <footer className="py-48 bg-[#FFF0F3] flex flex-col items-center justify-center text-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
            >
                <h3 className="text-4xl md:text-6xl font-serif italic text-glow mb-12 text-pink-deep">
                    6 months down... <br className="md:hidden"/> forever to go.
                </h3>
                <motion.div 
                   animate={{ scale: [1, 1.1, 1] }}
                   transition={{ repeat: Infinity, duration: 2 }}
                >
                    <Heart className="w-8 h-8 text-rose-500/40 fill-rose-500/20 mx-auto" />
                </motion.div>
                <p className="mt-24 font-display text-[10px] uppercase tracking-[0.5em] opacity-40 text-pink-deep">
                    A digital film by Shahir • For You
                </p>
            </motion.div>
        </footer>
      </main>
    </div>
  );
}
