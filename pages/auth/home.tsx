import React from "react";
import { Container, Grid, Typography, TextField, Button, Checkbox, FormControlLabel, FormControl, FormHelperText, Link, Fade, AppBar, Toolbar, Collapse } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//REDUX-STORE
import { connect } from "react-redux";
import { setLoading } from "../../src/store/actions";
//*-----*//
import Layout from "../../src/components/layout/Layout";
import eCommerceConf from "../../eCommerceConf.json";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import CookieManager from "../../src/components/cookie/CookieManager";
//*-- API---*//
//import home from "../api/home";
import { useAlertMe } from "../../src/components/layout/alert/AlertMeContext";

type HomeProps = {
  setLoading: (isLoading: boolean) => {
    type: string;
    payload: boolean;
  };
};

const Home = ({ setLoading }: HomeProps) => {
  const { showAlert } = useAlertMe();
  const textAlert = (
    <React.Fragment>
      Orari segreteria: Dal lunedì al venerdì dalle 8.30-13.00 ; 14.00-20.30 <br />
      Orari estivi segreteria (Giugno- Luglio) 9.30-12.30 ; 14.30-16.30 <br />
      <h3>
        <strong>Agosto chiuso</strong>
        <br />
        <br />
        <Link color="inherit" href={eCommerceConf.LinkHomeCenter}>
          Per maggiori informazioni clicca qui!
        </Link>
      </h3>
      <div style={{ width: "60px", height: "60px", position: "relative", zIndex: 1 }}>
        <Image src="/images/LogoQ.png" alt="Logo" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "contain" }} priority={true} />
      </div>
    </React.Fragment>
  );

  React.useEffect(() => {
    showAlert("filled", "warning", "Orari segreteria Example", textAlert, true);
  }, []);

  // Rendi visibile il loading impostando setLoading su true
  // React.useEffect(() => {
  //   setLoading(true);
  //   // Effettua le operazioni di caricamento, se necessario
  //   // Qui puoi fare richieste API, ottenere i dati, ecc.
  //   // Quando hai completato il caricamento, imposta isLoading su false:
  //   setTimeout(() => {
  //     console.log("Esempio ritardo nel caricare i dati di secondi");
  //     setLoading(false);
  //   }, 3000);
  // }, []);

  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Layout
      //digitare il titolo della pagina e la descrizione della pagina.
      // title={`Home | E-Commerce ${eCommerceConf.NomeEcommerce}`}
      // description="This is a E-Commerce home page, using React.js Next.js and Material-UI. Powered by Byteware srl."
      >
        <div>
          <Typography variant="h5" component="h1" gutterBottom>
            HOME PAGE
          </Typography>
          <Typography component="p" paragraph={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id ornare ipsum. Cras nec condimentum odio. Proin maximus augue eu eros vestibulum cursus. Suspendisse congue, arcu at volutpat sodales, leo erat pellentesque turpis, a euismod
            quam magna ac neque. Pellentesque elit purus, vulputate in placerat et, finibus at augue. Maecenas justo nulla, tempor nec elit faucibus, scelerisque ultricies odio. Curabitur sit amet libero a ipsum pellentesque pharetra eget a lacus.
            Curabitur tristique leo vitae cursus fermentum. Nullam non suscipit risus. Proin tincidunt lectus non ipsum finibus sollicitudin.
          </Typography>
          <Typography component="p" paragraph={true}>
            Vivamus tempus maximus felis. Duis in dignissim urna, ac aliquet nisl. Aliquam fringilla viverra turpis, ut porta turpis tristique vel. Fusce at metus egestas, lacinia leo vel, fermentum purus. Quisque bibendum sem vitae arcu scelerisque
            venenatis. Quisque sagittis massa quis leo hendrerit dictum. Suspendisse elementum sapien vel convallis mattis. Vivamus eros eros, viverra sed malesuada varius, gravida vel justo. In hac habitasse platea dictumst. Nam sit amet facilisis
            arcu. Etiam rhoncus purus at porttitor congue. Curabitur ultricies in turpis eu venenatis. Nulla ac rhoncus ex, eu dictum neque. Sed commodo sagittis lorem. Nulla facilisi.
          </Typography>
          <Typography component="p" paragraph={true}>
            Sed aliquam arcu sed congue tincidunt. Donec ornare ligula lectus, gravida eleifend quam auctor nec. In egestas suscipit mi. Nullam eu sem ac arcu scelerisque lacinia. Etiam sagittis quam ut congue accumsan. Aliquam iaculis sapien id nunc
            volutpat, nec feugiat lectus viverra. Quisque nec felis placerat sem viverra facilisis a non justo. Cras pretium sapien risus, eget feugiat dui eleifend nec. Nullam elementum augue metus, ut mattis lacus varius non. Phasellus odio purus,
            auctor a ante at, mollis ultrices orci. Pellentesque feugiat ex eget ipsum ultrices, a faucibus sem consequat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque aliquet elit nec nulla
            laoreet, nec lacinia lectus fermentum. Integer ut nunc gravida, lobortis leo quis, malesuada sapien.
          </Typography>
          <Typography component="p" paragraph={true}>
            Fusce luctus diam ac neque pretium, id lobortis purus ultrices. Phasellus pharetra vel metus at aliquam. In laoreet viverra dolor, ut fermentum risus pretium nec. Proin at massa quis felis convallis fermentum accumsan eu arcu. Cras
            volutpat enim libero. Nullam vel arcu eros. Integer eget nibh in purus pretium blandit at nec eros. Nulla aliquet, augue eu posuere scelerisque, est tortor gravida turpis, at auctor dui lacus quis tortor.{" "}
          </Typography>
          <Typography component="p" paragraph={true}>
            Sed tristique arcu tellus. Vivamus ullamcorper viverra ante nec consectetur. Integer et purus ante. Curabitur facilisis, lacus a posuere hendrerit, leo augue pulvinar leo, sed interdum tellus tellus vitae nunc. Sed ultricies mi mi, quis
            faucibus metus mattis vitae. Suspendisse euismod diam nec vehicula suscipit. Ut magna ex, semper at velit ut, blandit sodales lectus. Integer non egestas nisl. Nullam eu odio et nibh mattis hendrerit. Praesent consequat erat id magna
            pellentesque, vel tristique elit fermentum. Donec interdum posuere nisl a cursus. Aliquam et lacus a massa sagittis maximus at nec lacus. Suspendisse eleifend iaculis turpis, quis pharetra turpis aliquet posuere.
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            Section
          </Typography>
          <Typography component="p" paragraph={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id ornare ipsum. Cras nec condimentum odio. Proin maximus augue eu eros vestibulum cursus. Suspendisse congue, arcu at volutpat sodales, leo erat pellentesque turpis, a euismod
            quam magna ac neque. Pellentesque elit purus, vulputate in placerat et, finibus at augue. Maecenas justo nulla, tempor nec elit faucibus, scelerisque ultricies odio. Curabitur sit amet libero a ipsum pellentesque pharetra eget a lacus.
            Curabitur tristique leo vitae cursus fermentum. Nullam non suscipit risus. Proin tincidunt lectus non ipsum finibus sollicitudin.
          </Typography>
          <Typography component="p" paragraph={true}>
            Vivamus tempus maximus felis. Duis in dignissim urna, ac aliquet nisl. Aliquam fringilla viverra turpis, ut porta turpis tristique vel. Fusce at metus egestas, lacinia leo vel, fermentum purus. Quisque bibendum sem vitae arcu scelerisque
            venenatis. Quisque sagittis massa quis leo hendrerit dictum. Suspendisse elementum sapien vel convallis mattis. Vivamus eros eros, viverra sed malesuada varius, gravida vel justo. In hac habitasse platea dictumst. Nam sit amet facilisis
            arcu. Etiam rhoncus purus at porttitor congue. Curabitur ultricies in turpis eu venenatis. Nulla ac rhoncus ex, eu dictum neque. Sed commodo sagittis lorem. Nulla facilisi.
          </Typography>
          <Typography component="p" paragraph={true}>
            Sed aliquam arcu sed congue tincidunt. Donec ornare ligula lectus, gravida eleifend quam auctor nec. In egestas suscipit mi. Nullam eu sem ac arcu scelerisque lacinia. Etiam sagittis quam ut congue accumsan. Aliquam iaculis sapien id nunc
            volutpat, nec feugiat lectus viverra. Quisque nec felis placerat sem viverra facilisis a non justo. Cras pretium sapien risus, eget feugiat dui eleifend nec. Nullam elementum augue metus, ut mattis lacus varius non. Phasellus odio purus,
            auctor a ante at, mollis ultrices orci. Pellentesque feugiat ex eget ipsum ultrices, a faucibus sem consequat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque aliquet elit nec nulla
            laoreet, nec lacinia lectus fermentum. Integer ut nunc gravida, lobortis leo quis, malesuada sapien.
          </Typography>
          <Typography component="p" paragraph={true}>
            Fusce luctus diam ac neque pretium, id lobortis purus ultrices. Phasellus pharetra vel metus at aliquam. In laoreet viverra dolor, ut fermentum risus pretium nec. Proin at massa quis felis convallis fermentum accumsan eu arcu. Cras
            volutpat enim libero. Nullam vel arcu eros. Integer eget nibh in purus pretium blandit at nec eros. Nulla aliquet, augue eu posuere scelerisque, est tortor gravida turpis, at auctor dui lacus quis tortor.{" "}
          </Typography>
          <Typography component="p" paragraph={true}>
            Sed tristique arcu tellus. Vivamus ullamcorper viverra ante nec consectetur. Integer et purus ante. Curabitur facilisis, lacus a posuere hendrerit, leo augue pulvinar leo, sed interdum tellus tellus vitae nunc. Sed ultricies mi mi, quis
            faucibus metus mattis vitae. Suspendisse euismod diam nec vehicula suscipit. Ut magna ex, semper at velit ut, blandit sodales lectus. Integer non egestas nisl. Nullam eu odio et nibh mattis hendrerit. Praesent consequat erat id magna
            pellentesque, vel tristique elit fermentum. Donec interdum posuere nisl a cursus. Aliquam et lacus a massa sagittis maximus at nec lacus. Suspendisse eleifend iaculis turpis, quis pharetra turpis aliquet posuere.
          </Typography>
        </div>
      </Layout>
    </ThemeProvider>
  );
};

//REDUX-STORE
// Assicurati di includere setLoading tra le azioni mapDispatchToProps
const mapDispatchToProps = {
  setLoading,
};

// Wrappa il componente Home con connect per collegarlo al Redux store
export default connect(null, mapDispatchToProps)(Home);
