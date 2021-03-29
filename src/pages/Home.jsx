import { StartForm, Stats } from "../components";

function Home({ setGameProps }) {
  return (
    <div className="content">
      <StartForm setGameProps={setGameProps} />
      <Stats />
    </div>
  );
}

export default Home;
