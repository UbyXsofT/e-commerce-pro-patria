// import Header from "./Header";
// import Footer from "./Footer";
import Head from "next/head";
import {useSpring, animated} from "@react-spring/web";

const Layout = ({children, title, description, ogImage, url}) => {
	const mainAnimation = useSpring({
		opacity: 1,
		from: {opacity: 0},
		config: {
			duration: 1000,
		},
	});
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
					content={description ? description : "E-commerce per il tuo centro fitness in React Next MUI"}
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
					content={description ? description : "E-commerce per il tuo centro fitness in React Next MUI."}
					key='og:description'
				/>
			</Head>

			<animated.main style={mainAnimation}>{children}</animated.main>
		</>
	);
};

export default Layout;
