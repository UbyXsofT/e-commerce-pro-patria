import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/it";
import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import PrivacyLabel from "src/components/utils/PrivacyLabel";
import { Focus, Sex, Date } from "src/components/CommonTypesInterfaces";

type Step3Props = {
	focus: React.MutableRefObject<Focus>;
	codiceFiscale: string;
	firstName: string;
	lastName: string;
	gender: Sex;
	dateOfBirth: Date;
	placeOfBirth: string;
	address: string;
	city: string;
	cap: string;
	province: string;
	email: string;
	phoneNumber: string;
	privacy: boolean;
	username: string;
	underage: boolean;
	parentCodiceFiscale: string;
	parentFirstName: string;
	parentLastName: string;
	parentGender: Sex;
	parentDateOfBirth: Date;
	parentPlaceOfBirth: string;
	parentAddress: string;
	parentCity: string;
	parentCap: string;
	parentProvince: string;
	parentPhoneNumber: string;
	notes?: string;
	toCheck: any[];
};

const Step3 = ({
	focus,
	codiceFiscale,
	firstName,
	lastName,
	gender,
	dateOfBirth,
	placeOfBirth,
	address,
	city,
	cap,
	province,
	email,
	phoneNumber,
	privacy,
	username,
	underage,
	parentCodiceFiscale,
	parentFirstName,
	parentLastName,
	parentGender,
	parentDateOfBirth,
	parentPlaceOfBirth,
	parentAddress,
	parentCity,
	parentCap,
	parentProvince,
	parentPhoneNumber,
	notes,
}: Step3Props) => {
	const handleSubmit = () => {};

	return (
		<Container
			component="main"
			maxWidth="md"
		>
			<Box
				sx={{
					marginTop: 3,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography
					autoFocus
					component="h1"
					variant="h5"
					sx={{ marginRight: "auto" }}
				>
					Controlla i tuoi dati
				</Typography>
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit}
					sx={{ mt: 3 }}
				>
					<Grid
						container
						spacing={2}
						alignItems={"flex-start"}
					>
						<Grid
							container
							item
							spacing={2}
							sm={12}
							md={6}
						>
							<Grid
								item
								xs={12}
							>
								<TextField
									InputProps={{
										readOnly: true,
									}}
									value={codiceFiscale}
									fullWidth
									id="codiceFiscale"
									label="Codice Fiscale"
									name="codiceFiscale"
									ref={focus}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<TextField
									value={firstName}
									InputProps={{
										readOnly: true,
									}}
									name="firstName"
									fullWidth
									id="firstName"
									label="Nome"
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<TextField
									value={lastName}
									InputProps={{
										readOnly: true,
									}}
									fullWidth
									id="lastName"
									label="Cognome"
									name="lastName"
								/>
							</Grid>

							<Grid
								item
								xs={12}
								sx={{ height: "72px" }}
							>
								<FormControl>
									<FormLabel id="sesso">Sesso</FormLabel>
									<RadioGroup
										value={gender}
										aria-labelledby="sesso"
										name="gender"
										row
									>
										<FormControlLabel
											value="female"
											control={<Radio />}
											label="Femmina"
										/>
										<FormControlLabel
											value="male"
											control={<Radio />}
											label="Maschio"
										/>
										<FormControlLabel
											value="other"
											control={<Radio />}
											label="Altro"
										/>
									</RadioGroup>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={12}
							>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
									adapterLocale="it"
								>
									<DatePicker
										readOnly
										disableOpenPicker
										value={dateOfBirth}
										label="Data di Nascita"
										sx={{
											width: "100%",
										}}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid
								item
								xs={12}
								sm={12}
							>
								<TextField
									value={placeOfBirth}
									InputProps={{
										readOnly: true,
									}}
									fullWidth
									id="placeOfBirth"
									label="Luogo di Nascita"
									name="placeOfBirth"
								/>
							</Grid>
						</Grid>

						<Grid
							container
							item
							spacing={2}
							sm={12}
							md={6}
						>
							<Grid
								item
								xs={12}
							>
								<TextField
									value={address}
									InputProps={{
										readOnly: true,
									}}
									fullWidth
									id="address"
									label="Indirizzo"
									name="address"
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={8}
							>
								<TextField
									value={city}
									InputProps={{
										readOnly: true,
									}}
									fullWidth
									id="city"
									label="Città"
									name="city"
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={4}
							>
								<TextField
									value={cap}
									InputProps={{
										readOnly: true,
									}}
									fullWidth
									id="cap"
									label="CAP"
									name="cap"
								/>
							</Grid>
							<Grid
								item
								xs={12}
							>
								<TextField
									value={province}
									InputProps={{
										readOnly: true,
									}}
									fullWidth
									id="province"
									label="Provincia di Residenza"
									name="province"
								/>
							</Grid>
							<Grid
								item
								xs={12}
							>
								<MuiTelInput
									label="Telefono"
									value={phoneNumber}
									InputProps={{
										readOnly: true,
									}}
									disableDropdown
									sx={{ width: "100%" }}
									defaultCountry="IT"
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={6}
							>
								<TextField
									value={email}
									InputProps={{
										readOnly: true,
									}}
									fullWidth
									id="email"
									label="Indirizzo Email"
									name="email"
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={6}
							>
								<TextField
									value={username}
									InputProps={{
										readOnly: true,
									}}
									name="username"
									fullWidth
									id="username"
									label="Nome Utente"
								/>
							</Grid>
							{notes ? (
								<Grid
									item
									xs={12}
								>
									<TextField
										value={notes}
										name="notes"
										id="notes"
										label="Note"
										fullWidth
										multiline
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							) : (
								<></>
							)}
						</Grid>

						<Grid
							item
							xs={12}
						>
							<FormControlLabel
								checked={privacy}
								control={<Checkbox color="primary" />}
								label={<PrivacyLabel />}
							/>
						</Grid>
					</Grid>
				</Box>
				{underage ? (
					<div>
						<Typography
							component="h1"
							variant="h5"
							sx={{ marginRight: "auto", marginTop: 1 }}
						>
							Controlla i Dati del Genitore
						</Typography>
						<Box
							component="form"
							noValidate
							onSubmit={handleSubmit}
							sx={{ mt: 3 }}
						>
							<Grid
								container
								spacing={2}
								alignItems={"flex-start"}
							>
								<Grid
									container
									item
									spacing={2}
									sm={12}
									md={6}
								>
									<Grid
										item
										xs={12}
									>
										<TextField
											value={parentCodiceFiscale}
											InputProps={{
												readOnly: true,
											}}
											required
											fullWidth
											id="parentCodiceFiscale"
											label="Codice Fiscale"
											name="parentCodiceFiscale"
											autoComplete="parentCodiceFiscale"
										/>
									</Grid>
									<Grid
										item
										xs={12}
										sm={6}
									>
										<TextField
											value={parentFirstName}
											InputProps={{
												readOnly: true,
											}}
											autoComplete="parentFirstName"
											name="parentFirstName"
											required
											fullWidth
											id="parentFirstName"
											label="Nome"
										/>
									</Grid>
									<Grid
										item
										xs={12}
										sm={6}
									>
										<TextField
											value={parentLastName}
											InputProps={{
												readOnly: true,
											}}
											required
											fullWidth
											id="parentLastName"
											label="Cognome"
											name="parentLastName"
											autoComplete="family-name"
										/>
									</Grid>

									<Grid
										item
										xs={12}
										sx={{ height: "72px" }}
									>
										<FormControl>
											<FormLabel id="sesso">Sesso</FormLabel>
											<RadioGroup
												value={parentGender}
												aria-labelledby="parentGender"
												name="parentGender"
												row
											>
												<FormControlLabel
													value="female"
													control={<Radio />}
													label="Femmina"
												/>
												<FormControlLabel
													value="male"
													control={<Radio />}
													label="Maschio"
												/>
												<FormControlLabel
													value="other"
													control={<Radio />}
													label="Altro"
												/>
											</RadioGroup>
										</FormControl>
									</Grid>
									<Grid
										item
										xs={12}
									>
										<LocalizationProvider
											dateAdapter={AdapterDayjs}
											adapterLocale="it"
										>
											<DatePicker
												readOnly
												disableOpenPicker
												value={parentDateOfBirth}
												label="Data di Nascita"
												sx={{
													width: "100%",
												}}
											/>
										</LocalizationProvider>
									</Grid>
									<Grid
										item
										xs={12}
										sm={12}
									>
										<TextField
											InputProps={{
												readOnly: true,
											}}
											value={parentPlaceOfBirth}
											required
											fullWidth
											id="parentPlaceOfBirth"
											label="Luogo di Nascita"
											name="parentPlaceOfBirth"
											autoComplete="parentPlaceOfBirth"
										/>
									</Grid>
								</Grid>

								<Grid
									container
									item
									spacing={2}
									sm={12}
									md={6}
								>
									<Grid
										item
										xs={12}
									>
										<TextField
											InputProps={{
												readOnly: true,
											}}
											value={parentAddress}
											required
											fullWidth
											id="parentAddress"
											label="Indirizzo"
											name="parentAddress"
											autoComplete="parentAddress"
										/>
									</Grid>
									<Grid
										item
										xs={12}
										sm={8}
									>
										<TextField
											InputProps={{
												readOnly: true,
											}}
											value={parentCity}
											required
											fullWidth
											id="parentCity"
											label="Città"
											name="parentCity"
											autoComplete="parentCity"
										/>
									</Grid>
									<Grid
										item
										xs={12}
										sm={4}
									>
										<TextField
											InputProps={{
												readOnly: true,
											}}
											value={parentCap}
											required
											fullWidth
											id="parentCap"
											label="CAP"
											name="parentCap"
											autoComplete="parentCap"
										/>
									</Grid>
									<Grid
										item
										xs={12}
									>
										<TextField
											InputProps={{
												readOnly: true,
											}}
											value={parentProvince}
											required
											fullWidth
											id="parentProvince"
											label="Provincia"
											name="parentProvince"
											autoComplete="parentProvince"
										/>
									</Grid>

									<Grid
										item
										xs={12}
									>
										<MuiTelInput
											label="Telefono"
											InputProps={{
												readOnly: true,
											}}
											disableDropdown
											sx={{ width: "100%" }}
											defaultCountry="IT"
											value={parentPhoneNumber}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Box>
					</div>
				) : (
					<div></div>
				)}
			</Box>
		</Container>
	);
};

export default Step3;
