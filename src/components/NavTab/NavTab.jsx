import './NavTab.css';

export default function NavTab({
  scrollToAboutProject,
  scrollToTechs,
  scrollToAboutMe,
}) {
  return (
    <div className='navtab'>
      <button
        className='navtab__button'
        type='button'
        onClick={scrollToAboutProject}
      >
        О проекте
      </button>
      <button className='navtab__button' type='button' onClick={scrollToTechs}>
        Технологии
      </button>
      <button
        className='navtab__button'
        type='button'
        onClick={scrollToAboutMe}
      >
        Студент
      </button>
    </div>
  );
}
