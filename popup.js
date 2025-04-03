document.addEventListener("DOMContentLoaded", function () {
	chrome.storage.sync.get(
		{
			shortsHidden: false,
			playablesHidden: false,
			newsHidden: false,
			commentsHidden: false,
			relatedHidden: false,
			allHidden: false,
		},
		function (items) {
			document.getElementById("toggleShortsBtn").checked =
				items.shortsHidden;
			document.getElementById("togglePlayablesBtn").checked =
				items.playablesHidden;
			document.getElementById("toggleNewsBtn").checked = items.newsHidden;
			document.getElementById("toggleCommentsBtn").checked =
				items.commentsHidden;
			document.getElementById("toggleRelatedBtn").checked =
				items.relatedHidden;
			document.getElementById("toggleAllBtn").checked = items.allHidden;

			const allOn =
				items.shortsHidden &&
				items.playablesHidden &&
				items.newsHidden &&
				items.commentsHidden &&
				items.relatedHidden;
			const allOff =
				!items.shortsHidden &&
				!items.playablesHidden &&
				!items.newsHidden &&
				!items.commentsHidden &&
				!items.relatedHidden;

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
			document.getElementById("toggleCommentsBtn").checked = newState;
			document.getElementById("toggleRelatedBtn").checked = newState;

			chrome.storage.sync.set({
				shortsHidden: newState,
				playablesHidden: newState,
				newsHidden: newState,
				commentsHidden: newState,
				relatedHidden: newState,
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
					chrome.scripting.executeScript({
						target: { tabId: tab.id },
						args: [newState],
						function: toggleComments,
					});
					chrome.scripting.executeScript({
						target: { tabId: tab.id },
						args: [newState],
						function: toggleRelated,
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
	document.getElementById("toggleCommentsBtn").checked = isChecked;
	document.getElementById("toggleRelatedBtn").checked = isChecked;

	chrome.storage.sync.set({
		shortsHidden: isChecked,
		playablesHidden: isChecked,
		newsHidden: isChecked,
		commentsHidden: isChecked,
		relatedHidden: isChecked,
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
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				args: [isChecked],
				function: toggleComments,
			});
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				args: [isChecked],
				function: toggleRelated,
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

document
	.getElementById("toggleCommentsBtn")
	.addEventListener("change", function () {
		const isChecked = this.checked;
		chrome.storage.sync.set({ commentsHidden: isChecked });
		updateMasterToggleState();

		chrome.tabs.query({ url: "*://*.youtube.com/*" }, function (tabs) {
			tabs.forEach(function (tab) {
				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					args: [isChecked],
					function: toggleComments,
				});
			});
		});
	});

document
	.getElementById("toggleRelatedBtn")
	.addEventListener("change", function () {
		const isChecked = this.checked;
		chrome.storage.sync.set({ relatedHidden: isChecked });
		updateMasterToggleState();

		chrome.tabs.query({ url: "*://*.youtube.com/*" }, function (tabs) {
			tabs.forEach(function (tab) {
				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					args: [isChecked],
					function: toggleRelated,
				});
			});
		});
	});

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

function applyCurrentSettings() {
	chrome.storage.sync.get(
		{
			shortsHidden: false,
			playablesHidden: false,
			newsHidden: false,
			commentsHidden: false,
			relatedHidden: false,
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
					chrome.scripting.executeScript({
						target: { tabId: tab.id },
						args: [items.commentsHidden],
						function: toggleComments,
					});
					chrome.scripting.executeScript({
						target: { tabId: tab.id },
						args: [items.relatedHidden],
						function: toggleRelated,
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
	const commentsChecked =
		document.getElementById("toggleCommentsBtn").checked;
	const relatedChecked = document.getElementById("toggleRelatedBtn").checked;

	const allOn =
		shortsChecked &&
		playablesChecked &&
		newsChecked &&
		commentsChecked &&
		relatedChecked;
	const allOff =
		!shortsChecked &&
		!playablesChecked &&
		!newsChecked &&
		!commentsChecked &&
		!relatedChecked;

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
