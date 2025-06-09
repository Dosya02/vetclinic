import type { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

interface AuthPageLayoutProps {
	title: string
	linkTo: string
	linkText: string
	linkCaption: string
	children: ReactNode
}

export const AuthPageLayout: FC<AuthPageLayoutProps> = ({
	title,
	linkTo,
	linkText,
	linkCaption,
	children,
}) => (
	<div className={styles.wrapper}>
		<div className={styles.content}>
			<h3 className={styles.title}>
				{title}
			</h3>
			{children}
			<p className={styles.text}>
				{linkCaption}
				{' '}
				<Link className={styles.link} to={linkTo}>
					{linkText}
				</Link>
			</p>
		</div>
	</div>
)