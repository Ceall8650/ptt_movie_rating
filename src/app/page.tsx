import MovieEmpty from "./(Movie)/MovieEmpty";
import MainView from './(Movie)/MainView';
import MovieSearching from "./(Movie)/MovieSearching";

function Home() {
	return (
		<MainView
			emptyComponent={<MovieEmpty />}
			movieSearchingComponent={<MovieSearching />}
		/>
	);
}

export default Home;
