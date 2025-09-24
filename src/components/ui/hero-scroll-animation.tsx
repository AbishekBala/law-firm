'use client';

import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import React, { useRef, forwardRef } from 'react';

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  return (
    <motion.section
      style={{ scale, rotate }}
      className='sticky font-semibold top-0 min-h-[120vh] bg-gradient-to-br from-legal-navy via-legal-navy/95 to-legal-navy/90 flex flex-col items-center justify-center text-white py-20'
    >
      <div className="absolute inset-0" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0h-7.17L36.162 17.46l3.493 3.492L54.627 0zM33.407 26.162l-9.115 3.49-3.49-3.49 9.114-3.49 3.491 3.49zM.001 54.627v-7.17L17.46 36.163l3.492 3.493L.001 54.627z\' fill=\'%23f4a300\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        backgroundSize: '60px 60px'
      }}></div>
      <div className='absolute inset-0 bg-gradient-to-br from-legal-navy/90 via-legal-navy/95 to-legal-navy/80 backdrop-blur-sm'></div>
      <div className='relative z-10 max-w-6xl px-8 text-center'>
        <div className='mb-8'>
          <span className='inline-block px-4 py-2 text-sm font-medium tracking-wider text-legal-gold/90 uppercase bg-legal-gold/10 rounded-full mb-6 backdrop-blur-sm'>
            Trusted Legal Advisors
          </span>
        </div>
        <h1 className='2xl:text-8xl text-6xl font-serif font-bold text-center tracking-tight leading-[1.1] mb-10 text-white'>
          Expert Legal Solutions <br /> For Your <span className='text-legal-gold'>Business</span>
        </h1>
        <p className='text-2xl text-white/90 max-w-3xl mx-auto mb-16 leading-relaxed'>
          Delivering strategic legal counsel with integrity, excellence, and a commitment to your success.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button className='px-8 py-4 bg-legal-gold hover:bg-legal-gold-dark text-legal-navy font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]'>
            Get a Free Consultation
          </button>
          <button className='px-8 py-4 border-2 border-legal-gold text-legal-gold hover:bg-legal-gold/10 font-medium rounded-lg transition-all duration-300 hover:shadow-lg'>
            Learn More
          </button>
        </div>
      </div>
    </motion.section>
  );
};

const Section2: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className='relative min-h-[120vh] bg-gradient-to-b from-legal-navy/90 via-legal-navy/95 to-legal-navy text-white pt-20 pb-32'>
      <article className='container mx-auto relative z-10 pt-20 px-4'>
        <h1 className='text-6xl md:text-7xl leading-[100%] pb-16 font-bold tracking-tight text-center'>
          Our Core Values
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
          <div className='bg-white/5 hover:bg-white/10 backdrop-blur-lg p-10 rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-legal-gold/30 h-full flex flex-col'>
            <div className='w-16 h-16 bg-legal-gold/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm'>
              <svg className='w-8 h-8 text-legal-gold' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'></path></svg>
            </div>
            <h3 className='text-3xl font-serif font-bold mb-4 text-white'>Integrity</h3>
            <p className='text-white/80 leading-relaxed text-lg flex-grow'>We uphold the highest standards of professionalism and ethical conduct in all our dealings, ensuring your trust is never compromised.</p>
          </div>
          <div className='bg-white/5 hover:bg-white/10 backdrop-blur-lg p-10 rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-legal-gold/30 h-full flex flex-col'>
            <div className='w-16 h-16 bg-legal-gold/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm'>
              <svg className='w-8 h-8 text-legal-gold' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'></path></svg>
            </div>
            <h3 className='text-3xl font-serif font-bold mb-4 text-white'>Excellence</h3>
            <p className='text-white/80 leading-relaxed text-lg flex-grow'>We are committed to delivering exceptional legal services with meticulous attention to detail and a relentless pursuit of the best outcomes.</p>
          </div>
          <div className='bg-white/5 hover:bg-white/10 backdrop-blur-lg p-10 rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-legal-gold/30 h-full flex flex-col'>
            <div className='w-16 h-16 bg-legal-gold/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm'>
              <svg className='w-8 h-8 text-legal-gold' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'></path></svg>
            </div>
            <h3 className='text-3xl font-serif font-bold mb-4 text-white'>Client Focus</h3>
            <p className='text-white/80 leading-relaxed text-lg flex-grow'>Your success is our priority. We take the time to listen, understand your unique needs, and deliver customized legal solutions that drive results.</p>
          </div>
          <div className='bg-white/5 hover:bg-white/10 backdrop-blur-lg p-10 rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-legal-gold/30 h-full flex flex-col'>
            <div className='w-16 h-16 bg-legal-gold/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm'>
              <svg className='w-8 h-8 text-legal-gold' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z'></path></svg>
            </div>
            <h3 className='text-3xl font-serif font-bold mb-4 text-white'>Innovation</h3>
            <p className='text-white/80 leading-relaxed text-lg flex-grow'>We embrace modern approaches and cutting-edge strategies to solve complex legal challenges effectively and efficiently.</p>
          </div>
        </div>
      </article>
    </motion.section>
  );
};

const HeroScrollAnimation = forwardRef<HTMLElement>((props, ref) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div className='relative'>
      <main ref={container} className='relative h-[240vh] overflow-hidden bg-legal-navy'>
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />
      </main>
    </div>
  );
});

HeroScrollAnimation.displayName = 'HeroScrollAnimation';

export default HeroScrollAnimation;
