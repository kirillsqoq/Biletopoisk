"use client";
import { useEffect } from "react";
import styles from "../page.module.css";
import { Films } from "../page";
import {
	selectProductAmount,
	selectTotalTickets,
} from "@/redux/features/cart/selector";
import { useSelector } from "react-redux";

export default function Home() {
	return (
		<main>
			<div className={styles.cart_main}>
				<Cart />
			</div>
			<TotalTickets />
		</main>
	);
}

function Cart() {
	return <Films cartMode={true} />;
}

function TotalTickets() {
	const totalTicketsAmount = useSelector((state) =>
		selectTotalTickets(state)
	);
	useEffect(() => {
		console.log(totalTicketsAmount);
	}, [totalTicketsAmount]);

	return (
		<div className={styles.cart}>
			<div className={styles.total_tickets}>
				<text>Итого билетов:</text>
				<text>{totalTicketsAmount}</text>
			</div>
		</div>
	);
}
