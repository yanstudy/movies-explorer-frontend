import MainTitle from '../MainTitle/MainTitle';
import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='aboutproject'>
      <MainTitle title={'О проекте'} />
      <div className='aboutproject__info'>
        <div className='aboutproject__part'>
          <h3 className='aboutprohect__subtitle'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='aboutproject__paragraph'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='aboutproject__part'>
          <h3 className='aboutprohect__subtitle'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='aboutproject__paragraph'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='aboutproject__weeks aboutproject__weeks_margin'>
        <div className='aboutproject__oneweek aboutproject_textcolor'>
          1 неделя
        </div>
        <div className='aboutproject__fourweeks'>4 недели</div>
      </div>
      <div className='aboutproject__weeks'>
        <div className='aboutproject__oneweek aboutproject_background'>
          Back-end
        </div>
        <div className='aboutproject__fourweeks aboutproject_background'>
          Front-end
        </div>
      </div>
    </section>
  );
}
