import { useState, type FC } from 'react'
import clsx from 'clsx'
import { Button, Container } from '@components/ui'
import { useAppSelector } from '@hooks'
import type { AppointmentModel } from '@models'
import { useGetAllAppointmentsQuery, useGetPetsQuery, useGetServicesQuery } from '@store/api'
import styles from './styles.module.css'

const formatDate = (isoDateString: string) => {
	const date = new Date(isoDateString)

	return new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}).format(date)
}

const VetAppointments: FC = () => {
	const userInfo = useAppSelector(state => state.authReducer.userInfo)
	const { data, isLoading, isError } = useGetAllAppointmentsQuery()
	const pets = useGetPetsQuery()

	const appointments = data?.appointments?.filter(
		appointment => appointment.vetId === userInfo?.id
	) || []

	const servicesQuery = useGetServicesQuery()
	const serviceMap = new Map(
		servicesQuery.data?.services.map(service => [service.id, service.name])
	)

	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 5
	const totalPages = Math.ceil(appointments.length / itemsPerPage)

	const startIdx = (currentPage - 1) * itemsPerPage
	const paginatedData = appointments.slice(startIdx, startIdx + itemsPerPage)

	const goToPage = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page)
		}
	}

	const columns = [
		{ key: 'petName', label: 'Имя питомца' },
		{ key: 'serviceId', label: 'Услуга' },
		{ key: 'datetime', label: 'Дата и время' },
		{ key: 'email', label: 'Почта владелца' }
	]

	if (isLoading) return <div>Загрузка записей...</div>
	if (isError) return <div>Ошибка загрузки записей.</div>
	if (appointments.length === 0) return <div>У вас нет никаких записей.</div>

	return (
		<div className={styles.appointments}>
			<Container>
				<div className={styles.inner}>
					<div className={clsx(styles.wrapper)}>
						<table className={clsx(styles.table)}>
							<thead>
								<tr>
									<th>№</th>
									{columns.map(col => (
										<th key={String(col.key)}>{col.label}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{paginatedData.map((item, idx) => (
									<tr key={item.id || idx}>
										<td>{startIdx + idx + 1}</td>
										{columns.map(col => {
											const value = item[col.key as keyof AppointmentModel]
											let displayValue = String(
												value ??
												pets.data?.pets.find(pet => pet.id === item.petId)?.name ??
												'-'
											);

											if (col.key === 'serviceId') {
												displayValue =
													typeof value === 'string' ? serviceMap.get(value) ?? '-' : '-'
											}

											if (col.key === 'datetime' && typeof value === 'string') {
												displayValue = formatDate(value)
											}

											if (col.key === 'email') {
												displayValue = item.userId ? userInfo!.email : '-'
											}

											return <td key={col.key}>{displayValue}</td>
										})}
									</tr>
								))}
							</tbody>
						</table>

						<div className={styles.pagination}>
							<Button
								className={clsx(styles.paginationButton, styles.prev)}
								text="Назад"
								onClick={() => goToPage(currentPage - 1)}
								disabled={currentPage === 1}
							/>
							<span>
								Страница {currentPage} из {totalPages}
							</span>
							<Button
								className={clsx(styles.paginationButton, styles.next)}
								text="Вперёд"
								onClick={() => goToPage(currentPage + 1)}
								disabled={currentPage === totalPages}
							/>
						</div>
					</div>
				</div>
			</Container>
		</div>
	)
}

export default VetAppointments
