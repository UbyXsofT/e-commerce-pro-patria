// ProductStepper.tsx
import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

interface ProductStepperProps {
	activeStep: number;
}

const ProductStepper: React.FC<ProductStepperProps> = ({ activeStep }) => {
	const steps = ["Step 1", "Step 2", "Step 3"]; // Aggiungi i tuoi passaggi qui

	return (
		<Stepper
			activeStep={activeStep}
			alternativeLabel
		>
			{steps.map((label, index) => (
				<Step key={label}>
					<StepLabel>{label}</StepLabel>
				</Step>
			))}
		</Stepper>
	);
};

export default ProductStepper;
