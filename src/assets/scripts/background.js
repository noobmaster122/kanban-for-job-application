chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "angularConnection") {
        port.onMessage.addListener((msg) => {
            if (msg.request === "getCurrentHTML") {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    if (tabs[0]?.id && tabs[0]?.url) {
                        chrome.scripting.executeScript(
                            {
                                target: { tabId: tabs[0].id },
                                func: () => document.documentElement.outerHTML,
                            },
                            (results) => {
                                if (results && results[0]) {
                                    port.postMessage({ html: results[0].result, url: tabs[0].url });
                                }
                            }
                        );
                    }
                });
            }
        });
    }
});
