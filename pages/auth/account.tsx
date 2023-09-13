import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//REDUX-STORE
import { connect } from "react-redux";
import { setLoading } from "../../src/store/actions";
//*-----*//
import Layout from "../../src/components/layout/Layout";
import { useRouter } from "next/router";

type AccountSettingsProps = {
  _setLoading: (isLoading: boolean) => {
    type: string;
    payload: boolean;
  };
};

const AccountSettings = ({ _setLoading }: AccountSettingsProps) => {
  const theme = useTheme();
  const router = useRouter();

  const [openCookies, setOpenCookies] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Layout
        openSettings={openCookies}
        setOpenSettings={setOpenCookies}
        //digitare il titolo della pagina e la descrizione della pagina.
        // title={`Avvisi | E-Commerce ${eCommerceConf.NomeEcommerce}`}
        // description="This is a E-Commerce Avvisi page, using React.js Next.js and Material-UI. Powered by Byteware srl."
      >
        <Grid container>
          <Grid item xs={12}>
            <Button
              onClick={() => {
                router.push({ pathname: "/account/resetPassword", query: { origin: "/auth/account" } });
              }}
              variant="text"
            >
              Cambia Password
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => {
                setOpenCookies(true);
              }}
            >
              Configura Cookie
            </Button>
          </Grid>
        </Grid>
      </Layout>
    </ThemeProvider>
  );
};

//REDUX-STORE
const mapDispatchToProps = {
  setLoading,
};
export default connect(null, mapDispatchToProps)(AccountSettings);
