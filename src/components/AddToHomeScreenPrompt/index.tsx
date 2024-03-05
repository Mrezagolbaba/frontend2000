// AddToHomeScreenPrompt.jsx

const AddToHomeScreenPrompt = () => {
    const addToHomeScreen = () => {

    const { deferredPrompt } = window as any;
      if (deferredPrompt) {
        // Show native prompt
        deferredPrompt.prompt();
        // Wait for user choice
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          // Clear the deferredPrompt
          (window as any).deferredPrompt = null;
          // Remove the prompt UI
          const promptContainer = document.querySelector('.prompt-container');
          if (promptContainer) {
            promptContainer.remove();
          }
        });
      }
    };
  
    return (
      <div className="prompt-container">
        <p className="prompt-message">Add this app to your home screen for easy access!</p>
        <button className="prompt-button" onClick={addToHomeScreen}>
          Add to Home Screen
        </button>
      </div>
    );
  };
  
  export default AddToHomeScreenPrompt;
  