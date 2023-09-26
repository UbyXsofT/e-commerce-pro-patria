import { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextProps {
	openSettings: boolean;
	setOpenSettings: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextProps>({
	openSettings: false,
	setOpenSettings: (value: boolean) => {},
});

export const useSettings = () => useContext(SettingsContext);

interface SettingsProviderProps {
	children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
	const [openSettings, setOpenSettings] = useState(false);

	return (
		<SettingsContext.Provider value={{ openSettings, setOpenSettings }}>
			{children}
		</SettingsContext.Provider>
	);
};
