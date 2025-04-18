import styles from './Card.module.css'

export const ServiceCard = ({ service }) => (
	<div className={styles.card}>
		<img className={styles.image} src={service.image} alt={service.name} />
		<h4 className={styles.title}>{service.name}</h4>
		<div />
		<p className={styles.text}>{service.description}</p>
	</div>
)