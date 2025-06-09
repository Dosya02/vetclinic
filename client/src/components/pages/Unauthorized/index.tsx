import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@constants'

const UnauthorizedPage: FC = () => (
	<div>
		<h2>403 — Нет доступа</h2>
		<p>У вас нет прав для просмотра этой страницы.</p>
		<Link to={ROUTES.HOME}>
			Вернуться на главную
		</Link>
	</div>
)

export default UnauthorizedPage