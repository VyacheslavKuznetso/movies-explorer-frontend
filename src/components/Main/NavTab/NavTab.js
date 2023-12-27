import './NavTab.css';
import { HashLink as Link } from 'react-router-hash-link';


function NavTab() {

  return (
    <ul className='block-navigation'>
      <li className='block-navigation__info_list'><button className='block-navigation__button'><Link className='block-navigation__info effect' to='#about'>О проекте</Link></button></li>
      <li className='block-navigation__info_list'><button className='block-navigation__button'><Link className='block-navigation__info effect' to='#technologies'>Технологии</Link></button></li>
      <li className='block-navigation__info_list'><button className='block-navigation__button'><Link className='block-navigation__info effect' to='#student'>Студент</Link></button></li>
    </ul>
  )
}

export default NavTab;