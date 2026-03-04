import React, { useState, useMemo, memo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'motion/react';
import { 
  Search, 
  Users, 
  Mail, 
  Phone, 
  Briefcase, 
  Droplets, 
  GraduationCap, 
  ChevronDown,
  ChevronRight,
  Filter,
  X,
  ExternalLink,
  Github,
  Linkedin,
  Sun,
  Moon,
  LogIn,
  LogOut,
  User,
  Copy,
  Check,
  MapPin,
  Lock,
  LayoutGrid,
  List,
  ArrowUp,
  ArrowUpDown,
  TrendingUp,
  Sparkles
} from 'lucide-react';

// Custom Debounce Hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
import { mockBatches } from './mockData';
import { Student } from './types';

interface StudentCardProps {
  student: Student;
  onClick: () => void;
  key?: React.Key;
}

const MagneticButton = ({ children, onClick, className, variant = 'primary' }: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variants = {
    primary: "bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 hover:bg-indigo-500",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
    outline: "bg-transparent text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/10",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5"
  };

  return (
    <motion.button
      style={{ x: mouseX, y: mouseY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
    className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center gap-12"
  >
    <div className="relative">
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-8 bg-indigo-600/20 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          rotate: 360
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="w-32 h-32 rounded-[2.5rem] border border-indigo-500/10 flex items-center justify-center relative z-10"
      >
        <div className="absolute inset-0 rounded-[2.5rem] border-t-2 border-indigo-500" />
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <motion.img 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          src="https://i.imgur.com/kH7j2S2.png" 
          alt="KUET" 
          className="w-14 h-14 object-contain" 
          referrerPolicy="no-referrer" 
        />
      </div>
    </div>
    <div className="text-center space-y-4">
      <div className="overflow-hidden">
        <motion.p 
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-white font-display font-black text-3xl tracking-tighter"
        >
          MTE DIRECTORY
        </motion.p>
      </div>
      <div className="w-48 h-1 bg-white/5 mx-auto rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
        />
      </div>
    </div>
  </motion.div>
);

const SkeletonCard = () => (
  <div className="bento-card p-2 sm:p-4 animate-pulse">
    <div className="aspect-[4/5] mb-3 sm:mb-5 rounded-[1.2rem] sm:rounded-[1.8rem] bg-slate-800" />
    <div className="space-y-2 px-1">
      <div className="h-4 bg-slate-800 rounded-lg w-3/4" />
      <div className="h-3 bg-slate-800 rounded-lg w-1/2" />
    </div>
  </div>
);

const StudentCard = memo(({ student, onClick }: StudentCardProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ 
      y: -8,
      scale: 1.02,
      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
    }}
    whileTap={{ scale: 0.98 }}
    transition={{ 
      layout: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
      opacity: { duration: 0.4 },
      y: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
    }}
    onClick={onClick}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
    role="button"
    tabIndex={0}
    aria-label={`View profile of ${student.name}`}
    className="group bento-card p-2 sm:p-4 cursor-pointer smooth-gpu outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
  >
    <div className="relative aspect-[4/5] mb-2 sm:mb-4 overflow-hidden rounded-[1.2rem] sm:rounded-[1.8rem] bg-slate-800/50 smooth-gpu">
      <img
        src={student.photoUrl}
        alt={student.name}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://picsum.photos/seed/${student.id}/400/400`;
        }}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
    
    <div className="space-y-0.5 sm:space-y-2 px-1">
      <div className="flex items-start justify-between gap-1">
        <h3 className="font-display font-bold text-white text-[10px] sm:text-lg leading-tight group-hover:text-indigo-400 transition-colors duration-500 truncate">{student.nickname}</h3>
        <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-emerald-500 mt-1 shadow-[0_0_8px_rgba(16,185,129,0.5)] shrink-0" />
      </div>
      <div className="flex flex-col gap-0">
        <p className="text-[7px] sm:text-[10px] font-black text-slate-500 uppercase tracking-[0.1em] sm:tracking-[0.2em]">{student.roll}</p>
      </div>
    </div>
  </motion.div>
));

const StudentModal = ({ 
  student, 
  onClose, 
  isLoggedIn, 
  onLoginClick 
}: { 
  student: Student; 
  onClose: () => void; 
  isLoggedIn: boolean;
  onLoginClick: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(student.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="fixed inset-0 z-50 flex justify-center p-2 sm:p-4 bg-slate-950/90 safari-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
        className="bg-slate-900 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] border border-white/5 my-auto relative smooth-gpu"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-32 sm:h-40 bg-gradient-to-br from-indigo-600/20 to-violet-600/20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-white/10 hover:bg-white/20 safari-blur-md rounded-full text-white transition-all duration-300 z-10 shadow-xl border border-white/5"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="px-6 sm:px-10 pb-8 sm:pb-10 -mt-12 sm:-mt-16 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="relative group mb-4 sm:mb-6">
              <motion.div 
                layoutId={`avatar-${student.id}`}
                className="relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-700" />
                <img
                  src={student.photoUrl}
                  alt={student.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://picsum.photos/seed/${student.id}/400/400`;
                  }}
                  className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] border-4 border-slate-900 shadow-2xl object-cover bg-slate-800"
                />
              </motion.div>
            </div>
            <div className="space-y-2">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight leading-tight"
              >
                {student.name}
              </motion.h2>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[8px] sm:text-[10px] font-black tracking-widest uppercase border border-indigo-500/20">
                  {student.roll}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[8px] sm:text-[10px] font-black tracking-widest uppercase border border-emerald-500/20">
                  Batch {student.session}
                </span>
                <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-[8px] sm:text-[10px] font-black tracking-widest uppercase border border-rose-500/20">
                  {student.bloodGroup}
                </span>
              </div>
            </div>
          </div>

          {!isLoggedIn ? (
            <div className="mt-8 p-6 sm:p-8 rounded-[2rem] bg-white/5 border border-dashed border-white/10 text-center">
              <div className="w-12 h-12 bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-400 mx-auto mb-4">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-display font-black text-white mb-2">Profile Locked</h3>
              <p className="text-slate-400 font-medium mb-6 text-sm">You have to login to see the full info of this student.</p>
              <button 
                onClick={onLoginClick}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-500/20 transition-all duration-300"
              >
                Login to Unlock
              </button>
            </div>
          ) : (
            <>
              {student.bio && (
                <div className="mt-8 relative text-center">
                  <p className="text-sm sm:text-lg text-slate-300 font-serif italic leading-relaxed px-4">
                    "{student.bio}"
                  </p>
                </div>
              )}

              <div className="mt-8 space-y-3">
                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 transition-all duration-500 hover:bg-white/10">
                  <div className="w-10 h-10 rounded-xl bg-indigo-900/30 flex items-center justify-center text-indigo-400 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[8px] uppercase tracking-[0.2em] font-black text-slate-500 mb-0.5">Email Address</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-100 truncate">{student.email}</p>
                  </div>
                  <button 
                    onClick={copyEmail}
                    className="p-2 rounded-lg bg-white/10 text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="group flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 transition-all duration-500 hover:bg-white/10">
                    <div className="w-8 h-8 rounded-lg bg-emerald-900/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Phone size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[7px] uppercase tracking-[0.2em] font-black text-slate-500 mb-0.5">Phone</p>
                      <p className="text-[10px] sm:text-xs font-bold text-slate-100 truncate">{student.phone}</p>
                    </div>
                  </div>

                  <div className="group flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 transition-all duration-500 hover:bg-white/10">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/30 flex items-center justify-center text-blue-400 shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[7px] uppercase tracking-[0.2em] font-black text-slate-500 mb-0.5">Hometown</p>
                      <p className="text-[10px] sm:text-xs font-bold text-slate-100 truncate">{student.hometown}</p>
                    </div>
                  </div>
                </div>

                {student.currentWorkplace && (
                  <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 transition-all duration-500 hover:bg-white/10">
                    <div className="w-10 h-10 rounded-xl bg-amber-900/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Briefcase size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] uppercase tracking-[0.2em] font-black text-slate-500 mb-0.5">Current Status</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-100 truncate">{student.currentWorkplace}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  disabled={student.linkedin === 'N/A'}
                  className={`flex-1 py-4 px-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-500 ${
                    student.linkedin === 'N/A' 
                      ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-2xl shadow-indigo-500/20'
                  }`}
                >
                  <Linkedin size={18} /> {student.linkedin === 'N/A' ? 'LinkedIn N/A' : 'LinkedIn Profile'}
                </button>
                <button className="p-4 bg-white/5 text-slate-300 rounded-2xl hover:bg-white/10 transition-all duration-500 border border-white/5 shadow-xl">
                  <ExternalLink size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const LoginModal = ({ 
  onClose, 
  onLogin 
}: { 
  onClose: () => void; 
  onLogin: (roll: string) => void;
}) => {
  const [roll, setRoll] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate sum of digits of roll number
    const sumOfDigits = roll.split('').reduce((sum, char) => {
      const digit = parseInt(char);
      return isNaN(digit) ? sum : sum + digit;
    }, 0);

    if (password === sumOfDigits.toString() && roll.length > 0) {
      onLogin(roll);
      onClose();
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 safari-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 w-full max-w-md rounded-[2rem] p-6 sm:p-10 shadow-2xl border border-white/5 relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-slate-500 hover:text-slate-200 transition-colors"
        >
          <X size={18} />
        </button>
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 mx-auto mb-4 sm:mb-6 p-1.5 sm:p-2">
            <img src="https://i.imgur.com/kH7j2S2.png" alt="KUET" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-1 sm:mb-2">Welcome Back</h2>
          <p className="text-slate-400 font-medium text-xs sm:text-base">Login to access the full directory</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-[8px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Roll Number</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                required
                value={roll}
                onChange={e => setRoll(e.target.value)}
                placeholder="e.g. 2331001"
                className="w-full pl-11 pr-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-[8px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold text-sm sm:text-base"
              />
            </div>
          </div>

          {error && (
            <p className="text-rose-500 text-[10px] sm:text-xs font-bold text-center bg-rose-500/10 py-2 sm:py-3 rounded-xl border border-rose-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-4 sm:py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20 transition-all duration-300"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string>(mockBatches[0].session);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserRoll, setCurrentUserRoll] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'roll'>('roll');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (roll: string) => {
    setIsLoggedIn(true);
    setCurrentUserRoll(roll);
    setShowLoginSuccess(true);
    setTimeout(() => setShowLoginSuccess(false), 5000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserRoll(null);
  };

  const handleStudentClick = useCallback((student: Student) => {
    setSelectedStudent(student);
  }, []);

  const filteredStudents = useMemo(() => {
    const batch = mockBatches.find(b => b.session === selectedSession);
    if (!batch) return [];
    
    let students = batch.students.filter(s => 
      s.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      s.currentWorkplace.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      s.roll.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      s.hometown.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );

    if (selectedBloodGroup) {
      students = students.filter(s => s.bloodGroup === selectedBloodGroup);
    }

    return students.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'roll') return a.roll.localeCompare(b.roll);
      return 0;
    });
  }, [selectedSession, debouncedSearchQuery, selectedBloodGroup, sortBy]);

  return (
    <div className="min-h-screen pb-20 transition-colors duration-700 relative bg-[#050505] text-slate-200">
      <AnimatePresence>
        {!isLoaded && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {/* Grain Overlay Removed for Performance */}
      
      {/* Scroll Progress Bar - Simplified */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-[200] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Department Seal Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="department-seal top-[-10%] right-[-10%] w-[60%] h-[60%] opacity-[0.02] dark:opacity-[0.05]">
          <img src="https://i.imgur.com/kH7j2S2.png" alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
        </div>
        <div className="department-seal bottom-[-10%] left-[-10%] w-[60%] h-[60%] opacity-[0.02] dark:opacity-[0.05]">
          <img src="https://i.imgur.com/kH7j2S2.png" alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
        </div>
      </div>

      {/* Header / Hero */}
      <header className="relative bg-slate-950 pt-12 sm:pt-20 pb-20 sm:pb-32 px-4 sm:px-6 overflow-hidden transition-colors duration-700 smooth-gpu">
        {/* Animated Background Elements - Simplified on Mobile */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] hidden sm:block" 
          />
          <motion.div 
            animate={{ 
              scale: [1.1, 1, 1.1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[120px] hidden sm:block" 
          />
        </div>

        <nav className="max-w-7xl mx-auto flex justify-between items-center mb-8 sm:mb-12 relative z-30">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 sm:gap-6"
          >
            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 p-1.5 sm:p-2.5">
              <img src="https://i.imgur.com/kH7j2S2.png" alt="KUET" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div className="hidden xs:block">
              <p className="font-display font-black text-white tracking-tighter text-base sm:text-2xl">MTE DIRECTORY</p>
              <p className="text-[9px] sm:text-[11px] font-black text-indigo-400 uppercase tracking-[0.3em]">KUET OFFICIAL</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-2 sm:gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-2 sm:gap-6">
                <div className="text-right hidden sm:block">
                  <p className="text-[9px] sm:text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Welcome</p>
                  <p className="text-xs sm:text-sm font-black text-white">{currentUserRoll}</p>
                </div>
                <MagneticButton 
                  variant="secondary"
                  onClick={handleLogout}
                  className="px-3 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl"
                >
                  <LogOut size={12} className="sm:w-4 sm:h-4" /> <span className="hidden xs:inline">Sign Out</span><span className="xs:hidden">Out</span>
                </MagneticButton>
              </div>
            ) : (
              <MagneticButton 
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-2 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl"
              >
                <LogIn size={14} className="sm:w-4.5 sm:h-4.5" /> Sign In
              </MagneticButton>
            )}
          </div>
        </nav>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 sm:gap-16 items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-8 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-[9px] sm:text-[11px] font-black tracking-[0.2em] uppercase border border-indigo-500/20 shadow-sm"
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-600 animate-pulse" />
                Departmental Network
              </motion.div>
              
              <div className="space-y-2 sm:space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                  className="text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-tight text-white leading-[0.9] sm:leading-[0.85]"
                >
                  Engineering <br />
                  <span className="text-gradient">Excellence.</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-base sm:text-xl md:text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0"
                >
                  The definitive directory for Mechatronics Engineering at KUET. 
                  Bridging generations of innovators.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6"
              >
                <div className="hidden sm:flex -space-x-3 sm:-space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 sm:w-12 h-12 rounded-full border-2 sm:border-4 border-slate-950 bg-slate-800 overflow-hidden shadow-xl">
                      <img src={`https://picsum.photos/seed/student${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                  <div className="w-8 h-8 sm:w-12 h-12 rounded-full border-2 sm:border-4 border-slate-950 bg-indigo-600 flex items-center justify-center text-white text-[8px] sm:text-xs font-black shadow-xl">
                    +210
                  </div>
                </div>
                <p className="text-[10px] sm:text-sm font-bold text-slate-400">
                  Join our <span className="text-white">academic community</span>
                </p>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-5 w-full"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000" />
                <div className="relative bento-card p-6 sm:p-8 bg-white/80 dark:bg-slate-900/60 backdrop-blur-3xl border-white/20 dark:border-white/5 shadow-2xl">
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 dark:text-white">Department Stats</h3>
                      <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time Overview</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Users size={20} className="sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1 sm:space-y-2">
                      <p className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-white">6+</p>
                      <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Batches</p>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <p className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-white">200+</p>
                      <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Students</p>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-100 dark:border-white/5 space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-end">
                      <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">Community Growth</p>
                      <p className="text-[10px] sm:text-xs font-black text-indigo-600 dark:text-indigo-400">+12% this year</p>
                    </div>
                    <div className="h-1.5 sm:h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "82%" }}
                        transition={{ duration: 2, delay: 1, ease: [0.23, 1, 0.32, 1] }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-600" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 mt-12 relative z-20 smooth-gpu">
        {/* Breadcrumbs */}
        <nav className="max-w-7xl mx-auto px-6 mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <a href="#" className="hover:text-indigo-600 transition-colors">Home</a>
          <ChevronRight size={12} />
          <a href="#" className="hover:text-indigo-600 transition-colors">Directory</a>
          <ChevronRight size={12} />
          <span className="text-indigo-600 dark:text-indigo-400">Batch {selectedSession}</span>
        </nav>

        {/* Controls */}
        <div className="glass p-6 md:p-10 rounded-[3.5rem] dark:shadow-2xl border-white/40 dark:border-white/5">
          <div className="flex flex-col gap-10">
            {/* Session Selection - Smooth Horizontal Slider */}
            <div className="w-full">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2 whitespace-nowrap">Session</p>
                <div className="relative p-2 bg-slate-100/80 dark:bg-slate-900/60 rounded-[2rem] border border-slate-200/50 dark:border-white/5 backdrop-blur-xl overflow-hidden flex-1">
                  {/* Edge Fades for Slider */}
                  <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-100/80 dark:from-slate-900/60 to-transparent z-20 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-100/80 dark:from-slate-900/60 to-transparent z-20 pointer-events-none" />
                  
                  <div className="flex overflow-x-auto no-scrollbar gap-2 px-6 py-1 snap-x">
                    {mockBatches.map(batch => (
                      <button
                        key={batch.session}
                        onClick={() => setSelectedSession(batch.session)}
                        className="relative flex-none px-10 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all duration-500 group overflow-hidden snap-center"
                      >
                        {selectedSession === batch.session && (
                          <motion.div
                            layoutId="poshActiveSession"
                            className="absolute inset-0 bg-white dark:bg-indigo-600 shadow-2xl dark:shadow-indigo-500/40 rounded-[1.5rem] z-0"
                            transition={{ type: "spring", bounce: 0.1, duration: 0.8 }}
                          />
                        )}
                        <span className={`relative z-10 transition-colors duration-500 whitespace-nowrap ${
                          selectedSession === batch.session 
                            ? 'text-indigo-600 dark:text-white' 
                            : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                        }`}>
                          {batch.session}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Search - Enhanced Glass Focus */}
            <div className="w-full">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2 whitespace-nowrap">Search</p>
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                  <div className="relative p-2 bg-slate-100/80 dark:bg-slate-900/60 rounded-[2rem] border border-slate-200/50 dark:border-white/5 backdrop-blur-xl overflow-hidden flex-1">
                    <motion.div 
                      whileFocus={{ scale: typeof window !== 'undefined' && window.innerWidth >= 1024 ? 1.01 : 1 }}
                      className="relative w-full group"
                    >
                      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none z-10">
                        <Search className="text-slate-400 dark:text-slate-200 group-focus-within:text-indigo-500 transition-colors duration-500" size={20} />
                      </div>
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search by Name, Roll, or Workplace..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowSuggestions(e.target.value.length > 0);
                        }}
                        onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200) }
                        className="w-full pl-16 pr-14 py-4 bg-transparent border-none text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-200 focus:outline-none transition-all duration-500"
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => { setSearchQuery(''); setShowSuggestions(false); }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 dark:text-slate-200 transition-colors z-10"
                        >
                          <X size={18} />
                        </button>
                      )}

                      {/* Search Suggestions */}
                      <AnimatePresence>
                        {showSuggestions && filteredStudents.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute top-full left-0 right-0 mt-4 p-4 glass rounded-[2rem] z-[100] shadow-2xl border-white/20 dark:border-white/5"
                          >
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Quick Results</p>
                            <div className="space-y-2">
                              {filteredStudents.slice(0, 5).map(student => (
                                <button
                                  key={student.id}
                                  onClick={() => handleStudentClick(student)}
                                  className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-white dark:hover:bg-white/10 transition-colors text-left group"
                                >
                                  <img 
                                    src={student.photoUrl} 
                                    className="w-10 h-10 rounded-xl object-cover" 
                                    referrerPolicy="no-referrer" 
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = `https://picsum.photos/seed/${student.id}/400/400`;
                                    }}
                                  />
                                  <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{student.name}</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{student.roll}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Advanced Filters Toggle */}
                  <div className="flex gap-2">
                    <div className="p-2 bg-slate-100/80 dark:bg-slate-900/60 rounded-[2rem] border border-slate-200/50 dark:border-white/5 backdrop-blur-xl flex items-center gap-1 neumorphic-inset">
                      <button 
                        onClick={() => setViewMode('grid')}
                        aria-label="Grid View"
                        className={`p-3 rounded-2xl transition-all duration-500 ${viewMode === 'grid' ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-lg' : 'text-slate-400 hover:text-indigo-500'}`}
                      >
                        <LayoutGrid size={20} />
                      </button>
                      <button 
                        onClick={() => setViewMode('list')}
                        aria-label="List View"
                        className={`p-3 rounded-2xl transition-all duration-500 ${viewMode === 'list' ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-lg' : 'text-slate-400 hover:text-indigo-500'}`}
                      >
                        <List size={20} />
                      </button>
                    </div>

                    <div className="p-2 bg-slate-100/80 dark:bg-slate-900/60 rounded-[2rem] border border-slate-200/50 dark:border-white/5 backdrop-blur-xl flex items-center gap-1">
                      <button 
                        onClick={() => setSortBy(prev => prev === 'name' ? 'roll' : 'name')}
                        className="p-3 rounded-2xl bg-white dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-sm flex items-center gap-2 px-4"
                      >
                        <ArrowUpDown size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{sortBy}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2">Blood Group</p>
                <div className="flex flex-wrap gap-2">
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                    <button
                      key={bg}
                      onClick={() => setSelectedBloodGroup(selectedBloodGroup === bg ? null : bg)}
                      className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                        selectedBloodGroup === bg 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                          : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-indigo-500/50'
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-900/60 rounded-2xl neumorphic-inset">
                  <TrendingUp size={14} className="text-indigo-500" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Trending:</span>
                  <button 
                    onClick={() => setSearchQuery('Robotics')}
                    className="text-[9px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Robotics
                  </button>
                </div>
              </div>
            </div>
            {/* Active Filter Tags */}
            <AnimatePresence>
              {(debouncedSearchQuery || selectedBloodGroup) && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {debouncedSearchQuery && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-indigo-100 dark:border-indigo-500/20"
                    >
                      Search: {debouncedSearchQuery}
                      <button onClick={() => setSearchQuery('')}><X size={12} /></button>
                    </motion.div>
                  )}
                  {selectedBloodGroup && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="px-4 py-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-rose-100 dark:border-rose-500/20"
                    >
                      Blood: {selectedBloodGroup}
                      <button onClick={() => setSelectedBloodGroup(null)}><X size={12} /></button>
                    </motion.div>
                  )}
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedBloodGroup(null); }}
                    className="text-[10px] font-black text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 uppercase tracking-widest ml-2"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900/90 dark:text-white">
                All Students
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 mt-2 shadow-sm transition-colors hover:bg-indigo-100 dark:hover:bg-indigo-500/20"
              >
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">
                  Batch {selectedSession}
                </span>
              </motion.button>
            </div>

            <motion.div 
              layout
              className={viewMode === 'grid' 
                ? "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6" 
                : "flex flex-col gap-4"
              }
            >
              <motion.div layout className="contents">
                <AnimatePresence mode="popLayout">
                  {searchQuery !== debouncedSearchQuery ? (
                    Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                  ) : filteredStudents.map((student) => (
                    viewMode === 'grid' ? (
                      <StudentCard 
                        key={student.id}
                        student={student} 
                        onClick={() => handleStudentClick(student)}
                      />
                    ) : (
                      <motion.div
                        key={student.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        whileHover={{ x: 10, transition: { duration: 0.3 } }}
                        onClick={() => handleStudentClick(student)}
                        className="group glass p-4 rounded-3xl flex items-center gap-6 cursor-pointer hover:bg-white dark:hover:bg-white/10 transition-all duration-500"
                      >
                      <img 
                        src={student.photoUrl} 
                        alt={student.name} 
                        className="w-16 h-16 rounded-2xl object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://picsum.photos/seed/${student.id}/400/400`;
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg truncate group-hover:text-indigo-600 transition-colors">{student.name}</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{student.roll}</p>
                      </div>
                      <div className="hidden md:block text-right px-6">
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-400 truncate max-w-[200px]">{student.currentWorkplace}</p>
                        <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">{student.bloodGroup}</p>
                      </div>
                      <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
              </motion.div>
            </motion.div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-32 glass rounded-[3rem] border-dashed border-2 border-slate-200 dark:border-white/10">
                <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-300 dark:text-indigo-500/30">
                  <Search size={48} />
                </div>
                <h3 className="text-2xl font-display font-black text-white mb-2">No results found</h3>
                <p className="text-slate-400 font-medium max-w-xs mx-auto">We couldn't find any students matching your current filters. Try resetting them!</p>
                <div className="flex justify-center mt-8">
                  <MagneticButton 
                    onClick={() => { setSearchQuery(''); setSelectedBloodGroup(null); }}
                    className="px-8 py-3"
                  >
                    Reset All Filters
                  </MagneticButton>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-8">
            {/* Resources Section - Bento Style */}
            <div className="bento-card p-8 bg-white/80 dark:bg-slate-900/60 backdrop-blur-3xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-display font-black text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl">
                    <ExternalLink size={20} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  Resources
                </h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: 'Academic Calendar', desc: 'Exams & Holidays', icon: <ChevronRight size={16} />, color: 'indigo' },
                  { title: 'Alumni Network', desc: 'Official LinkedIn', icon: <ChevronRight size={16} />, color: 'violet' },
                  { title: 'Job Board', desc: 'Career Openings', icon: <ChevronRight size={16} />, color: 'emerald' },
                  { title: 'Research Papers', desc: 'Publications', icon: <ChevronRight size={16} />, color: 'amber' },
                ].map((item, i) => (
                  <motion.a 
                    key={i} 
                    href="#" 
                    whileHover={{ x: 8 }}
                    className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-transparent hover:border-indigo-500/20 hover:bg-white dark:hover:bg-white/10 transition-all duration-500"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-500`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.title}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.desc}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="bento-card p-8 bg-gradient-to-br from-indigo-600 to-violet-700 text-white">
              <div className="relative z-10 space-y-6">
                <h3 className="text-xl font-display font-black">Need Support?</h3>
                <p className="text-sm text-indigo-100 font-medium leading-relaxed">
                  Our department office is here to assist you with any academic or administrative inquiries.
                </p>
                <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-indigo-50 transition-colors">
                  Contact Office
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
            </div>

            {/* Featured Alumni Spotlight */}
            <div className="bento-card p-8 bg-slate-900 text-white overflow-hidden relative group">
              <div className="absolute inset-0 opacity-30">
                <img src="https://picsum.photos/seed/alumni/600/400" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={16} className="text-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Spotlight</span>
                </div>
                <h3 className="text-xl font-display font-black mb-2">Alumni Success</h3>
                <p className="text-xs text-slate-300 font-medium mb-6">Discover how our graduates are shaping the future of robotics and automation worldwide.</p>
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                  Read Stories
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Bonding Quote */}
      <section className="max-w-5xl mx-auto px-6 mt-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="relative p-16 md:p-24 rounded-[4rem] bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-white overflow-hidden border border-slate-100 dark:border-white/5 shadow-2xl"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-[120px]" />
          </div>
          
          <div className="relative z-10 space-y-10">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-3xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
                <GraduationCap size={32} />
              </div>
            </div>
            
            <p className="text-3xl md:text-5xl font-serif italic leading-tight text-slate-800 dark:text-slate-100">
              "Sessions may pass and distances may grow, but the gears of our bond will always turn in sync. Once a Mechatronics Engineer, <span className="text-gradient font-black not-italic">always a family.</span>"
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
              <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.4em]">
                MTE Family • KUET Official
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Success Notification */}
      <AnimatePresence>
        {showLoginSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[1000] px-6 py-3 bg-emerald-500 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-500/40 flex items-center gap-3"
          >
            <Check size={16} />
            Successfully logged in
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top & FAB */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4"
          >
            <button
              onClick={() => {
                searchInputRef.current?.focus();
                searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-indigo-500/40"
            >
              <Search size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 pt-12 px-6 transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center p-1.5">
              <img src="https://i.imgur.com/kH7j2S2.png" alt="KUET" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="font-display font-bold text-white">KUET Mechatronics</p>
              <p className="text-xs text-slate-400 font-medium">© 2024 Department of MTE, KUET</p>
            </div>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors"><Github size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {selectedStudent && (
          <StudentModal 
            student={selectedStudent} 
            isLoggedIn={isLoggedIn}
            onLoginClick={() => {
              setSelectedStudent(null);
              setShowLoginModal(true);
            }}
            onClose={() => setSelectedStudent(null)} 
          />
        )}
        {showLoginModal && (
          <LoginModal 
            onLogin={handleLogin}
            onClose={() => setShowLoginModal(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
