"use client";
import Image from "next/image";
import styles from "../[id]/page.module.css";
import { usePathname } from "next/navigation";

import {
	useGetMovieQuery,
	useGetReviewsQuery,
} from "@/redux/services/movieApi";
import { i18n } from "@/utils/i18n";
import { TicketButtonsPanel } from "@/components/TicketsButtonsPanel";

export default function Home() {
	const pathname = usePathname();

	return (
		<main>
			<div className={styles.main}>
				<Film path={pathname} />
			</div>
		</main>
	);
}

const Film = ({ path }) => {
	const pathId = path.slice(path.lastIndexOf("/") + 1, path.length);
	const { data, isLoading, error } = useGetMovieQuery(pathId);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (!data || error) {
		return <span>NotFound</span>;
	}

	return (
		<div className={styles.films_list}>
			{data && <FilmPage film={data} />}
		</div>
	);
};

function FilmPage({ film }) {
	return (
		<>
			<div className={styles.film_card}>
				<Image
					src={film.posterUrl}
					width={400}
					height={500}
					alt='Picture of the author'
				/>
				<div className={styles.film_info}>
					<div style={{ display: "flex", alignItems: "flex-end" }}>
						<h2>{film.title}</h2>
						<div style={{ flexGrow: 1 }}></div>
						<TicketButtonsPanel cartVariant={false} id={film.id} />
					</div>
					<div className={styles.film_data}>
						<div className={styles.film_data_item}>
							<text>Жанр:</text>
							<text>{i18n(film.genre)}</text>
						</div>
						<div className={styles.film_data_item}>
							<text>Год выпуска:</text>
							<text>{film.releaseYear}</text>
						</div>
						<div className={styles.film_data_item}>
							<text>Рейтинг:</text>
							<text>{film.rating}</text>
						</div>
						<div className={styles.film_data_item}>
							<text>Режисер:</text>
							<text>{film.director}</text>
						</div>
					</div>
					<div className={styles.film_description}>
						<h3>Описание</h3>
						<p>{film.description}</p>
					</div>
				</div>
			</div>
			<Comments filmId={film.id} />
		</>
	);
}

function Comments({ filmId }) {
	const { data, isLoading, error } = useGetReviewsQuery(filmId);

	return (
		data &&
		data.map(({ id, name, text, rating }) => (
			<Comment key={id} name={name} rating={rating} text={text} />
		))
	);
}

function Comment({ name, rating, text }) {
	return (
		<>
			<div className={styles.comment}>
				<div className={styles.comment_userpic}>
					<AvatarIcon />
				</div>
				<div className={styles.comment_body}>
					<div className={styles.comment_header}>
						<text style={{ fontWeight: 600 }}>{name}</text>
						<div className={styles.film_data_item}>
							<text>Оценка:</text>
							<text>{rating}</text>
						</div>
					</div>
					<div className={styles.comment_text}>{text}</div>
				</div>
			</div>
		</>
	);
}

const AvatarIcon = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={32}
		height={32}
		fill='none'
		{...props}>
		<path
			fill='#828282'
			d='M27 5H5a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 2v12.844l-3.259-3.258a1.998 1.998 0 0 0-2.828 0l-2.5 2.5-5.5-5.5a2 2 0 0 0-2.828 0L5 18.671V7h22ZM5 21.5l6.5-6.5 10 10H5v-3.5ZM27 25h-2.671l-4.5-4.5 2.5-2.5L27 22.672V25Zm-9-12.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z'
		/>
	</svg>
);
