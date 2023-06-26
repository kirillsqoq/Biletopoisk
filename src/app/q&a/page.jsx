"use client";

import { useState } from "react";
import { FilmsList } from "../page";
import styles from "../page.module.css";
const questions = [
	{
		q: "Что такое Билетопоиск?",
		a: "Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов.",
	},
	{
		q: "Какой компании принадлежит Билетопоиск?",
		a: "Билетопоиск пренадлежит компании Яндекс",
	},
	{
		q: "Как купить билет на Билетопоиск?",
		a: "Чтобы купить билет на Билетопоиск просто выбирите один или несколько фильмов и  добавьте нужное количество билетов в корзину",
	},
	{
		q: "Как оставить отзыв на Билетопоиск?",
		a: "Пока что вы не можете оставить отзыв, но вы можете почитать уже существующие отзывы на стрнаице фильма",
	},
];
export default function Home() {
	return (
		<main className={styles.main}>
			<QuestionsBlock questions={questions} />
		</main>
	);
}

function QuestionsBlock({ questions }) {
	return (
		<div className={styles.qa_view}>
			<div className={styles.questions}>
				<div className={styles.questions_header}>
					<text>Вопросы-ответы</text>
				</div>
				{questions.map((question) => (
					<Collapse key={question.q} data={question} />
				))}
			</div>
		</div>
	);
}

function Collapse({ data }) {
	const [open, setOpen] = useState(false);
	return (
		<div className={styles.collapse}>
			<div onClick={() => setOpen(!open)}>
				<div className={styles.collapse_container}>
					<text> {data.q}</text>
					{open && <text>{data.a}</text>}
				</div>
				<button
					style={{
						cursor: "pointer",
						border: "none",
						background: "#fff",
					}}>
					<ArrowIcon
						className={
							open ? styles.open_collapse : styles.close_collapse
						}
					/>
				</button>
			</div>
		</div>
	);
}

const ArrowIcon = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={32}
		height={32}
		fill='none'
		{...props}>
		<path
			fill='#333'
			fillRule='evenodd'
			d='M20 1.667h-8C4.76 1.667 1.667 4.76 1.667 12v8c0 7.24 3.093 10.333 10.333 10.333h8c7.24 0 10.333-3.093 10.333-10.333v-8C30.333 4.76 27.24 1.667 20 1.667ZM28.333 20c0 6.147-2.186 8.333-8.333 8.333h-8c-6.147 0-8.333-2.186-8.333-8.333v-8c0-6.147 2.186-8.333 8.333-8.333h8c6.147 0 8.333 2.186 8.333 8.333v8Zm-11.626-7.587A.99.99 0 0 0 16 12.12a.99.99 0 0 0-.707.293l-4.706 4.707a1.006 1.006 0 0 0 0 1.413 1.006 1.006 0 0 0 1.413 0l4-4 4 4a1.006 1.006 0 0 0 1.413 0 1.006 1.006 0 0 0 0-1.413l-4.706-4.707Z'
			clipRule='evenodd'
		/>
	</svg>
);
