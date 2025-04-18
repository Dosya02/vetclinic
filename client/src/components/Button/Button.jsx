import styles from './Button.module.css'

export const Button = ({ text, onClick }) => (
	<button className={styles.button} onClick={onClick}>
		{text}
	</button>
)