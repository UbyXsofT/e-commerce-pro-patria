import React from "react";
import {
	Container,
	Grid,
	Typography,
	TextField,
	Button,
	Paper,
	Link,
	CssBaseline,
} from "@mui/material";

import Router from "next/router";
import CodiceFiscale from "codice-fiscale-js";

type Step1Props = {
	origin: string | string[] | undefined;
	smUp: boolean;
	setDone: Function;
	email: string;
	setEmail: Function;
	codiceFiscale: string;
	setCodiceFiscale: Function;
};

const Step1 = ({
	origin,
	smUp,
	setDone,
	email,
	setEmail,
	codiceFiscale,
	setCodiceFiscale,
}: Step1Props) => {
	return (
		<Container
			maxWidth={"md"}
			component={Paper}
			sx={{ padding: 3, marginTop: smUp ? 3 : 0 }}
		>
			<CssBaseline />

			<Grid
				container
				spacing={2}
			>
				<Typography
					variant="h4"
					sx={{ margin: "auto", padding: 3 }}
				>
					Password Dimenticata
				</Typography>
				<Grid
					item
					xs={12}
				>
					<Typography variant="subtitle1">
						Ti verrà inviata una mail per il recupero
					</Typography>
				</Grid>

				<Grid
					item
					xs={12}
				>
					<TextField
						value={email}
						onChange={(event) => setEmail(event.target.value.trim())}
						required
						fullWidth
						id="email"
						label="Indirizzo Email"
						name="email"
						autoComplete="email"
					/>
				</Grid>
				<Grid
					item
					xs={12}
				>
					<TextField
						value={codiceFiscale}
						onChange={(event) =>
							setCodiceFiscale(event.target.value.toUpperCase())
						}
						inputProps={{ minLength: 16, maxLength: 16 }}
						required
						fullWidth
						id="codiceFiscale"
						label="Codice Fiscale"
						name="codiceFiscale"
						autoComplete="codiceFiscale"
						error={
							!CodiceFiscale.check(codiceFiscale) && codiceFiscale.length !== 0
						}
					/>
				</Grid>

				<Grid
					item
					xs={12}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginTop: 3,
						}}
					>
						<Link
							onClick={() => {
								if (!origin) {
									Router.push("/account/login");
									return;
								}
								Router.push(typeof origin === "string" ? origin : origin[0]);
							}}
							variant="body2"
							sx={{
								userSelect: "none",
								cursor: "pointer",
								color: (theme) =>
									theme.palette.mode === "light" ? "black" : "white",

								marginRight: "auto",
								marginTop: "auto",
								marginBottom: "auto",
							}}
						>
							Annulla
						</Link>
						<Button
							variant="contained"
							sx={{ mt: "auto" }}
							onClick={() => setDone(true)}
							disabled={
								!email || !codiceFiscale || !CodiceFiscale.check(codiceFiscale)
							}
						>
							Invia
						</Button>
					</div>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Step1;
