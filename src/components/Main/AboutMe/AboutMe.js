import './AboutMe.css'
import PhotoStudent from '../../../images/photo_2023-12-01 10.45.12.jpeg';
import Portfolio from '../Portfolio/Portfolio'

function AboutMe() {

  return (
    <>
      <section className='student' id='student'>
        <div className='student__text'>
          <h2 className='student__text-title'>Студент</h2>
        </div>
        <div className='business-card'>
          <div className='student__card'>
            <h3 className='student__name'>Вячеслав</h3>
            <p className='student__job'>Web-разработчик</p>
            <p className='student__biography'>"Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы."</p>
            <a className='student__github effect' href='https://github.com/VyacheslavKuznetso' target='_blank' rel='noopener noreferrer'>Github</a>
          </div>
          <div className='student__photo'>
            <div className='student__photo-conteiner'>
              <img className='student__photo-me' src={PhotoStudent} alt="Фото студента"></img>
            </div>
          </div>
        </div>
      </section>
      <Portfolio />
    </>
  )
}

export default AboutMe;