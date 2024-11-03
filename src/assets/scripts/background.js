chrome.runtime.onConnect.addListener((port) => {
    const CHROME_CONNECTION = "angularConnection";
    const PORT_EVENT = "getCurrentHTML";

    if (port.name === CHROME_CONNECTION) {
        port.onMessage.addListener((msg) => {
            if (msg.request === PORT_EVENT) {
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
