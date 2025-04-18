import styles from './Title.module.css'

export const Title = ({ text, align = 'left' }) =>
	<h2 className={styles.title} style={{ textAlign: align }}>{text}</h2>