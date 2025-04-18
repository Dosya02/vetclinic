import styles from './Section.module.css'

export const Section = ({ children, className = '', ...props }) => (
	<section className={`${styles.section} ${className}`} {...props}>
		{children}
	</section>
)