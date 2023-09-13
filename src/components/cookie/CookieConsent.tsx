// components/CookieConsent.js

import React, { useEffect, useState } from "react";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import ManageCookies from "./ManageCookies";

const CookieConsent = () => {
  const [open, setOpen] = React.useState(false);
  const [manage, setManage] = useState(false);

  const [checkedTheme, setCheckedTheme] = React.useState(true);

  const info_Txt = manage ? (
    <ManageCookies checkedTheme={checkedTheme} setCheckedTheme={setCheckedTheme} />
  ) : (
    <React.Fragment>
      <Typography component="p" fontSize={"1rem"} gutterBottom>
        Utilizziamo i cookie per aiutarti a navigare in modo efficiente ed eseguire determinate funzioni.
      </Typography>
      <Typography component="p" fontSize={"1rem"} paragraph={true}>
        I cookie classificati come "Necessari" vengono memorizzati nel browser in quanto sono essenziali per abilitare le funzionalità di base del sito.
      </Typography>
    </React.Fragment>
  );

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (!localStorage.getItem("cookieSettings")) {
        setOpen(true);
      }
    }
  }, []);

  const updateData = (checkedTheme: boolean) => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("cookieSettings", checkedTheme as unknown as string);
    }
  };

  const handleApprove = () => {
    // Implement your cookie approval logic here
    manage ? updateData(checkedTheme) : updateData(true);
    setOpen(false);
  };

  const handleManage = () => {
    // Implement your cookie approval logic here
    setManage(!manage);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={() => setOpen(false)}
      message={info_Txt}
      action={
        <Box sx={{ display: "flex" }}>
          <Button sx={{ backgroundColor: "primary", m: 1 }} variant="outlined" size="small" onClick={handleManage}>
            {manage ? "Indietro" : "Gestisci preferenze"}
          </Button>

          <Button sx={{ backgroundColor: "primary", m: 1 }} variant="contained" size="small" onClick={handleApprove}>
            {manage ? "Accetta Selezionati" : "Accetta Tutto"}
          </Button>
        </Box>
      }
    />
  );
};

export default CookieConsent;
