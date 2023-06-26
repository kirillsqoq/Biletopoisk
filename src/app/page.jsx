"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

import {
	selectGenre,
	selectProductAmount,
	selectSearchStr,
} from "@/redux/features/cart/selector";

import { cartActions } from "@/redux/features/cart";

import { useGetMovieQuery, useGetMoviesQuery } from "@/redux/services/movieApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { i18n } from "@/utils/i18n";
import { TicketButtonsPanel } from "@/components/TicketsButtonsPanel";

// const Film = ({ filmId }) => {
// 	const { data, isLoading, error } = useGetMovieQuery(filmId);

// 	if (isLoading) {
// 		return <span>Loading...</span>;
// 	}

// 	if (!data || error) {
// 		return <span>NotFound</span>;
// 	}

// 	return <div>{/* <FilmCard filmId={filmId} /> */}</div>;
// };

export const Films = ({ cartMode }) => {
	const { data, isLoading, error } = useGetMoviesQuery();
	const [currentFilmId, setCurrentFilmId] = useState();
	const searchStr = useSelector((state) => selectSearchStr(state));
	const selectedGenre = useSelector((state) => selectGenre(state));

	useEffect(() => {
		console.log(selectedGenre);
	}, [selectedGenre]);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (!data || error) {
		return <span>NotFound</span>;
	}

	return (
		<div className={styles.films_list}>
			{data.map(
				({ id, title, posterUrl, genre }) =>
					title.toLowerCase().includes(searchStr.toLowerCase()) && (
						<>
							{selectedGenre !== "Не выбран" ? (
								i18n(genre) === selectedGenre && (
									<FilmCard
										cartMode={cartMode}
										key={id}
										id={id}
										title={title}
										posterUrl={posterUrl}
										genre={genre}
									/>
								)
							) : (
								<FilmCard
									cartMode={cartMode}
									key={id}
									id={id}
									title={title}
									posterUrl={posterUrl}
									genre={genre}
								/>
							)}
						</>
					)
			)}
			{/* {currentFilmId && <Film filmId={currentFilmId} />} */}
		</div>
	);
};

export default function Home() {
	return (
		<main className={styles.main}>
			<SerachFilter />
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
						<TicketButtonsPanel id={id} cartVariant={cartMode} />
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

function SerachFilter() {
	const dispatch = useDispatch();

	return (
		<div className={styles.search_filter}>
			<h3>Фильтр поиска</h3>
			<div className={styles.filters}>
				<div className={styles.filter_item}>
					<label>Название</label>

					<input
						onChange={(e) =>
							dispatch(cartActions.setSearch(e.target.value))
						}
						placeholder='Введите название'
						className={styles.input}
						type='search'
						name='name'
					/>
				</div>
				<div className={styles.filter_item}>
					<label>Жанр</label>

					<select
						placeholder='Выберите жанр'
						onChange={(e) =>
							dispatch(cartActions.setGenre(e.target.value))
						}
						className={styles.input}>
						<option value='Не выбран'>Не выбран</option>
						<option value='Боевик'>Боевик</option>
						<option value='Комедия'>Комедия</option>
						<option value='Фэнтези'>Фэнтези</option>
						<option value='Ужасы'>Ужасы</option>
					</select>
				</div>
				<div className={styles.filter_item}>
					<label>Кинотеатр</label>

					<select
						placeholder='Выберите кинотеатр'
						className={styles.input}>
						<option value='Выберите кинотеатр'>Не выбран</option>
					</select>
				</div>
			</div>
		</div>
	);
}
