import { Container } from 'src/components'
import { Logo } from './Logo/Logo'
import { Nav } from './Nav/Nav';
import { HeaderActions } from './HeaderActions/HeaderActions';
import styles from './Header.module.css'

export const Header = () => {
	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.content}>
					<Logo />
					<Nav />
					<HeaderActions />
				</div>
			</Container>
		</header>
	);
}