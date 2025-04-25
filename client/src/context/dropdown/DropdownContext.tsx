import { createContext } from "react";

type DropdownContextType = {
	openDropdown: string | null;
	setOpenDropdown: (id: string | null) => void;
};

export const DropdownContext = createContext<DropdownContextType | undefined>(undefined);