document.addEventListener("DOMContentLoaded", function () {
	chrome.storage.sync.get(
		{
			shortsHidden: false,
			playablesHidden: false,
			newsHidden: false,
		},
		function (items) {
			document.getElementById("toggleShortsBtn").checked =
				items.shortsHidden;
			document.getElementById("togglePlayablesBtn").checked =
				items.playablesHidden;
			document.getElementById("toggleNewsBtn").checked = items.newsHidden;

			applyCurrentSettings();
		}
	);
});

document
	.getElementById("toggleShortsBtn")
	.addEventListener("change", function () {
		const isChecked = this.checked;
		chrome.storage.sync.set({ shortsHidden: isChecked });

		chrome.tabs.query({ url: "*://*.youtube.com/*" }, function (tabs) {
			tabs.forEach(function (tab) {
				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					args: [isChecked],
					function: toggleShorts,
				});
			});
		});
	});

document
	.getElementById("togglePlayablesBtn")
	.addEventListener("change", function () {
		const isChecked = this.checked;
		chrome.storage.sync.set({ playablesHidden: isChecked });

		chrome.tabs.query({ url: "*://*.youtube.com/*" }, function (tabs) {
			tabs.forEach(function (tab) {
				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					args: [isChecked],
					function: togglePlayables,
				});
			});
		});
	});

document
	.getElementById("toggleNewsBtn")
	.addEventListener("change", function () {
		const isChecked = this.checked;
		chrome.storage.sync.set({ newsHidden: isChecked });

		chrome.tabs.query({ url: "*://*.youtube.com/*" }, function (tabs) {
			tabs.forEach(function (tab) {
				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					args: [isChecked],
					function: toggleNews,
				});
			});
		});
	});

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
			if (text.includes("Top news")) {
				isNews = true;
			}
		});

		if (isNews) {
			section.style.display = isHidden ? "none" : "block";
		}
	});
}

function applyCurrentSettings() {
	chrome.storage.sync.get(
		{
			shortsHidden: false,
			playablesHidden: false,
			newsHidden: false,
		},
		function (items) {
			chrome.tabs.query({ url: "*://*.youtube.com/*" }, function (tabs) {
				tabs.forEach(function (tab) {
					chrome.scripting.executeScript({
						target: { tabId: tab.id },
						args: [items.shortsHidden],
						function: toggleShorts,
					});
					chrome.scripting.executeScript({
						target: { tabId: tab.id },
						args: [items.playablesHidden],
						function: togglePlayables,
					});
					chrome.scripting.executeScript({
						target: { tabId: tab.id },
						args: [items.newsHidden],
						function: toggleNews,
					});
				});
			});
		}
	);
}
