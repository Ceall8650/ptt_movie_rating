import TopBarView from "./TopBar/TopBarView";
import MainView from './MainView';

function Home() {
	return (
		<div className="h-full overflow-auto">
			<TopBarView />
			<MainView />
		</div>
	);
}

export default Home;
