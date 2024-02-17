import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  console.log(navigate);
  return (
    <section className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <p className='not-found__subtitle'>Страница не найдена</p>
      <button type='button'
      className="not-found__link  effect"
      onClick={() => { navigate(-1) }}>Назад</button>
    </section>
  )
}
export default PageNotFound;
