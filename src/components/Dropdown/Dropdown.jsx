"useClient";
import React, { useState, useEffect, useRef } from "react";

export const Dropdown = (props) => {
	// Maintain local component state
	const [defaultVaule, setValue] = useState({
		selected: [...props.selected],
		isToggle: false,
		isOtherSelected: false,
		saveBtnState: true,
		otherInputValue: "",
	});

	const onSelectedItem = (item) => (e) => {
		const updatedState = defaultVaule.selected.includes(item.id)
			? defaultVaule.selected.filter((el) => el !== item.id)
			: [...defaultVaule.selected, item.id];
		setValue({ ...defaultVaule, selected: updatedState });
	};

	const toggleDropDown = (e) => {
		setValue({ ...defaultVaule, isToggle: !defaultVaule.isToggle });
	};

	const selectedText = () => {
		let placeholder = "";
		if (props.selected.length) {
			for (const [i, el] of props.dropdown.entries()) {
				if (props.selected.includes(el.id)) {
					placeholder += `${el.label},`;
				}
			}
		} else {
			placeholder = props.defaultText;
		}

		if (defaultVaule.isOtherSelected && defaultVaule.otherInputValue) {
			placeholder += `Others:${defaultVaule.otherInputValue}`;
		}

		return placeholder;
	};

	const onOthersSelected = (e) => {
		setValue({
			...defaultVaule,
			isOtherSelected: !defaultVaule.isOtherSelected,
			saveBtnState: !defaultVaule.isOtherSelected
				? !!defaultVaule.otherInputValue
				: true,
			otherInputValue: !defaultVaule.isOtherSelected
				? ""
				: defaultVaule.otherInputValue,
		});
	};

	const handleChange = (e) => {
		setValue({
			...defaultVaule,
			otherInputValue: e.target.value,
			saveBtnState: !!e.target.value,
		});
	};

	const onSave = (e) => {
		props.onSave(defaultVaule.selected);
		// selectedText();
	};

	const useOuterClick = (callback) => {
		const innerRef = useRef();
		const callbackRef = useRef();

		// set current callback in ref, before second useEffect uses it
		useEffect(() => {
			// useEffect wrapper to be safe for concurrent mode
			callbackRef.current = callback;
		});

		useEffect(() => {
			document.addEventListener("click", handleClick);
			return () => document.removeEventListener("click", handleClick);

			// read most recent callback and innerRef dom node from refs
			function handleClick(e) {
				if (
					innerRef.current &&
					callbackRef.current &&
					!innerRef.current.contains(e.target)
				) {
					callbackRef.current(e);
				}
			}
		}, []); // no need for callback + innerRef dep

		return innerRef; // return ref; client can omit `useRef`
	};

	const innerRef = useOuterClick((e) => {
		setValue({ ...defaultVaule, isToggle: false });
	});

	return (
		<div className='cusDDWrap down' ref={innerRef}>
			<div
				onClick={toggleDropDown}
				className={`cusDDBtn ${defaultVaule.isToggle ? "active" : ""}`}>
				<label>Language</label>
				<span>
					<i>{selectedText()}</i>
					<em></em>
				</span>
			</div>
			<div className='cusDDContent'>
				<ul>
					{props.dropdown &&
						props.dropdown.map((el) => {
							return (
								<li key={el.id}>
									<a
										href='#'
										role='button'
										className={
											defaultVaule.selected.includes(
												el.id
											)
												? "active"
												: ""
										}
										onClick={onSelectedItem(el)}
										key={el.id}>
										<i>{el.label}</i>
									</a>
								</li>
							);
						})}
					<li>
						<a
							href='#'
							role='button'
							className={
								defaultVaule.isOtherSelected ? "active" : ""
							}>
							<i onClick={onOthersSelected}>Others</i>
							{defaultVaule.isOtherSelected && (
								<div className='full'>
									<input
										type='text'
										onChange={handleChange}
									/>
								</div>
							)}
						</a>
					</li>
				</ul>
				<a
					href='#'
					className={!defaultVaule.saveBtnState ? "disabled" : ""}
					role='button'
					onClick={onSave}>
					SAVE
				</a>
			</div>
		</div>
	);
};
