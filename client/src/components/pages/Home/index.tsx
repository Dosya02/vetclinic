import { type FC } from 'react'
import { Intro } from './Intro'
import { About } from './About'
import { Team } from './Team'
import { Services } from './Services'
import { Contacts } from './Contacts'

const HomePage: FC = () => (
	<>
		<Intro />
		<About />
		<Team />
		<Services />
		<Contacts />
	</>
)

export default HomePage