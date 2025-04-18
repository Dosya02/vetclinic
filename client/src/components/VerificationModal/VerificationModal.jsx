import { useState } from 'react'
import { MailIcon } from 'src/assets'
import styles from './VerificationModal.module.css'

export const VerificationModal = ({ active, setActive, email }) => {
	const [code, setCode] = useState(new Array(6).fill(''))
	const [error, setError] = useState(false)

	const handleChange = (e, index) => {
		const value = e.target.value
		if (isNaN(value)) return

		const newCode = [...code]
		newCode[index] = value
		setCode(newCode)
		setError(false)

		if (value && e.target.nextSibling) {
			e.target.nextSibling.focus()
		}
	}

	const handleKeyDown = (e, index) => {
		if (e.key === 'Backspace') {
			e.preventDefault()
			const newCode = [...code]

			if (code[index] !== '') {
				for (let i = index; i < newCode.length; i++) {
					newCode[i] = ''
				}
				setCode(newCode)
			} else {
				if (index > 0) {
					for (let i = index - 1; i < newCode.length; i++) {
						newCode[i] = ''
					}
					setCode(newCode)
					setTimeout(() => {
						const prevInput = e.target.previousSibling
						if (prevInput) prevInput.focus()
					}, 0)
				}
			}
		}
	}

	const handleCancel = () => {
		setActive(false)
		setCode(new Array(6).fill(''))
		setError(false)
	}

	const handleSubmit = () => {
		if (code.includes('')) {
			setError(true)
			return
		}
		alert(`Код подтверждения: ${code.join('')}`)
	}

	return (
		<div className={active ? `${styles.modal} ${styles.modalActive}` : styles.modal}>
			<div className={styles.content}>
				<div className={styles.imageBlock}>
					<img src={MailIcon} alt="mail icon" />
				</div>
				<div className={styles.textBlock}>
					<p className={styles.text}>
						Код подтверждения отправлен на адрес <span>{email}</span>. Чтобы продолжить, введите этот код.
					</p>
					<div className={styles.codeInputs}>
						{code.map((digit, index) => (
							<input
								key={index}
								className={`${styles.codeInput} ${error && code[index] === '' ? styles.codeInputError : ''}`}
								type="text"
								maxLength={1}
								value={digit}
								onChange={e => handleChange(e, index)}
								onKeyDown={e => handleKeyDown(e, index)}
							/>
						))}
					</div>
					{error && (
						<p className={styles.errorText}>Пожалуйста, введите все 6 цифр кода</p>
					)}
					<div className={styles.buttons}>
						<button
							className={`${styles.button} ${styles.cancelButton}`}
							onClick={handleCancel}
						>
							Отмена
						</button>
						<button className={`${styles.button} ${styles.sendButton}`}
							onClick={handleSubmit}
						>
							Отправить
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}