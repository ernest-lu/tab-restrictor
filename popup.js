document.addEventListener('DOMContentLoaded', () => {
    const tabLimitInput = document.getElementById('tabLimit');
    const saveButton = document.getElementById('saveButton');
    const statusText = document.getElementById('status');
  
    // Load saved tab limit
    browser.storage.sync.get('maxTabs').then((data) => {
      tabLimitInput.value = data.maxTabs || 20;
    });
  
    // Save tab limit
    saveButton.addEventListener('click', () => {
      const maxTabs = parseInt(tabLimitInput.value, 10);
      
      if (maxTabs > 0 && maxTabs <= 50) {
        browser.storage.sync.set({ maxTabs }).then(() => {
          statusText.textContent = 'Settings saved!';
          statusText.style.color = 'green';
          
          // Optional: Send message to background script to update current setting
          browser.runtime.sendMessage({ 
            type: 'updateMaxTabs', 
            maxTabs 
          });
        });
      } else {
        statusText.textContent = 'Please enter a valid number (1-50)';
        statusText.style.color = 'red';
      }
    });
  });