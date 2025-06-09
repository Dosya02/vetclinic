import { useRef, type FC } from 'react'
import { Container, Logo } from '@components/ui'
import { useBoolean } from '@hooks'
import { HeaderActions } from './Actions'
import { HeaderBurger } from './Burger'
import { HeaderNav } from './Nav'
import { HeaderMenu } from './Menu'
import styles from './styles.module.css'

export const PageHeader: FC = () => {
	const menu = useBoolean(false)
	const burgerRef = useRef<HTMLDivElement | null>(null)

	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.inner}>
					<div className={styles.left}>
						<HeaderBurger
							ref={burgerRef}
							isActive={menu.value}
							toggleFn={menu.toggle}
						/>
						<Logo />
					</div>
					<HeaderNav />
					<HeaderActions />
					<HeaderMenu
						isActive={menu.value}
						closeFn={menu.setFalse}
						excludeRefs={[burgerRef]}
					/>
				</div>
			</Container>
		</header >
	)
}