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
import {
	FormHelperText,
	FormControl,
	FormLabel,
	Radio,
	RadioGroup,
	useMediaQuery,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import CodiceFiscale from "codice-fiscale-js";
import dayjs from "dayjs";
import VirtualizedAutocomplete from "./VirtualizedAutocomplete";
import { useEffect, MutableRefObject } from "react";

import { useTheme } from "@mui/material/styles";

import {
	Focus,
	Sex,
	AutocompleteSelected,
	Date,
	ComunePaese,
} from "src/components/CommonTypesInterfaces";
import PrivacyLabel from "src/components/utils/PrivacyLabel";
import { Province } from "./ProvinciePaesi";

type Step1Props = {
	focus: MutableRefObject<Focus>;
	parent: boolean;
	comuni: ComunePaese[];
	selectedComune: AutocompleteSelected;
	setSelectedComune: React.Dispatch<React.SetStateAction<AutocompleteSelected>>;
	comuneResidenza: AutocompleteSelected;
	setComuneResidenza: React.Dispatch<
		React.SetStateAction<AutocompleteSelected>
	>;
	stringUpperCase: (string: string) => string;
	codiceFiscale: string;
	codiceFiscaleInvalid: boolean;
	setCodiceFiscale: React.Dispatch<React.SetStateAction<string>>;
	setCodiceFiscaleInvalid: React.Dispatch<React.SetStateAction<boolean>>;
	firstName: string;
	setFirstName: React.Dispatch<React.SetStateAction<string>>;
	lastName: string;
	setLastName: React.Dispatch<React.SetStateAction<string>>;
	gender: Sex;
	setGender: React.Dispatch<React.SetStateAction<Sex>>;
	dateOfBirth: Date;
	setDateOfBirth: React.Dispatch<React.SetStateAction<Date>>;
	placeOfBirth: string;
	setPlaceOfBirth: React.Dispatch<React.SetStateAction<string>>;
	address: string;
	setAddress: React.Dispatch<React.SetStateAction<string>>;
	city: string;
	setCity: React.Dispatch<React.SetStateAction<string>>;
	cap: string;
	setCap: React.Dispatch<React.SetStateAction<string>>;
	province: string;
	setProvince: React.Dispatch<React.SetStateAction<string>>;
	email?: string;
	setEmail?: React.Dispatch<React.SetStateAction<string>>;
	phoneNumber: string;
	setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
	privacy?: boolean;
	setPrivacy?: React.Dispatch<React.SetStateAction<boolean>>;
	notes?: string;
	setNotes?: React.Dispatch<React.SetStateAction<string | undefined>>;
	toCheck: any[];
};

const Step1 = ({
	focus,
	parent,
	comuni,
	selectedComune,
	setSelectedComune,
	comuneResidenza,
	setComuneResidenza,
	stringUpperCase,
	codiceFiscale,
	codiceFiscaleInvalid,
	setCodiceFiscale,
	setCodiceFiscaleInvalid,
	firstName,
	setFirstName,
	lastName,
	setLastName,
	gender,
	setGender,
	dateOfBirth,
	setDateOfBirth,
	placeOfBirth,
	setPlaceOfBirth,
	address,
	setAddress,
	city,
	setCity,
	cap,
	setCap,
	province,
	setProvince,
	email,
	setEmail,
	phoneNumber,
	setPhoneNumber,
	privacy,
	setPrivacy,
	notes,
	setNotes,
}: Step1Props) => {
	const theme = useTheme();

	const handleSubmit = () => {};

	const updateCodiceFiscale = (codiceFiscale: string) => {
		setCodiceFiscale(codiceFiscale.trim().toUpperCase());
		if (CodiceFiscale.check(codiceFiscale)) {
			const cf = new CodiceFiscale(codiceFiscale);
			const newPlaceOfBirth = stringUpperCase(
				cf.birthplace.nome.trim().toLocaleLowerCase()
			);
			const comune = comuni.find(
				(comune) =>
					comune.nome.toLocaleLowerCase() ===
					newPlaceOfBirth.toLocaleLowerCase()
			);
			setGender(cf.gender === "M" ? "male" : "female");
			setPlaceOfBirth(newPlaceOfBirth);
			comune ? setSelectedComune(comune) : {};
			setDateOfBirth(dayjs(cf.birthday));
		}
	};

	const isCodiceFiscaleInvalid = (codiceFiscale: string) => {
		if (CodiceFiscale.check(codiceFiscale)) {
			setCodiceFiscaleInvalid(false);
		} else {
			setCodiceFiscaleInvalid(true);
		}
	};

	useEffect(() => {
		isCodiceFiscaleInvalid(codiceFiscale);
	}, [codiceFiscale]);

	useEffect(() => {
		if (!firstName || !lastName || !gender || !dateOfBirth || !selectedComune) {
			return;
		}

		const selectedProvinceName = selectedComune.provincia.nome;
		const selectedProvince =
			Province[selectedProvinceName as keyof typeof Province];

		const cf = new CodiceFiscale({
			name: firstName,
			surname: lastName,
			gender: gender === "male" ? "M" : "F",
			day: dateOfBirth.get("date"),
			month: dateOfBirth.get("month") + 1,
			year: dateOfBirth.get("year"),
			birthplace: selectedComune.nome,
			birthplaceProvincia: selectedProvince ? selectedProvince : "",
		});

		setCodiceFiscale(cf.cf);
	}, [firstName, lastName, gender, dateOfBirth, selectedComune]);

	const mdUp = useMediaQuery(theme.breakpoints.up("md"), {
		noSsr: false,
	});

	return (
		<Container
			component="main"
			//maxWidth="md"
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
					component="h1"
					variant="h5"
					sx={{ marginRight: "auto" }}
				>
					{parent
						? "Inserisci i Dati di un Genitore"
						: "Inserisci Dati Personali"}
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
									autoFocus={true}
									autoComplete="codiceFiscale"
									error={codiceFiscaleInvalid && codiceFiscale !== ""}
									value={codiceFiscale}
									inputProps={{ minLength: 16, maxLength: 16 }}
									onChange={(e) => updateCodiceFiscale(e.target.value)}
									required
									fullWidth
									id="codiceFiscale"
									label="Codice Fiscale"
									name="codiceFiscale"
									ref={focus}
								/>
								<FormHelperText>
									Il <strong>Codice Fiscale</strong> verrà completato
									automaticamente con gli altri dati
								</FormHelperText>
							</Grid>
							{/* TODO: "Advanced" trimming to allow inner spaces */}
							<Grid
								item
								xs={12}
								sm={6}
							>
								<TextField
									value={firstName}
									onBlur={(e) => setFirstName(e.target.value.trim())}
									onChange={(e) => {
										setFirstName(stringUpperCase(e.target.value));
									}}
									inputProps={{ maxLength: 35 }}
									autoComplete="firstName"
									name="firstName"
									required
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
									onBlur={(e) => setLastName(e.target.value.trim())}
									value={lastName}
									onChange={(e) => setLastName(stringUpperCase(e.target.value))}
									inputProps={{ maxLength: 40 }}
									required
									fullWidth
									id="lastName"
									label="Cognome"
									name="lastName"
									autoComplete="family-name"
								/>
							</Grid>

							<Grid
								item
								xs={12}
								sx={{ height: "72px" }}
							>
								<FormControl required>
									<FormLabel id="sesso">Sesso</FormLabel>
									<RadioGroup
										value={gender}
										onChange={(e) =>
											setGender(e.target.value === "male" ? "male" : "female")
										}
										aria-labelledby="gender"
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
										disableFuture
										value={dateOfBirth}
										maxDate={parent ? dayjs().subtract(18, "year") : null}
										onChange={(e) => {
											setDateOfBirth(e);
										}}
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
								<VirtualizedAutocomplete
									label={"Luogo di Nascita"}
									comuni={comuni}
									placeOfBirth={placeOfBirth}
									setPlaceOfBirth={
										setPlaceOfBirth as React.Dispatch<
											React.SetStateAction<string | undefined>
										>
									}
									selectedComune={selectedComune}
									setSelectedComune={setSelectedComune}
									setCap={null}
								/>
								<FormHelperText>
									Se non sei nato in Italia inserisci il {mdUp ? <br /> : ""}{" "}
									<strong>Paese di Nascita</strong>
								</FormHelperText>
							</Grid>
						</Grid>
						<Grid
							container
							item
							spacing={2}
							sm={12}
							md={6}
						>
							{/* TODO: Hide FormHelperText on width <= sm  */}

							<Grid
								item
								xs={12}
							>
								<TextField
									onBlur={(e) => setAddress(e.target.value.trim())}
									value={address}
									onChange={(e) => setAddress(stringUpperCase(e.target.value))}
									inputProps={{ maxLength: 60 }}
									required
									fullWidth
									id="address"
									label="Indirizzo"
									name="address"
									autoComplete="address"
								/>
								<FormHelperText>{mdUp ? " " : ""}</FormHelperText>
							</Grid>
							<Grid
								item
								xs={12}
								sm={8}
							>
								<VirtualizedAutocomplete
									label={"Residenza"}
									comuni={comuni}
									placeOfBirth={city}
									setPlaceOfBirth={
										setCity as React.Dispatch<
											React.SetStateAction<string | undefined>
										>
									}
									selectedComune={comuneResidenza}
									setSelectedComune={setComuneResidenza}
									setProvinceOfBirth={
										setProvince as React.Dispatch<
											React.SetStateAction<string | undefined>
										>
									}
									setCap={
										setCap as React.Dispatch<
											React.SetStateAction<string | undefined>
										>
									}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={4}
							>
								<TextField
									value={cap}
									onChange={(e) =>
										setCap(e.target.value.trim().replace(/\D/g, ""))
									}
									inputProps={{ maxLength: 5 }}
									error={cap.length !== 5 && cap.length > 0}
									required
									fullWidth
									id="cap"
									label="CAP"
									name="cap"
									autoComplete="cap"
								/>
							</Grid>
							<Grid
								item
								xs={12}
							>
								<TextField
									onBlur={(e) => setProvince(e.target.value.trim())}
									value={province}
									onChange={(e) => setProvince(stringUpperCase(e.target.value))}
									inputProps={{ maxLength: 35 }}
									required
									fullWidth
									id="province"
									label="Provincia"
									name="province"
									autoComplete="province"
								/>
							</Grid>
							{parent ? (
								<></>
							) : (
								<Grid
									item
									xs={12}
								>
									<TextField
										value={email}
										onChange={(e) =>
											setEmail
												? setEmail(e.target.value.trim().toLowerCase())
												: {}
										}
										inputProps={{ maxLength: 319 }}
										required
										fullWidth
										id="email"
										label="Indirizzo Email"
										name="email"
										autoComplete="email"
									/>
								</Grid>
							)}
							<Grid
								item
								xs={12}
							>
								<MuiTelInput
									label="Telefono"
									sx={{ width: "100%" }}
									defaultCountry="IT"
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e)}
									inputProps={{ maxLength: 16 }}
									required
								/>
							</Grid>
							{parent ? (
								<></>
							) : (
								<Grid
									item
									xs={12}
								>
									<TextField
										value={notes}
										onChange={(e) =>
											setNotes
												? setNotes(
														e.target.value === "" ? undefined : e.target.value
												  )
												: {}
										}
										onBlur={(e) =>
											setNotes
												? setNotes(
														e.target.value.trim() === ""
															? undefined
															: e.target.value.trim()
												  )
												: {}
										}
										name="notes"
										id="notes"
										label="Note"
										fullWidth
										multiline
									/>
								</Grid>
							)}
						</Grid>
						{parent ? (
							<></>
						) : (
							<Grid
								item
								xs={12}
							>
								<Box>
									<FormControlLabel
										required
										control={
											<Checkbox
												color="primary"
												checked={privacy}
												onChange={() =>
													setPrivacy ? setPrivacy(!privacy) : {}
												}
											/>
										}
										label={<PrivacyLabel />}
									/>
								</Box>
							</Grid>
						)}
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default Step1;
