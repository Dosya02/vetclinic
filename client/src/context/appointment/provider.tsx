import { useCallback, useState, type FC, type ReactNode } from 'react'
import { AppointmentModalContext } from './context'

export const AppointmentModalProvider: FC<{ children: ReactNode }> =
	({ children }) => {
		const [isOpen, setIsOpen] = useState(false)

		const open = useCallback(() => setIsOpen(true), [])
		const close = useCallback(() => setIsOpen(false), [])

		return (
			<AppointmentModalContext.Provider value={{ isOpen, open, close }}>
				{children}
			</AppointmentModalContext.Provider>
		)
	}