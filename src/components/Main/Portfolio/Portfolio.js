import './Portfolio.css'

function Portfolio() {

  return (
    <section className='student-portfolio'>
      <div className='student-portfolio__text'>
        <h2 className='student-portfolio__text-title'>Портфолио</h2>
      </div>
      <ul className='student-portfolio__list'>
        <li className='student-portfolio__links'>
          <a className='student-portfolio__link effect' href='https://vyacheslavkuznetso.github.io/how-to-learn/' target='_blank' rel='noopener noreferrer'>
            <p className='student-portfolio__name'>Статичный сайт</p>
            <p className='student-portfolio__arrow'>&#8599;</p>
          </a>
        </li>
        <li className='student-portfolio__links'>
          <a className='student-portfolio__link effect' href='https://vyacheslavkuznetso.github.io/Russian-travel/' target='_blank' rel='noopener noreferrer'>
            <p className='student-portfolio__name'>Адаптивный сайт</p>
            <p className='student-portfolio__arrow'>&#8599;</p>
          </a>
        </li>
        <li className='student-portfolio__links'>
          <a className='student-portfolio__link effect' href='https://rumesto.nomoredomainsmonster.ru' target='_blank' rel='noopener noreferrer'>
            <p className='student-portfolio__name'>Одностраничное приложение</p>
            <p className='student-portfolio__arrow'>&#8599;</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;