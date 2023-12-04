// useNetworkStatus.ts
import { useEffect, useState } from "react";

const useNetworkStatus = (): boolean => {
	const [isOnline, setIsOnline] = useState<boolean>(
		typeof window !== "undefined" && window.navigator.onLine
	);

	useEffect(() => {
		const handleConnectionChange = () => {
			setIsOnline(typeof window !== "undefined" && window.navigator.onLine);
		};

		if (typeof window !== "undefined") {
			window.addEventListener("online", handleConnectionChange);
			window.addEventListener("offline", handleConnectionChange);
		}

		return () => {
			if (typeof window !== "undefined") {
				window.removeEventListener("online", handleConnectionChange);
				window.removeEventListener("offline", handleConnectionChange);
			}
		};
	}, []);

	return isOnline;
};

export default useNetworkStatus;
