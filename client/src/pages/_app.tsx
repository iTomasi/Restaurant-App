import "tailwindcss/tailwind.css";

// Components
import Header from "components/header/Header";
import { Toaster } from "react-hot-toast";

const App = ({ Component, pageProps }) => {
    return (
        <>
            <Toaster />
            <Header />
            <div className="w-full px-2 max-w-4xl mx-auto">
                <Component {...pageProps} />
            </div>
        </>
    );
};

export default App;
