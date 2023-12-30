import './Footer.css'

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__conteiner'>
        <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className='footer__zone'>
          <p className='footer__copyrigth'>© 2023 Вячеслав Кузнецов</p>
          <ul className='footer__links'>
            <li className='footer__item'><a className='footer__link effect' href='https://practicum.yandex.ru' target='_blank' rel='noopener noreferrer'>Яндекс.Практикум</a></li>
            <li className='footer__item'><a className='footer__link effect' href='https://github.com/VyacheslavKuznetso' target='_blank' rel='noopener noreferrer'>Github</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;