import MovieEmpty from "./(Movie)/MovieEmpty";
import TopBarView from "./(TopBar)/TopBarView";
import MainView from './(Movie)/MainView';
import MovieSearching from "./(Movie)/MovieSearching";

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
