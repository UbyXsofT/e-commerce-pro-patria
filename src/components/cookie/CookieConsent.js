// components/CookieConsent.js

import React from "react";
import {Box, Button, Snackbar, Typography} from "@mui/material";

const CookieConsent = () => {
	const [open, setOpen] = React.useState(true);

	const info_Txt = (
		<React.Fragment>
			<Typography
				component='p'
				fontSize={"1rem"}
				gutterBottom
			>
				Utilizziamo i cookie per aiutarti a navigare in modo efficiente ed eseguire determinate funzioni.
			</Typography>
			<Typography
				component='p'
				fontSize={"1rem"}
				paragraph={true}
			>
				I cookie classificati come "Necessari" vengono memorizzati nel browser in quanto sono essenziali per abilitare le funzionalità di base del sito.
			</Typography>
		</React.Fragment>
	);

	const handleApprova = () => {
		// Implement your cookie approval logic here
		setOpen(false);
	};

	const handleGestisci = () => {
		// Implement your cookie approval logic here
		setOpen(false);
	};
	const handleNega = () => {
		// Implement your cookie approval logic here
		setOpen(false);
	};

	return (
		<Snackbar
			anchorOrigin={{vertical: "bottom", horizontal: "center"}}
			open={open}
			onClose={() => setOpen(false)}
			message={info_Txt}
			action={
				<Box sx={{display: "flex"}}>
					<Button
						sx={{backgroundColor: "primary", m: 1}}
						variant='outlined'
						size='small'
						onClick={handleNega}
					>
						Rifiuta tutto
					</Button>
					<Button
						sx={{backgroundColor: "primary", m: 1}}
						variant='outlined'
						size='small'
						onClick={handleGestisci}
					>
						Gestisci preferenze
					</Button>

					<Button
						sx={{backgroundColor: "primary", m: 1}}
						variant='contained'
						size='small'
						onClick={handleApprova}
					>
						Accetta tutto
					</Button>
				</Box>
			}
		/>
	);
};

export default CookieConsent;
