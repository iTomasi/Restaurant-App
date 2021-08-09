import "tailwindcss/tailwind.css";

// Components
import Header from "components/header/Header";
import { Toaster } from "react-hot-toast";
import MainLayout from "components/MainLayout";

// Routes
import AuthRoute from "routes/AuthRoute";
import WaiterRoute from "routes/WaiterRoute";

// Redux
import { Provider } from "react-redux";
import store from "reduxSrc/store";

const App = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <MainLayout>
                <Toaster />
                <Header />
                <div className="w-full px-2 max-w-4xl mx-auto">
                    {Component.requireAuth ? (
                        <AuthRoute>
                            <Component {...pageProps} />
                        </AuthRoute>
                    ) : Component.requireWaiterRol ? (
                        <WaiterRoute>
                            <Component {...pageProps} />
                        </WaiterRoute>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </div>
            </MainLayout>
        </Provider>
    );
};

export default App;
