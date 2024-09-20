import MovieEmpty from "./MovieEmpty";
import TopBarView from "./TopBar/TopBarView";
import MainView from './MainView';
import MovieSearching from "./MovieSearching";

function Home() {
	return (
		<div className="h-full overflow-auto">
			<TopBarView />
			<MainView
				emptyComponent={<MovieEmpty />}
				movieSearchingComponent={<MovieSearching />}
			/>
		</div>
	);
}

export default Home;
