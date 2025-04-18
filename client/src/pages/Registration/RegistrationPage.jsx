import { useState } from 'react';
import styles from './RegistrationPage.module.css'
import { Link, useOutletContext } from 'react-router-dom';

export const RegistrationPage = () => {
	const { setModalActive, setEmail } = useOutletContext();

	const [formData, setFormData] = useState({
		email: '',
		agree: false,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!formData.agree) {
			alert('Вы должны согласиться с условиями.');
			return;
		}

		setEmail(formData.email)
		setModalActive(true)

		console.log(formData);
	};

	return (
		<>
			<div className={styles.content}>
				<h3 className={styles.title}>Регистрация</h3>
				<form className={styles.form} onSubmit={handleSubmit}>
					<input
						className={styles.input}
						type='email'
						id='email'
						name='email'
						placeholder='Введите почту'
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<label className={styles.checkboxLabel}>
						<input
							className={styles.checkbox}
							type="checkbox"
							id="agree"
							name="agree"
							checked={formData.agree}
							onChange={handleChange}
							required
						/>
						<span>Я согласен с условиями предоставления услуг</span>
					</label>
					<button className={styles.button} type='submit'>
						Зарегистрироваться
					</button>
				</form>
				<p className={styles.text}>
					Уже есть аккаунт? <Link className={styles.textLink} to='/login'>Войти</Link>
				</p>
			</div>
		</>
	);
}