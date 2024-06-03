import AnalyseCard from "../components/cards/AnalyseCard";
import LoginCard from "../components/cards/LoginCard";
import NewAccountCard from "../components/cards/NewAccountCard";

import Footer from "../components/Footer";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelloBackend } from "../components/HelloBackend";

const queryClient = new QueryClient();

function StartPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mt-4">
        <h1>Willkommen auf unserer Text-Analyse Webseite!</h1>
        <div className="analyse-container">
          <AnalyseCard />
          <LoginCard />
          <NewAccountCard />
          <HelloBackend />
        </div>
      </div>
      <Footer />
    </QueryClientProvider>
  );
}

export default StartPage;
