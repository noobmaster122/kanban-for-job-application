chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "angularConnection") {
      port.onMessage.addListener((msg) => {
        if (msg.request === "getCurrentHTML") {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
              chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: () => {
                  return {link : document.URL, html: document.documentElement.outerHTML};
                }
              }, (results) => {
                console.error(results);
                port.postMessage(results[0].result);
              });
            }
          });
        } 
      });
    }
  });
  