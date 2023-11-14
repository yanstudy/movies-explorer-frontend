import { useRef } from 'react';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Portfolio from '../Portfolio/Portfolio';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import './Main.css';

export default function Main() {
  const aboutProjectRef = useRef(null);
  const techsRef = useRef(null);
  const aboutMeRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className='main'>
      <Promo
        scrollToAboutProject={() => scrollToSection(aboutProjectRef)}
        scrollToTechs={() => scrollToSection(techsRef)}
        scrollToAboutMe={() => scrollToSection(aboutMeRef)}
      />
      <div ref={aboutProjectRef} className='main__ref-section'>
        <AboutProject />
      </div>
      <div ref={techsRef} className='main__ref-section'>
        <Techs />
      </div>
      <div ref={aboutMeRef} className='main__ref-section'>
        <AboutMe />
      </div>
      <Portfolio />
    </main>
  );
}
