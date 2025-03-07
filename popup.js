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
	//TODO: Implement title search to make sure we are toggling Shorts
	const HOME_CONTAINER = "ytd-rich-section-renderer";

	const allVisibleContainers = document.querySelectorAll(HOME_CONTAINER);

	console.log(allShortsAndPlayables);

	allVisibleContainers.forEach((section) => {
		section.style.display =
			section.style.display === "none" ? "block" : "none";
	});
}

function togglePlayables() {
	//TODO: Implement title search to make sure we are toggling Playables
	const HOME_CONTAINER = "ytd-rich-section-renderer";

	const allVisibleContainers = document.querySelectorAll(HOME_CONTAINER);

	console.log(allShortsAndPlayables);

	allVisibleContainers.forEach((section) => {
		section.style.display =
			section.style.display === "none" ? "block" : "none";
	});
}
