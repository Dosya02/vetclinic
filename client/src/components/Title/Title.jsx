import styles from './Title.module.css'

export const Title = ({ text, align = 'center' }) =>
	<h2 className={styles.title} style={{ textAlign: align }}>{text}</h2>