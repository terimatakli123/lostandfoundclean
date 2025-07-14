// pages/_app.js
import '../styles/globals.css'  // Import Tailwind globally

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
