import { type FC } from 'react'
import { Avatar } from '@components/ui'
import styles from './styles.module.css'

const ProfileAccountDetails: FC = () => (
	<div className={styles.wrapper}>
		<div className={styles.heading}>
			<div className={styles.image}>
				<Avatar className={styles.avatar} />
				<span className={styles.imageText}>
					Изменить фото
				</span>
			</div>
			<div className={styles.caption}>
				<h3 className={styles.title}>
					Личная информация
				</h3>
				<span className={styles.text}>
					Привет, Пользователь
				</span>
			</div>
		</div>
	</div>
)

export default ProfileAccountDetails