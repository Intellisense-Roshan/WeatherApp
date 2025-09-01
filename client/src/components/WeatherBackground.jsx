import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo } from 'react';

const WeatherBackground = ({ weatherCondition }) => {
  // Normalize weather condition to handle different API response formats
  const normalizedCondition = useMemo(() => {
    const condition = weatherCondition?.toLowerCase() || 'clear';
    
    // Map similar conditions to the same effect
    if (['mist', 'fog', 'haze'].includes(condition)) return 'mist';
    if (['rain', 'drizzle'].includes(condition)) return 'rain';
    if (['clouds', 'cloudy', 'overcast'].includes(condition)) return 'clouds';
    
    return condition;
  }, [weatherCondition]);

  // Memoized background styles and elements based on weather condition
  const { backgroundColor, particleCount } = useMemo(() => {
    const styles = {
      rain: {
        backgroundColor: 'bg-gradient-to-b from-slate-700 to-slate-900',
        particleCount: 100,
      },
      snow: {
        backgroundColor: 'bg-gradient-to-b from-slate-300 to-slate-500',
        particleCount: 50,
      },
      clouds: {
        backgroundColor: 'bg-gradient-to-b from-slate-400 to-slate-600',
        particleCount: 8,
      },
      clear: {
        backgroundColor: 'bg-gradient-to-b from-sky-400 to-blue-600',
        particleCount: 1,
      },
      thunderstorm: {
        backgroundColor: 'bg-gradient-to-b from-slate-800 to-slate-950',
        particleCount: 2,
      },
      mist: {
        backgroundColor: 'bg-gradient-to-b from-gray-400 to-gray-600',
        particleCount: 5,
      },
    };

    // Default to clear sky if condition not found
    const style = styles[normalizedCondition] || styles.clear;
    
    return {
      backgroundColor: style.backgroundColor,
      particleCount: style.particleCount,
    };
  }, [normalizedCondition]);

  const renderWeatherElements = () => {
    switch (normalizedCondition) {
      case 'rain':
        return [...Array(particleCount)].map((_, i) => (
          <motion.div
            key={`raindrop-${i}`}
            className="absolute w-[1px] h-[15px] bg-blue-300/40"
            initial={{ 
              x: `${Math.random() * 100}%`,
              y: -20,
              opacity: 0.8,
              rotate: 15,
            }}
            animate={{ 
              y: '110vh',
              opacity: 0.3,
            }}
            transition={{
              duration: 0.7 + Math.random() * 0.5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
          />
        ));

      case 'snow':
        return [...Array(particleCount)].map((_, i) => (
          <motion.div
            key={`snowflake-${i}`}
            className="absolute w-1.5 h-1.5 bg-white/80 rounded-full"
            initial={{ 
              x: `${Math.random() * 100}%`,
              y: -10,
              scale: 0.5 + Math.random() * 0.5,
            }}
            animate={{ 
              y: '110vh',
              x: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`
              ],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear'
            }}
          />
        ));

      case 'clouds':
        return [...Array(particleCount)].map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute bg-white/20 rounded-full filter blur-lg"
            style={{
              width: `${100 + Math.random() * 100}px`,
              height: `${60 + Math.random() * 40}px`,
            }}
            initial={{ 
              x: '-20%',
              y: `${(i * 100) / particleCount}%`,
              scale: 1 + Math.random(),
            }}
            animate={{ 
              x: '120%',
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Infinity,
              delay: i * 3,
              ease: 'linear',
              scale: {
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            }}
          />
        ));

      case 'thunderstorm':
        return (
          <>
            {/* Dark clouds */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`storm-cloud-${i}`}
                className="absolute bg-slate-900/40 rounded-full filter blur-lg"
                style={{
                  width: `${150 + Math.random() * 100}px`,
                  height: `${90 + Math.random() * 60}px`,
                }}
                initial={{ 
                  x: '-20%',
                  y: `${(i * 100) / 5}%`,
                  scale: 1 + Math.random(),
                }}
                animate={{ x: '120%' }}
                transition={{
                  duration: 20 + Math.random() * 10,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: 'linear',
                }}
              />
            ))}
            {/* Lightning flashes */}
            <motion.div
              className="absolute inset-0 bg-white"
              animate={{ 
                opacity: [0, 0, 0, 0.7, 0, 0.3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: Math.random() * 5 + 3,
                ease: 'easeInOut',
              }}
            />
          </>
        );

      case 'mist':
        return [...Array(particleCount)].map((_, i) => (
          <motion.div
            key={`mist-${i}`}
            className="absolute inset-0 backdrop-blur-sm"
            style={{
              background: `linear-gradient(${i * (360 / particleCount)}deg, transparent, rgba(255,255,255,0.2), transparent)`,
            }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 360],
            }}
            transition={{
              opacity: {
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              rotate: {
                duration: 50 + Math.random() * 30,
                repeat: Infinity,
                ease: 'linear',
              }
            }}
          />
        ));

      case 'clear':
        return (
          <>
            {/* Sun glow */}
            <motion.div
              className="absolute top-[5%] right-[10%] w-40 h-40 bg-yellow-500/60 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Light rays */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 85% 15%, rgba(255,255,255,0.15) 0%, transparent 60%)',
              }}
              animate={{
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`fixed inset-0 overflow-hidden -z-10 ${backgroundColor}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 pointer-events-none" />
      
      <AnimatePresence>
        {renderWeatherElements()}
      </AnimatePresence>

      {/* Additional overlay for text readability in bright conditions */}
      {normalizedCondition === 'clear' && (
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      )}
    </motion.div>
  );
};

export default WeatherBackground;
