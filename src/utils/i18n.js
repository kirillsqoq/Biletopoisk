export function i18n(world) {
	switch (world) {
		case "fantasy":
			return "Фэнтези";
		case "horror":
			return "Хоррор";
		case "action":
			return "Экшен";
		case "comedy":
			return "Комедия";
		default:
			return world;
	}
}
