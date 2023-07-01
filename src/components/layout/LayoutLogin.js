// import Header from "./Header";
// import Footer from "./Footer";
import Head from "next/head";

const Layout = ({children, title, description, ogImage, url}) => {
	// website Url
	const pageUrl = "https://tommysgest.com/";
	// quando condividi questa pagina su facebook vedrai questa immagine
	const ogImg = "/public/images/banner-social.png";
	return (
		<>
			<Head>
				<title>{title ? title : "E-commerce per il tuo centro fitness in React Next MUI"}</title>
				<meta
					name='description'
					key='description'
					content={
						description ? description : "E-commerce per il tuo centro fitness in React Next MUI"
					}
				/>
				<meta
					property='og:title'
					content={title ? title : "E-commerce per il tuo centro fitness in React Next MUI"}
					key='og:title'
				/>
				<meta
					property='og:url'
					content={url ? url : pageUrl}
					key='og:url'
				/>
				<meta
					property='og:image'
					content={ogImage ? ogImage : ogImg}
					key='og:image'
				/>
				<meta
					property='og:description'
					content={
						description ? description : "E-commerce per il tuo centro fitness in React Next MUI."
					}
					key='og:description'
				/>
			</Head>

			<main>{children}</main>
		</>
	);
};

export default Layout;
