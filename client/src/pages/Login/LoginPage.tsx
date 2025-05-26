import { ChangeEvent, FC, FormEvent } from 'react';
import {
	ErrorMessage,
	FormButton,
	FormInput,
	FormPasswordInput,
	Loader,
} from '@components';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { changeEmail, changePassword, login } from '@store/reducers';
import { APP_ROUTES } from '@routes';
import styles from './LoginPage.module.css';

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const {
    loading,
    error,
    email,
    emailErrorMessage,
    password,
    passwordErrorMessage,
  } = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();
  
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeEmail(e.target.value));
  };
  
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(changePassword(e.target.value));
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    try {
      const resultAction = await dispatch(login({ email, password }));
      
      if (!login.fulfilled.match(resultAction)) {
        console.error('Ошибка при авторизации.');
        return;
      }
      
      navigate(`${APP_ROUTES.PROFILE}`);
    } catch (err) {
      console.error('Ошибка при выполнении запроса:', err);
    }
  };
  
  return (
    <div className={styles.content}>
      <h3 className={styles.title}>Войти</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <ErrorMessage message={error}/>}
        <FormInput
          placeholder="Введите почту"
          value={email}
          onChange={handleEmailChange}
          errorMessage={emailErrorMessage}
        />
        <FormPasswordInput
          placeholder="Введите пароль"
          value={password}
          onChange={handlePasswordChange}
          errorMessage={passwordErrorMessage}
        />
        <div className={styles.buttonWrapper}>
          <FormButton text="Войти" fullWidth/>
        </div>
      </form>
      <p className={styles.text}>
        Ещё нет аккаунта? <Link className={styles.link}
                                to="/registration">Регистрация</Link>
      </p>
      {loading && <Loader/>}
    </div>
  );
};