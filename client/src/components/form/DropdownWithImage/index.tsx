import type { FC } from 'react'
import clsx from 'clsx'
import { Avatar, Dropdown, Icon } from '@components/ui'
import { ICONS, type DropdownOptionType } from '@constants'
import { useBoolean } from '@hooks'
import styles from './styles.module.css'

interface DropdownWithImageProps {
	label: string
	options: DropdownOptionType[]
	onChange: (id: string) => void
	selectedOption?: DropdownOptionType
	placeholder?: string
}

export const DropdownWithImage: FC<DropdownWithImageProps> = ({
	label,
	options,
	onChange,
	selectedOption,
	placeholder = 'Выберите...',
}) => {
	const { value, setFalse, toggle } = useBoolean(false)

	const handleClick = (id: string) => {
		onChange(id)
		setFalse()
	}

	return (
		<div className={styles.wrapper}>
			<span className={styles.label}>{label}</span>
			<Dropdown
				isActive={value}
				closeFn={setFalse}
				toggleFn={toggle}
				direction="both"
				trigger={
					<div className={styles.trigger}>
						<Avatar className={styles.avatar} imageUrl={selectedOption?.image} type="pet" />
						<span>{selectedOption ? selectedOption.name : placeholder}</span>
						<Icon className={styles.icon} name={ICONS.ARROW_DOWN} />
					</div>
				}
			>
				<div className={styles.menu}>
					{options.map((option, index) => (
						<div
							key={index}
							className={clsx(
								styles.option,
								selectedOption?.id === option.id && styles.active
							)}
							onClick={() => handleClick(option.id)}
						>
							<Avatar className={styles.avatar} imageUrl={selectedOption?.image} type="pet" />
							<span>{option.name}</span>
						</div>
					))}
				</div>
			</Dropdown>
		</div>
	)
}