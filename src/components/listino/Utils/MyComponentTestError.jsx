import React, { useEffect } from "react";

const MyComponentTestError = () => {
	useEffect(() => {
		// Forza un errore di rendering per testare ErrorBoundary
		throw new Error("Errore di rendering forzato.");
	}, []);

	return <div>Contenuto normale del componente</div>;
};

export default MyComponent;
