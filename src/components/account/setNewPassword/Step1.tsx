import {
	Button,
	CssBaseline,
	Grid,
	Link,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import Router from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import PasswordInput from "src/components/utils/PasswordInput";
import SecurePassword from "../SecurePassword";
import { PasswordSafety } from "src/components/CommonTypesInterfaces";

type Step1Props = {
	origin: string | string[] | undefined;
	smUp: boolean;
	setDone: Dispatch<SetStateAction<boolean>>;
	newPassword: string;
	setNewPassword: Dispatch<SetStateAction<string>>;
	confirmNewPassword: string;
	setConfirmNewPassword: Dispatch<SetStateAction<string>>;
};

const Step1 = ({
	origin,
	smUp,
	setDone,
	newPassword,
	setNewPassword,
	confirmNewPassword,
	setConfirmNewPassword,
}: Step1Props) => {
	const [passwordSafety, setPasswordSafety] = useState<PasswordSafety>({
		correct: false,
		detail: "",
	});

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
					Imposta una Nuova Password
				</Typography>
				<Grid
					item
					xs={12}
				>
					<Typography variant="subtitle1">
						Crea una Nuova Password per il tuo Account
					</Typography>
				</Grid>

				<Grid
					item
					xs={12}
				>
					<PasswordInput
						value={newPassword}
						setValue={setNewPassword}
						error={!passwordSafety.correct && newPassword.length > 0}
						margin="normal"
						fullWidth
						id="newPassword"
						label="Nuova Password"
						name="newPassword"
					/>
				</Grid>
				<Grid
					item
					xs={12}
				>
					<PasswordInput
						value={confirmNewPassword}
						setValue={setConfirmNewPassword}
						error={newPassword !== confirmNewPassword && newPassword.length > 0}
						fullWidth
						id="confirmNewPassword"
						label="Conferma Nuova Password"
						name="confirmNewPassword"
					/>
				</Grid>

				<Grid
					item
					xs={12}
				>
					<SecurePassword
						password={newPassword}
						passwordSafety={passwordSafety}
						setPasswordSafety={setPasswordSafety}
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
								!passwordSafety.correct || newPassword !== confirmNewPassword
							}
						>
							Conferma
						</Button>
					</div>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Step1;
