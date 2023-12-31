"use client";
import styles from "../app/page.module.css";
import { selectProductAmount } from "@/redux/features/cart/selector";
import { cartActions } from "@/redux/features/cart";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createPortal } from "react-dom";
export const TicketButtonsPanel = ({ id, cartVariant }) => {
	const dispatch = useDispatch();
	const filmTicketsAmount = useSelector((state) =>
		selectProductAmount(state, id)
	);
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button
				onClick={() => dispatch(cartActions.increment(id))}
				className={
					filmTicketsAmount >= 30
						? styles.film_card_order_button_disabled
						: styles.film_card_order_button
				}>
				+
			</button>
			<text>{filmTicketsAmount}</text>

			<button
				onClick={
					cartVariant
						? filmTicketsAmount !== 1
							? () => dispatch(cartActions.decrement(id))
							: () => setShowModal(true)
						: () => dispatch(cartActions.decrement(id))
				}
				className={
					filmTicketsAmount == 0
						? styles.film_card_order_button_disabled
						: styles.film_card_order_button
				}>
				-
			</button>
			{cartVariant && filmTicketsAmount > 0 && (
				<button
					onClick={() => setShowModal(true)}
					className={styles.film_card_order_button_close}>
					<CloseIcon />
				</button>
			)}
			{showModal &&
				cartVariant &&
				createPortal(
					<ModalContent
						onCancel={() => setShowModal(false)}
						onDelete={() => [
							setShowModal(false),
							dispatch(cartActions.reset(id)),
						]}
					/>,
					document.body
				)}
		</>
	);
};

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

const CloseIcon = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={20}
		height={20}
		fill='none'
		{...props}>
		<path
			fill='#333'
			d='M16.067 15.183a.624.624 0 1 1-.884.884L10 10.884l-5.183 5.183a.626.626 0 0 1-.884-.884L9.117 10 3.933 4.817a.625.625 0 0 1 .884-.884L10 9.116l5.183-5.183a.626.626 0 0 1 .884.884L10.884 10l5.183 5.183Z'
		/>
	</svg>
);

function ModalContent({ onDelete, onCancel }) {
	return (
		<>
			<div className={styles.modal}>
				<div className={styles.modal_header}>
					<div>Удаление билета</div>
					<div style={{ flexGrow: "1" }}></div>
					<button
						onClick={onCancel}
						className={styles.film_card_order_button_close}>
						<CloseIcon />
					</button>
				</div>
				<div>Вы уверены, что хотите удалить билет?</div>
				<div
					className={styles.modal_buttons}
					style={{ display: "flex", flexFlow: "row", gap: "8px" }}>
					<button onClick={onDelete}>Да</button>
					<button onClick={onCancel}>Нет</button>
				</div>
			</div>
		</>
	);
}
