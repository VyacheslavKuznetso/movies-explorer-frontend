import './Promo.css';
import NavTab  from '../NavTab/NavTab';


function Promo() {

  return (
    <section className='header__resources'>
      <div className='block-text'>
        <h1 className='block-text_title'>Учебный&nbsp;проект студента факультета Веб&#8209;разработки.</h1>
      </div>
      <NavTab />
    </section>
  );
}

export default Promo;