import styles from './ServiceCard.module.css'

export const ServiceCard = ({ service }) => (
	<div className={styles.card}>
		<div className={styles.imageBlock}>
			{service.image && (
				<img
					className={styles.image}
					src={service.image}
					alt={service.name}
				/>
			)}
		</div>
		<div className={styles.titleBlock}>
			<img
				className={styles.icon}
				src={service.icon}
				alt={service.name}
			/>
			<h4 className={styles.title}>
				{service.name}
			</h4>
		</div>
		<div className={styles.textBlock}>
			<p className={styles.text}>
				{service.description}
			</p>
		</div>
	</div>
)