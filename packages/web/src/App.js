import React from "react";
import "./App.css";
import Movie from "./components/Movie";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { movies: [] };
	}

	componentDidMount() {
		fetch("//localhost:5000/api/v1/movies")
			.then((response) => response.json())
			.then((movies) => this.setState({ movies }))
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<div className="App">
				<h2 className="break">Flex.com</h2>
				{this.state.movies.map((movie) => {
					return <Movie key={movie._id} movie={movie} />;
				})}
			</div>
		);
	}
}

export default App;
