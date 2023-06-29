import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingOverlay() {
	return (
		<div>
			<Backdrop
				sx={{color: "#FF0000", zIndex: (theme) => theme.zIndex.drawer + 1}}
				open={true}
			>
				<CircularProgress color='inherit' />
			</Backdrop>
		</div>
	);
}
