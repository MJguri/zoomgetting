import '../styles/globals.css'
import Layout from "../components/Layout";
import {QueryClient, QueryClientProvider} from "react-query";
import {useState} from "react";

function MyApp({Component, pageProps}) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </QueryClientProvider>);

}

export default MyApp
