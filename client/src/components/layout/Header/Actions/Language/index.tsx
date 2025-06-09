import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Dropdown } from '@components/ui'
import { useBoolean } from '@hooks'
import styles from './styles.module.css'

export const HeaderActionsLanguage: FC = () => {
	const { value, setFalse, toggle } = useBoolean()
	const { i18n } = useTranslation()

	const changeLanguage = (lng: 'en' | 'ru' | 'kz') => {
		i18n.changeLanguage(lng);
	}

	const getLanguageLabel = (lng: string): string => {
		switch (lng) {
			case 'ru':
				return 'rus'
			case 'en':
				return 'eng'
			case 'kz':
				return 'қаз'
			default:
				return lng
		}
	}

	return (
		<Dropdown
			direction="both"
			isActive={value}
			closeFn={setFalse}
			toggleFn={toggle}
			trigger={
				<div className={styles.trigger}>
					{getLanguageLabel(i18n.language)}
				</div>
			}
		>
			<ul className={styles.list}>
				<li
					className={styles.item}
					onClick={() => {
						changeLanguage('ru')
						setFalse()
					}}
				>
					рус
				</li>
				<li
					className={styles.item}
					onClick={() => {
						changeLanguage('en')
						setFalse()
					}}
				>
					eng
				</li>
				<li
					className={styles.item}
					onClick={() => {
						changeLanguage('kz')
						setFalse()
					}}
				>
					қаз
				</li>
			</ul>
		</Dropdown>
	)
}