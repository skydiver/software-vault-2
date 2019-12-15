import { toast } from 'react-semantic-toasts';

export default {

  recordSaved() {
    toast({
      description: 'Record has been saved successfully!',
      type: 'success',
      icon: 'save outline',
      time: 2000
    });
  },

  recordDeleted() {
    toast({
      description: 'Record has been deleted successfully!',
      type: 'success',
      icon: 'trash alternate outline',
      time: 2000
    });
  },

  unsavedChanges() {
    toast({
      description: 'You have unsaved changes. Save or cancel before continue.',
      type: 'warning',
      icon: 'warning sign',
      time: 2000
    });
  }

};