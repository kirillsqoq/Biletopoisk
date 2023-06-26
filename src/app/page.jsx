"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

import { selectProductAmount } from "@/redux/features/cart/selector";

import { cartActions } from "@/redux/features/cart";

import { useGetMovieQuery, useGetMoviesQuery } from "@/redux/services/movieApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { i18n } from "@/utils/i18n";

export const Films = ({ cartMode }) => {
	const { data, isLoading, error } = useGetMoviesQuery();
	const [currentFilmId, setCurrentFilmId] = useState();
	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (!data || error) {
		return <span>NotFound</span>;
	}

	return (
		<>
			<div className={styles.search_filter}>
				<h3>Фильтр поиска</h3>
				<div className={styles.filters}>
					<div className={styles.filter_item}>
						<label>Название</label>
						<input
							placeholder='Введите название'
							className={styles.input}
							type='text'
							name='name'
						/>
					</div>
					<div className={styles.filter_item}>
						<label>Жанр</label>
						<select>
							<option value='someOption'>Some option</option>
							<option value='otherOption'>Other option</option>
						</select>
					</div>
					<div className={styles.filter_item}>
						<label>Кинотеатр</label>
						<select>
							<option value='someOption'>Some option</option>
							<option value='otherOption'>Other option</option>
						</select>
					</div>
				</div>
			</div>
			<div className={styles.films_list}>
				{data.map(({ id, title, posterUrl, genre }) => (
					<FilmCard
						cartMode={cartMode}
						key={id}
						id={id}
						title={title}
						posterUrl={posterUrl}
						genre={genre}
					/>
				))}
				{/* {currentFilmId && <Film filmId={currentFilmId} />} */}
			</div>
		</>
	);
};

export default function Home() {
	return (
		<main className={styles.main}>
			<Films cartMode={false} />
		</main>
	);
}

function FilmCard({ id, title, posterUrl, genre, cartMode }) {
	const dispatch = useDispatch();
	const filmTicketsAmount = useSelector((state) =>
		selectProductAmount(state, id)
	);
	const Ticket = () => {
		return (
			<div className={styles.film_card}>
				<Image
					className={styles.film_card_image}
					src={posterUrl}
					width={100}
					height={120}
					alt='Picture of the author'
				/>
				<div className={styles.film_card_main}>
					<div className={styles.film_card_information}>
						<Link
							className={styles.film_name}
							href={"/film/" + id}
							style={{ textDecoration: "none" }}>
							{title}
						</Link>
						<text className={styles.film_description}>
							{i18n(genre)}
						</text>
					</div>
					<div className={styles.film_card_order}>
						<button
							onClick={() => dispatch(cartActions.increment(id))}
							className={styles.film_card_order_button}>
							+
						</button>
						<text>{filmTicketsAmount}</text>
						<button
							onClick={() => dispatch(cartActions.decrement(id))}
							className={styles.film_card_order_button}>
							-
						</button>
					</div>
				</div>
			</div>
		);
	};
	if (!cartMode) {
		return <Ticket />;
	} else {
		if (filmTicketsAmount > 0) {
			return <Ticket />;
		}
	}
}

const PlusIcon = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='1em'
		height='1em'
		fill='#fff'
		{...props}>
		<path
			fill='#333'
			d='M28 16a1 1 0 0 1-1 1H17v10a1 1 0 0 1-2 0V17H5a1 1 0 0 1 0-2h10V5a1 1 0 0 1 2 0v10h10a1 1 0 0 1 1 1Z'
		/>
	</svg>
);
