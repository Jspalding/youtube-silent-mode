document.addEventListener("DOMContentLoaded", function () {
	chrome.storage.sync.get(
		{
			shortsHidden: false,
			playablesHidden: false,
			newsHidden: false,
			allHidden: false,
		},
		function (items) {
			document.getElementById("toggleShortsBtn").checked =
				items.shortsHidden;
			document.getElementById("togglePlayablesBtn").checked =
				items.playablesHidden;
			document.getElementById("toggleNewsBtn").checked = items.newsHidden;
			document.getElementById("toggleAllBtn").checked = items.allHidden;

			const allOn =
				items.shortsHidden && items.playablesHidden && items.newsHidden;
			const allOff =
				!items.shortsHidden &&
				!items.playablesHidden &&
				!items.newsHidden;

			if (!allOn && !allOff) {
				updateMasterToggleAppearance("custom");
			} else {
				updateMasterToggleAppearance(items.allHidden);
			}

			applyCurrentSettings();
		}
	);

	document
		.getElementById("masterToggleButton")
		.addEventListener("click", function () {
			const toggleCheckbox = document.getElementById("toggleAllBtn");

			const currentStatus =
				document.getElementById("toggleStatus").textContent;

			let newState;

			if (currentStatus === "OFF") {
				newState = true;
			} else if (currentStatus === "ON") {
				newState = false;
			} else {
				newState = true;
			}

			toggleCheckbox.checked = newState;

			updateMasterToggleAppearance(newState);

			document.getElementById("toggleShortsBtn").checked = newState;
			document.getElementById("togglePlayablesBtn").checked = newState;
			document.getElementById("toggleNewsBtn").checked = newState;

			chrome.storage.sync.set({
				shortsHidden: newState,
				playablesHidden: newState,
				newsHidden: newState,
				allHidden: newState,
			});

			chrome.tabs.query({ url: "*://*.youtube.com/*" }, function (tabs) {
				tabs.forEach(function (tab) {
					chrome.scripting.executeScript({
						target: { tabId: tab.id },
						args: [newState],
						function: toggleShorts,
					});
					chrome.scripting.executeScript({
						target: { tabId: tab.id },
						args: [newState],
						function: togglePlayables,
					});
					chrome.scripting.executeScript({
						target: { tabId: tab.id },
						args: [newState],
						function: toggleNews,
					});
				});
			});
		});
});

document.getElementById("toggleAllBtn").addEventListener("change", function () {
	const isChecked = this.checked;

	updateMasterToggleAppearance(isChecked);

	document.getElementById("toggleShortsBtn").checked = isChecked;
	document.getElementById("togglePlayablesBtn").checked = isChecked;
	document.getElementById("toggleNewsBtn").checked = isChecked;

	chrome.storage.sync.set({
		shortsHidden: isChecked,
		playablesHidden: isChecked,
		newsHidden: isChecked,
		allHidden: isChecked,
	});

	chrome.tabs.query({ url: "*://*.youtube.com/*" }, function (tabs) {
		tabs.forEach(function (tab) {
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				args: [isChecked],
				function: toggleShorts,
			});
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				args: [isChecked],
				function: togglePlayables,
			});
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				args: [isChecked],
				function: toggleNews,
			});
		});
	});
});

document
	.getElementById("toggleShortsBtn")
	.addEventListener("change", function () {
		const isChecked = this.checked;
		chrome.storage.sync.set({ shortsHidden: isChecked });
		updateMasterToggleState();

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
		updateMasterToggleState();

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
		updateMasterToggleState();

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

function updateMasterToggleState() {
	const shortsChecked = document.getElementById("toggleShortsBtn").checked;
	const playablesChecked =
		document.getElementById("togglePlayablesBtn").checked;
	const newsChecked = document.getElementById("toggleNewsBtn").checked;

	const allOn = shortsChecked && playablesChecked && newsChecked;
	const allOff = !shortsChecked && !playablesChecked && !newsChecked;

	document.getElementById("toggleAllBtn").checked = allOn;

	if (!allOn && !allOff) {
		updateMasterToggleAppearance("custom");
	} else {
		updateMasterToggleAppearance(allOn);
	}

	chrome.storage.sync.set({ allHidden: allOn });
}

function updateMasterToggleAppearance(state) {
	const toggleStatus = document.getElementById("toggleStatus");
	const masterButton = document.getElementById("masterToggleButton");

	masterButton.classList.remove("active", "custom");

	if (state === "custom") {
		toggleStatus.textContent = "CUSTOM";
		masterButton.classList.add("custom");
	} else if (state === true) {
		toggleStatus.textContent = "ON";
		masterButton.classList.add("active");
	} else {
		toggleStatus.textContent = "OFF";
	}
}
