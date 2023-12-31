// pages/_app.js
import { AuthProvider } from '/auth/authContext';
import '/layouts/styles.css';


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
