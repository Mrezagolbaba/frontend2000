// AddToHomeBottomSheet.tsx
import React from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';


interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

const AddToHomeBottomSheet: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const handleAddToHomeScreen = () => {
        const promptEvent = new Event('beforeinstallprompt') as BeforeInstallPromptEvent;
        window.dispatchEvent(promptEvent);
        onClose();
    };

  return (
    <BottomSheet open={isOpen}>
      <div>
        <h3>Do you want to add this app to your home screen?</h3>
        <button onClick={onClose}>Close</button>
        <button onClick={handleAddToHomeScreen}>Add to Home Screen</button>
      </div>
    </BottomSheet>
  );
};

export default AddToHomeBottomSheet;
