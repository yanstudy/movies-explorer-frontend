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
    <div className='main'>
      <Promo
        scrollToAboutProject={() => scrollToSection(aboutProjectRef)}
        scrollToTechs={() => scrollToSection(techsRef)}
        scrollToAboutMe={() => scrollToSection(aboutMeRef)}
      />
      <div ref={aboutProjectRef}>
        <AboutProject />
      </div>
      <div ref={techsRef}>
        <Techs />
      </div>
      <div ref={aboutMeRef}>
        <AboutMe />
      </div>
      <Portfolio />
    </div>
  );
}
