import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Services from '../components/Services';
import WhyPetti from '../components/WhyPetti';
import Partners from '../components/Partners';
import Testimonials from '../components/Testimonials';
import Cta from '../components/Cta';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Partners />
      <Services />
      <WhyPetti />
      <Testimonials />
      <Cta />
    </>
  );
};

export default HomePage;