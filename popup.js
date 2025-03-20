document
	.getElementById("toggleShortsBtn")
	.addEventListener("click", function () {
		chrome.tabs.query({ url: "*://*.youtube.com/*" }, function (tabs) {
			tabs.forEach(function (tab) {
				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					function: toggleShorts,
				});
			});
		});
	});

document
	.getElementById("togglePlayablesBtn")
	.addEventListener("click", function () {
		chrome.tabs.query({ url: "*://*.youtube.com/*" }, function (tabs) {
			tabs.forEach(function (tab) {
				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					function: togglePlayables,
				});
			});
		});
	});

function toggleShorts() {
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
			section.style.display =
				section.style.display === "none" ? "block" : "none";
		}
	});
}

function togglePlayables() {
	const HOME_CONTAINER = "ytd-rich-section-renderer";
	const allVisibleContainers = document.querySelectorAll(HOME_CONTAINER);

	allVisibleContainers.forEach((section) => {
		const titleElements = section.querySelectorAll(
			"span.title, h2, h3, yt-formatted-string"
		);

		let isPlayables = false;
		titleElements.forEach((element) => {
			if (element.textContent.includes("Playables")) {
				isPlayables = true;
			}
		});

		if (isPlayables) {
			section.style.display =
				section.style.display === "none" ? "block" : "none";
		}
	});
}

function toggleNews() {
	const HOME_CONTAINER = "ytd-rich-section-renderer";
	const allVisibleContainers = document.querySelectorAll(HOME_CONTAINER);

	allVisibleContainers.forEach((section) => {
		const titleElements = section.querySelectorAll(
			"span.title, h2, h3, yt-formatted-string"
		);

		let isNews = false;
		titleElements.forEach((element) => {
			if (element.textContent.includes("Top news")) {
				isNews = true;
			}
		});

		if (isNews) {
			section.style.display =
				section.style.display === "none" ? "block" : "none";
		}
	});
}
