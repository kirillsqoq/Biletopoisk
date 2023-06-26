"use client";

import Link from "next/link";
import "./globals.css";
import styles from "./layout.module.css";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { StoreProvider } from "@/redux/StoreProvider";

import { selectTotalTickets } from "@/redux/features/cart/selector";
import { cartActions } from "@/redux/features/cart";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<StoreProvider>
					<Header />
					<div className={styles.page_container}>
						{children}
						<div className={styles.page_placeholder}></div>
						<Footer />
					</div>
				</StoreProvider>
			</body>
		</html>
	);
}

function Header() {
	// const dispatch = useDispatch();
	const totalTicketsAmount = useSelector((state) =>
		selectTotalTickets(state)
	);
	const pathname = usePathname();

	return (
		<header className={styles.header}>
			<Link
				className={styles.logo}
				href={"/"}
				style={{ textDecoration: "none" }}>
				Билетопоиск
			</Link>

			<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
				{totalTicketsAmount > 0 && (
					<div className={styles.page_tickets_count}>
						{totalTicketsAmount}
					</div>
				)}

				<Link
					href={totalTicketsAmount == 0 ? { pathname } : "/cart"}
					style={{ textDecoration: "none" }}>
					<BasketIcon />
				</Link>
			</div>
		</header>
	);
}

function Footer() {
	return (
		<footer className={styles.footer}>
			<Link href='/q&a' style={{ textDecoration: "none" }}>
				Вопросы-ответы
			</Link>
			<Link href={"/about"} style={{ textDecoration: "none" }}>
				О нас
			</Link>
		</footer>
	);
}

const BasketIcon = (props) => (
	<svg
		style={{ paddingTop: "4px" }}
		xmlns='http://www.w3.org/2000/svg'
		width={32}
		height={32}
		fill='none'
		{...props}>
		<path
			fill='#fff'
			d='M29.494 8.675A2.015 2.015 0 0 0 27.984 8h-5.99a6 6 0 1 0-12 0h-5.99a2.016 2.016 0 0 0-1.5.675 2 2 0 0 0-.49 1.56l1.782 15a2 2 0 0 0 2 1.765h20.406a2 2 0 0 0 2-1.765l1.783-15a2 2 0 0 0-.491-1.56ZM15.994 4a4 4 0 0 1 4 4h-8a4 4 0 0 1 4-4Zm10.22 21a.017.017 0 0 1-.012 0H5.775L4.004 10h5.99v3a1 1 0 0 0 2 0v-3h8v3a1 1 0 0 0 2 0v-3h6l-1.78 15Z'
		/>
	</svg>
);
