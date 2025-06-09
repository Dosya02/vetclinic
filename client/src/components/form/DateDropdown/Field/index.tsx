import { type FC } from 'react'
import clsx from 'clsx'
import { Dropdown, Icon } from '@components/ui'
import { ICONS } from '@constants'
import { useBoolean } from '@hooks'
import styles from './styles.module.css'

interface DropdownFieldProps {
	value: number
	options: { id: string; name: string; value: number | string }[]
	onSelect: (val: number) => void
}

export const DropdownField: FC<DropdownFieldProps> = ({
	value,
	options,
	onSelect,
}) => {
	const { value: isOpen, toggle, setFalse } = useBoolean(false)

	const selectedOption = options.find(opt => String(opt.value) === String(value))

	return (
		<div className={styles.dropdownWrapper}>
			<Dropdown
				isActive={isOpen}
				closeFn={setFalse}
				toggleFn={toggle}
				direction="both"
				trigger={
					<div className={styles.trigger}>
						<span>{selectedOption?.name}</span>
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
								String(option.value) === String(value) && styles.active
							)}
							onClick={() => {
								onSelect(Number(option.value))
								setFalse()
							}}
						>
							{option.name}
						</div>
					))}
				</div>
			</Dropdown>
		</div>
	)
}
