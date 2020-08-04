import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

//import css
import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars2.githubusercontent.com/u/48356215?s=460&u=71601327f3c8678b4357d31e56428c06f76c598b&v=4" alt="Jefferson Soares"/>
        <div>
          <strong>Jefferson Soares</strong>
          <span>Web Development</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de sistemas da informação.
        <br /><br />
        Apaixonado por programação web ensinando tecnologias novas e desenvolvendo aplicações que podem mudar a vida das pessoas, através dos meus cursos e da minha didática produtiva, mais de 200.000 pessoas ja passaram por um dos meus cursos e elevaram seu conhecimento ao um pŕoximo nível.
      </p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ 120,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="WhatsApp" />
          Entrar em contato
        </button>
      </footer>

    </article>
  );
}

export default TeacherItem;