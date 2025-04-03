function toggleShortsNavButton(isHidden) {
	const navItems = document.querySelectorAll("ytd-guide-entry-renderer");

	navItems.forEach((item) => {
		const titleElement = item.querySelector(
			"#endpoint-title, yt-formatted-string, title style-scope ytd-guide-entry-renderer"
		);
		if (titleElement && titleElement.textContent.includes("Shorts")) {
			item.style.display = isHidden ? "none" : "block";
		}
	});
}

function toggleShorts(isHidden) {
	const HOME_CONTAINER = "ytd-rich-section-renderer";
	const allVisibleContainers = document.querySelectorAll(HOME_CONTAINER);

	allVisibleContainers.forEach((section) => {
		const titleElements = section.querySelectorAll(
			"span.title, h2, h3, yt-formatted-string"
		);

		let isShorts = false;
		titleElements.forEach((element) => {
			if (element.textContent.includes("Shorts")) {
				isShorts = true;
			}
		});

		if (isShorts) {
			section.style.display = isHidden ? "none" : "block";
		}
	});

	// shorts shelf (in video page)
	const shortsShelf = document.querySelectorAll("ytd-reel-shelf-renderer");
	shortsShelf.forEach((shelf) => {
		shelf.style.display = isHidden ? "none" : "block";
	});

	toggleShortsNavButton(isHidden);
}

function togglePlayables(isHidden) {
	const HOME_CONTAINER = "ytd-rich-section-renderer";
	const allVisibleContainers = document.querySelectorAll(HOME_CONTAINER);

	allVisibleContainers.forEach((section) => {
		const titleElements = section.querySelectorAll(
			"span.title, h2, h3, yt-formatted-string"
		);

		let isPlayables = false;
		titleElements.forEach((element) => {
			if (
				element.textContent.includes("YouTube Playables" || "Playables")
			) {
				isPlayables = true;
			}
		});

		if (isPlayables) {
			section.style.display = isHidden ? "none" : "block";
		}
	});
}

function toggleNews(isHidden) {
	const HOME_CONTAINER = "ytd-rich-section-renderer";
	const allVisibleContainers = document.querySelectorAll(HOME_CONTAINER);

	allVisibleContainers.forEach((section) => {
		const titleElements = section.querySelectorAll(
			"span.title, h2, h3, yt-formatted-string"
		);

		let isNews = false;
		titleElements.forEach((element) => {
			const text = element.textContent;
			if (text.includes("Top news") || text.includes("Breaking news")) {
				isNews = true;
			}
		});

		if (isNews) {
			section.style.display = isHidden ? "none" : "block";
		}
	});
}

function applySettings() {
	chrome.storage.sync.get(
		{
			shortsHidden: false,
			playablesHidden: false,
			newsHidden: false,
		},
		function (items) {
			if (items.shortsHidden) {
				toggleShorts(true);
			} else {
				toggleShorts(false);
			}
			if (items.playablesHidden) togglePlayables(true);
			if (items.newsHidden) toggleNews(true);
		}
	);
}

// page load
applySettings();

// content observer
const observer = new MutationObserver(() => {
	applySettings();
});

// observe the document
observer.observe(document.body, { childList: true, subtree: true });
