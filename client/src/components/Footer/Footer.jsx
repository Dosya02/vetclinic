import { FooterTop } from './Top/Top'
import { FooterBottom } from './Bottom/Bottom'
import styles from './Footer.module.css'

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<FooterTop />
			<FooterBottom />
		</footer>
	);
}