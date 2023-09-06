import { Grid, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PasswordSafety } from "../CommonTypesInterfaces";

type SecurePasswordProps = {
  password: string;
  passwordSafety: PasswordSafety;
  setPasswordSafety: Dispatch<SetStateAction<PasswordSafety>>;
};

const SecurePassword = ({ password, passwordSafety, setPasswordSafety }: SecurePasswordProps) => {
  const evaluatePassword = (password: string) => {
    let length = evaluateLength(password);
    let lettereNumeri = evaluateLettereNumeri(password);
    let maiuscoloMinuscolo = evaluateMaiuscoloMinuscolo(password);
    let caratteriSpeciali = evaluateCaratteriSpeciali(password);

    if (length && lettereNumeri && maiuscoloMinuscolo && caratteriSpeciali) {
      setPasswordSafety({ correct: true, detail: "" });
    } else {
      setPasswordSafety({ correct: false, detail: "" });
    }
  };

  const evaluateLength = (password: string) => {
    if (password.length === 0) {
      setLength({ correct: false, detail: "" });
      return false;
    }

    if (password.length > 20) {
      setLength({ correct: false, detail: "| Password Troppo Lunga" });
      return false;
    } else if (password.length < 8) {
      setLength({ correct: false, detail: "| Password Troppo Corta" });
      return false;
    } else {
      setLength({ correct: true, detail: "" });
      return true;
    }
  };

  const evaluateLettereNumeri = (password: string) => {
    const lettere = /[a-zA-Z]/;
    const numeri = /\d/;

    if (lettere.test(password) && numeri.test(password)) {
      setLettereNumeri({ correct: true, detail: "" });
      return true;
    } else if (lettere.test(password) && !numeri.test(password)) {
      setLettereNumeri({ correct: false, detail: "| No Numeri" });
      return false;
    } else {
      setLettereNumeri({ correct: false, detail: "| No Lettere" });
      return false;
    }
  };

  const evaluateMaiuscoloMinuscolo = (password: string) => {
    const maiuscolo = /[A-Z]/;
    const minuscolo = /[a-z]/;

    if (maiuscolo.test(password) && minuscolo.test(password)) {
      setMaiuscoloMinuscolo({ correct: true, detail: "" });
      return true;
    } else if (maiuscolo.test(password) && !minuscolo.test(password)) {
      setMaiuscoloMinuscolo({ correct: false, detail: "| No Minuscoli" });
      return false;
    } else {
      setMaiuscoloMinuscolo({ correct: false, detail: "| No Maiuscoli" });
      return false;
    }
  };

  const evaluateCaratteriSpeciali = (password: string) => {
    const speciali = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (speciali.test(password)) {
      setCaratteriSpeciali({ correct: true, detail: "" });
      return true;
    } else {
      setCaratteriSpeciali({ correct: false, detail: "" });
      return false;
    }
  };

  const [length, setLength] = useState<PasswordSafety>({
    correct: false,
    detail: "",
  });

  const [lettereNumeri, setLettereNumeri] = useState<PasswordSafety>({
    correct: false,
    detail: "",
  });

  const [maiuscoloMinuscolo, setMaiuscoloMinuscolo] = useState<PasswordSafety>({
    correct: false,
    detail: "",
  });

  const [caratteriSpeciali, setCaratteriSpeciali] = useState<PasswordSafety>({
    correct: false,
    detail: "",
  });

  useEffect(() => {
    evaluatePassword(password);
  }, [password]);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={0.5}>
          <Grid item>{length.correct ? <DoneRoundedIcon color="success" /> : <CloseRoundedIcon color="error" />}</Grid>
          <Grid item>
            <Typography>Tra 8-20 Caratteri</Typography>
          </Grid>
          <Grid item>
            <Typography>{password.length === 0 ? "" : `${length.detail}`}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={0.5}>
          <Grid item>{lettereNumeri.correct ? <DoneRoundedIcon color="success" /> : <CloseRoundedIcon color="error" />}</Grid>
          <Grid item>
            <Typography>Sia Lettere che Numeri</Typography>
          </Grid>
          <Grid item>
            <Typography>{password.length === 0 ? "" : `${lettereNumeri.detail}`}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={0.5}>
          <Grid item>{maiuscoloMinuscolo.correct ? <DoneRoundedIcon color="success" /> : <CloseRoundedIcon color="error" />}</Grid>
          <Grid item>
            <Typography>Sia Maiuscolo che Minuscolo</Typography>
          </Grid>
          <Grid item>
            <Typography>{password.length === 0 ? "" : `${maiuscoloMinuscolo.detail}`}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={0.5}>
          <Grid item>{caratteriSpeciali.correct ? <DoneRoundedIcon color="success" /> : <CloseRoundedIcon color="error" />}</Grid>
          <Grid item>
            <Typography>Almeno 1 Carattere Speciale</Typography>
          </Grid>
          <Grid item>
            <Typography>{password.length === 0 ? "" : `${caratteriSpeciali.detail}`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* <Typography>{password}</Typography> */}
    </div>
  );
};

export default SecurePassword;
