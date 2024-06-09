import AnalyseCard from "../components/cards/AnalyseCard";
import LoginCard from "../components/cards/LoginCard";
import NewAccountCard from "../components/cards/NewAccountCard";

function StartPage() {
  return (
    <div className="container mt-4">
      <h1>Willkommen auf unserer Text-Analyse Webseite!</h1>
      <div className="analyse-container">
        <AnalyseCard />
        <LoginCard />
        <NewAccountCard />
      </div>
    </div>
  );
}

export default StartPage;
