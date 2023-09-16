import { Popper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface CustomPopperProps {
	isOpen: boolean;
	anchorEl: null | HTMLElement;
	content: string;
}

const CustomPopper = ({ isOpen, anchorEl, content }: CustomPopperProps) => {
	const theme = useTheme();

	return (
		<Popper
			sx={{
				backgroundColor: theme.palette.mode !== "dark" ? "#1B1B1B" : "#F2F2F2",
				color: theme.palette.mode !== "dark" ? "#F2F2F2" : "#1B1B1B",
				borderRadius: 1,
				padding: 1,
				zIndex: 1201,
			}}
			placement="bottom"
			disablePortal={false}
			open={isOpen}
			anchorEl={anchorEl}
			modifiers={[
				{
					name: "flip",
					enabled: true,
					options: {
						altBoundary: true,
						rootBoundary: "document",
						padding: 8,
					},
				},
				{
					name: "preventOverflow",
					enabled: true,
					options: {
						altAxis: true,
						altBoundary: true,
						tether: true,
						rootBoundary: "document",
						padding: 8,
					},
				},
				{
					name: "arrow",
					enabled: false,
					options: {
						// Se hai bisogno di una freccia, puoi specificare un elemento qui.
						// element: arrowRef,
					},
				},
			]}
		>
			{/* Contenuto del Popper */}
			<Typography sx={{ p: 1 }}>{content}</Typography>
		</Popper>
	);
};

export default CustomPopper;
