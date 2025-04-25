import { ReactNode, useState } from "react";
import { DropdownContext } from "./DropdownContext";

export const DropdownProvider = ({ children }: { children: ReactNode }) => {
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	return (
		<DropdownContext.Provider value={{ openDropdown, setOpenDropdown }}>
			{children}
		</DropdownContext.Provider>
	);
};