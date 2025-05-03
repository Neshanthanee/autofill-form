// Initialize default data
const DEFAULT_DATA = {
  personalInfo: {
    fullName: "Neshanthanee",
    preferredName: "Nesha",
    gender: "female",
    driverLicense: "98765432", // TX format
    occupation: "Graduate Student",
    phone: ["8146784356"],
    address: "1/133a east street navalpattu",
    city: "trichy",
    country: "india",
    zipcode: "620016",
    dob: "2006-06-22",
    emails: ["neshanthanee@gmail.com"]
  }
};

// Message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'initializeDefaultData') {
    chrome.storage.local.get('personalInfo')
      .then(({ personalInfo }) => {
        if (!personalInfo) {
          return chrome.storage.local.set({ personalInfo: DEFAULT_DATA.personalInfo })
            .then(() => {
              console.log('Personal info initialized with default data:', DEFAULT_DATA.personalInfo);
              sendResponse({ success: true });
            });
        }
        console.log('Using existing personal info from storage:', personalInfo);
        sendResponse({ success: true });
      })
      .catch(error => {
        console.error('Error handling personal info:', error);
        sendResponse({ success: false, error });
      });
    return true;
  }

  if (request.action === 'getDefaultData') {
    sendResponse(DEFAULT_DATA);
    return true;
  }
});

// Optional: Add listener for extension icon click
chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.set({ personalInfo: DEFAULT_DATA.personalInfo })
    .then(() => {
      console.log('Personal info updated on extension click');
    })
    .catch(error => {
      console.error('Error updating personal info:', error);
    });
});