import { createContext } from 'react'

export interface AppointmentModalContextType {
	isOpen: boolean
	open: () => void
	close: () => void
}

export const AppointmentModalContext =
	createContext<AppointmentModalContextType | null>(null)