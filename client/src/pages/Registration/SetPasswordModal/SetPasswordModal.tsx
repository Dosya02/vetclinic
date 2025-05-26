import { ChangeEvent, FC, FormEvent } from 'react';
import { FormButton, FormPasswordInput } from '@components';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changePassword, changeStep, setPassword } from '@store/reducers';
import styles from './SetPasswordModal.module.css';

export const SetPasswordModal: FC = () => {
  const {
    email,
    password,
    passwordErrorMessage,
  } = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();
  
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(changePassword(e.target.value));
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const resultAction = await dispatch(setPassword({ email, password }));
      
      if (setPassword.fulfilled.match(resultAction)) {
        dispatch(changeStep('done'));
        return;
      }
      
      console.error('Ошибка при установке пароля.');
    } catch (err) {
      console.error('Ошибка при выполнении запроса:', err);
    }
  };
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.text}>
          Регистрация почти завершена. Пожалуйста, установите пароль.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <FormPasswordInput
            placeholder="Введите пароль"
            value={password}
            onChange={handlePasswordChange}
            errorMessage={passwordErrorMessage}
          />
          <FormButton text="Подтвердить"/>
        </form>
      </div>
    </div>
  );
};