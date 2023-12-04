// NetworkStatusProvider.tsx
import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import useNetworkStatus from "./useNetworkStatus";

interface NetworkStatusProviderProps {
	children: ReactNode;
}

interface NetworkStatusContextProps {
	isOnline: boolean;
}

const NetworkStatusContext = createContext<
	NetworkStatusContextProps | undefined
>(undefined);

const NetworkStatusProvider: React.FC<NetworkStatusProviderProps> = ({
	children,
}) => {
	const isOnline = useNetworkStatus();

	return (
		<NetworkStatusContext.Provider value={{ isOnline }}>
			{children}
		</NetworkStatusContext.Provider>
	);
};

const useNetworkStatusContext = (): NetworkStatusContextProps => {
	const context = useContext(NetworkStatusContext);
	if (!context) {
		throw new Error(
			"useNetworkStatusContext must be used within a NetworkStatusProvider"
		);
	}
	return context;
};

export { NetworkStatusProvider, useNetworkStatusContext };
