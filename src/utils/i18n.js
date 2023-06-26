export function i18n(world) {
	switch (world) {
		case "fantasy":
			return "Фэнтези";
		case "horror":
			return "Ужасы";
		case "action":
			return "Боевик";
		case "comedy":
			return "Комедия";
		default:
			return world;
	}
}
