let MAX_TABS = 20;

// Listen for messages from popup to update max tabs
browser.runtime.onMessage.addListener((message) => {
  if (message.type === 'updateMaxTabs') {
    MAX_TABS = message.maxTabs;
  }
});

// Load saved max tabs on startup
browser.storage.sync.get('maxTabs').then((data) => {
  MAX_TABS = data.maxTabs || 20;
});

browser.tabs.onCreated.addListener((tab) => {
  browser.tabs.query({currentWindow: true}).then((tabs) => {
    if (tabs.length > MAX_TABS) {
      browser.tabs.remove(tab.id);
    }
  });
});