import type { FC } from 'react'
import clsx from 'clsx'
import { Icons } from '@assets/icons'
import type { IconsType } from '@constants'

interface IconProps {
	name: IconsType
	className?: string
}

export const Icon: FC<IconProps> = ({ name, className }) => (
	<svg className={clsx(className)}>
		<use href={Icons + "#icon-" + name} />
	</svg>
)