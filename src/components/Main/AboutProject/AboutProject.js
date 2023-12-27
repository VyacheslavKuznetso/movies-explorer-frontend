import './AboutProject.css'

function AboutProject() {

  return (
    <section className='about' id='about'>
      <div className='about__text'>
        <h2 className='about__text-title'>О проекте</h2>
      </div>
      <div className='about__table'>
        <div className='about__table-column'>
          <h3 className='about__table-title'>Дипломный проект включал 5&nbsp;этапов</h3>
          <p className='about__table-subtitle'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about__table-column'>
          <h3 className='about__table-title'>На выполнение диплома ушло 5&nbsp;недель</h3>
          <p className='about__table-subtitle'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='about__timeline'>
        <p className='about__backend about__backend-xs_background-color'>1 неделя</p>
        <p className='about__frontend about__frontend-xx_background-color'>4 недели</p>
      </div>
      <div className='about__timeline'>
        <p className='about__backend about__backend-title'>Back-end</p>
        <p className='about__frontend about__frontend-title'>Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject;