import { Button } from 'src/components'
import styles from './Card.module.css'

export const TeamCard = ({ name, image, position }) => (
	<div className={styles.teamCard}>
		<div className={styles.imageBlock}>
			<img
				className={styles.image}
				src={image}
				alt={name}
			/>
		</div>
		<div className={styles.textBlock}>
			<h3 className={styles.title}>{name}</h3>
			<p className={styles.text}>{position}</p>
		</div>
		<div />
		<div className={styles.buttonBlock}>
			<Button />
		</div>
	</div>
)