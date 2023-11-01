import './Profile.css';

export default function Profile({ name = 'Артур', email = '123@mail.ru' }) {
  return (
    <div className='profile'>
      <h3 className='profile__hello'>{`Привет, ${name}!`}</h3>
      <form className='profile__form'>
        <label htmlFor='name' className='profile__label'>
          Имя
          <input
            className='profile__input'
            value={name}
            id='name'
            type='text'
          />
        </label>
        <label htmlFor='email' className='profile__label'>
          E-mail
          <input
            className='profile__input'
            value={email}
            id='email'
            type='email'
          />
        </label>
        <button className='profile__submit-button' type='submit'>
          Редактировать
        </button>
        <button className='profile__submit-button profile__submit-button_quit '>
          Выйти из аккаунта
        </button>
      </form>
    </div>
  );
}
