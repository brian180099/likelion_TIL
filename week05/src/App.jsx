import { lions } from "./data/lions.js";
import ControlPanel from "./components/ControlPanel.jsx";
import ProfileCardList from "./components/ProfileCardList.jsx";
import DetailList from "./components/DetailList.jsx";

function App() {
  return (
    <div className="app">
      <ControlPanel totalCount={lions.length} />
      <ProfileCardList lions={lions} />
      <DetailList lions={lions} />
    </div>
  );
}

export default App;