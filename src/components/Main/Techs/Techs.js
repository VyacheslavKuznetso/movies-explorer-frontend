import './Techs.css';

function Techs() {

  return (
    <section className='technologies' id='technologies'>
      <div className='technologies__text'>
        <h2 className='technologies__text-title'>Технологии</h2>
      </div>
      <h3 className='technologies__title'>7 технологий</h3>
      <p className='technologies__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в&nbsp;дипломном&nbsp;проекте.</p>
      <ul className='technologies__list'>
        <li className='technologies__tech'>HTML</li>
        <li className='technologies__tech'>CSS</li>
        <li className='technologies__tech'>JS</li>
        <li className='technologies__tech'>React</li>
        <li className='technologies__tech'>Git</li>
        <li className='technologies__tech'>Express.js</li>
        <li className='technologies__tech'>mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;