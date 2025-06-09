import type { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { Icon } from '@components/ui'
import { ANCHORS, ICONS, LOGO_TYPES, type LogoType } from '@constants'
import { scrollToHashElement } from '@utils/helpers'
import styles from './styles.module.css'

interface LogoProps {
	type?: LogoType
}

export const Logo: FC<LogoProps> = ({ type = LOGO_TYPES.LIGHT }) => {
	const navigate = useNavigate()
	const location = useLocation()

	const handleClick = () => scrollToHashElement(
		ANCHORS.INTRO.id,
		navigate,
		location,
	)

	return (
		<div className={styles.logo} onClick={handleClick}>
			<Icon
				className={styles.icon}
				name={type === LOGO_TYPES.LIGHT ? ICONS.LOGO_LIGHT : ICONS.LOGO_DARK}
			/>
			<h6 className={clsx(
				styles.title,
				type === LOGO_TYPES.LIGHT ? styles.light : styles.dark,
			)}>
				Добрый
				<br />
				<span>Доктор Айболит</span>
			</h6>
		</div>
	)
}