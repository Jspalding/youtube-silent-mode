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

function toggleComments(isHidden) {
	const commentSections = document.querySelectorAll("ytd-comments");
	commentSections.forEach((section) => {
		section.style.display = isHidden ? "none" : "block";
	});
}

function toggleRelated(isHidden) {
	const relatedVideos = document.querySelectorAll(
		"ytd-watch-next-secondary-results-renderer"
	);
	relatedVideos.forEach((section) => {
		section.style.display = isHidden ? "none" : "block";
	});

	const primaryContainer = document.querySelector("#primary");
	const columnsContainer = document.querySelector("ytd-watch-flexy");

	if (isHidden) {
		if (primaryContainer) {
			primaryContainer.style.cssText =
				"width: 100% !important; max-width: 100% !important;";
		}

		if (columnsContainer) {
			columnsContainer.classList.add("related-hidden");

			let styleEl = document.getElementById("youtube-silent-mode-styles");
			if (!styleEl) {
				styleEl = document.createElement("style");
				styleEl.id = "youtube-silent-mode-styles";
				document.head.appendChild(styleEl);
			}

			styleEl.textContent = `
				ytd-watch-flexy.related-hidden {
					--ytd-watch-flexy-sidebar-width: 0px !important;
					--ytd-watch-flexy-panel-max-width: none !important;
				}
				
				ytd-watch-flexy.related-hidden #primary {
					max-width: none !important;
					width: 100% !important;
				}
				
				ytd-watch-flexy.related-hidden #secondary {
					display: none !important;
				}
				
				ytd-watch-flexy.related-hidden #columns {
					max-width: none !important;
					display: block !important;
				}
			`;
		}
	} else {
		// restore original layout
		if (primaryContainer) {
			primaryContainer.style.cssText = "";
		}

		if (columnsContainer) {
			columnsContainer.classList.remove("related-hidden");

			const styleEl = document.getElementById(
				"youtube-silent-mode-styles"
			);
			if (styleEl) {
				styleEl.textContent = "";
			}
		}
	}
}

function applySettings() {
	chrome.storage.sync.get(
		{
			shortsHidden: false,
			playablesHidden: false,
			newsHidden: false,
			commentsHidden: false,
			relatedHidden: false,
		},
		function (items) {
			if (items.shortsHidden) {
				toggleShorts(true);
			} else {
				toggleShorts(false);
			}
			if (items.playablesHidden) togglePlayables(true);
			if (items.newsHidden) toggleNews(true);
			if (items.commentsHidden) toggleComments(true);
			if (items.relatedHidden) toggleRelated(true);
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
