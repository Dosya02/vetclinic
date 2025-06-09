import type { FC } from 'react'
import clsx from 'clsx'
import { Dropdown, Icon } from '@components/ui'
import { ICONS, type DropdownOptionType } from '@constants'
import { useBoolean } from '@hooks'
import styles from './styles.module.css'

interface DefaultDropdownProps {
	options: DropdownOptionType[]
	onChange: (id: string) => void
	selectedOption?: DropdownOptionType
	placeholder?: string
}

export const DefaultDropdown: FC<DefaultDropdownProps> = ({
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
			<Dropdown
				isActive={value}
				closeFn={setFalse}
				toggleFn={toggle}
				direction="both"
				trigger={
					<div className={styles.trigger}>
						<span>{selectedOption ? selectedOption.name : placeholder}</span>
						<Icon className={styles.icon} name={ICONS.ARROW_DOWN} />
					</div>
				}
			>
				<div className={styles.menu}>
					{options.map(option => (
						<div
							key={option.id}
							className={clsx(
								styles.option,
								selectedOption?.id === option.id && styles.active
							)}
							onClick={() => handleClick(option.id)}
						>
							{option.name}
						</div>
					))}
				</div>
			</Dropdown>
		</div>
	)
}