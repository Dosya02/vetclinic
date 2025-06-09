import type { FC } from 'react'
import { Intro } from './Intro'
import { ServicesList } from './List'
import { ServicesBanner } from './Banner'

const ServicesPage: FC = () => (
	<>
		<Intro />
		<ServicesList />
		<ServicesBanner />
	</>
)

export default ServicesPage