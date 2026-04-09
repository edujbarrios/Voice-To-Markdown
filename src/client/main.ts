import { VoiceController } from './voiceRecognition';
import { updatePreview, saveDocument } from './markdownPreview';

// Initialize voice controller
const voiceController = new VoiceController();

// Expose functions to window for HTML event handlers
declare global {
  interface Window {
    voiceController: VoiceController;
    updatePreview: typeof updatePreview;
    saveDocument: () => void;
  }
}

window.voiceController = voiceController;
window.updatePreview = updatePreview;
window.saveDocument = () =>
  saveDocument(() => voiceController.getCurrentLanguage());
