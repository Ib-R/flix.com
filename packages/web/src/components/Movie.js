import React from "react";
import styles from "../styles/movie.module.css";

export default function Movie(props) {
	return (
		<div className={styles.movie}>
			<h2>{props.movie.title}</h2>
			<p>Rating: {props.movie.rating}</p>
			<p>{props.movie.desc}</p>
		</div>
	);
}
