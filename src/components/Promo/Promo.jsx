import NavTab from '../NavTab/NavTab';
import './Promo.css';

export default function Promo({
  scrollToAboutMe,
  scrollToAboutProject,
  scrollToTechs,
}) {
  return (
    <section className='promo'>
      <h1 className='promo__text'>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <NavTab
        scrollToAboutProject={scrollToAboutProject}
        scrollToTechs={scrollToTechs}
        scrollToAboutMe={scrollToAboutMe}
      />
    </section>
  );
}
