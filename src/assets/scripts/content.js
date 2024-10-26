// // Listen for messages from the background or popup scripts
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "getHTML") {
//       // Get the HTML of the entire page
//       const htmlContent = document.documentElement.outerHTML;
//       sendResponse({ html: htmlContent });
//     } 
//     // else if (message.action === "modifyHTML") {
//     //   // Example: Modify the page's title
//     //   document.title = message.newTitle || "Modified by Extension";
//     //   sendResponse({ success: true });
//     // }
//   });
  