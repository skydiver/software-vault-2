import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

// import ElectronStore from '../lib/electron-store';
import toasts from '../lib/toasts';
import storeOptions from './options-store.json';

const StoreContext = React.createContext();

class StoreProvider extends Component {
  constructor(props) {
    super(props);

    this.config = null;

    this.defaultForm = {
      name: '',
      web: '',
      store: '',
      purchasedDate: null,
      licensedTo: '',
      licenseKey: '',
      icon: null,
    };

    this.state = {
      records: [],
      activeRecord: null,
      form: this.defaultForm,
      formVisible: false,
      formUnsaved: false,
      storeOptions,
    };
  }

  componentDidMount = () => {
    this.config = window.STORE;
    const records = this.getRecords();
    this.setState({ records });
  };

  /**
   * Clear form state (aka create new record)
   *
   * @returns {undefined}
   */
  clearForm = () => {
    if (this.state.formUnsaved) {
      toasts.unsavedChanges();
      return false;
    }
    this.setState({
      activeRecord: null,
      form: this.defaultForm,
      formVisible: true,
      formUnsaved: false,
    });
    return true;
  };

  /**
   * Hide form (aka Cancel button)
   *
   * @returns {undefined}
   */
  cancelForm = () => {
    this.setState({
      activeRecord: null,
      form: this.defaultForm,
      formVisible: false,
      formUnsaved: false,
    });
  };

  /**
   * Return records from store
   *
   * @returns {undefined}
   */
  getRecords = () => {
    const records = this.config.read('keys');
    if (records && records.length > 0) {
      records.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
      return records;
    }
    return [];
  };

  /**
   * Search records from store
   *
   * @param {string} searchString String to search
   * @returns {undefined}
   */
  searchRecords = searchString => {
    const string = searchString.toLowerCase();
    const records = this.getRecords();
    const result = records.filter(
      obj => obj.name.toLowerCase().indexOf(string) > -1
    );
    this.setState({ records: result });
  };

  /**
   * Get specific record
   *
   * @param {string} recordId Record ID
   * @returns {undefined}
   */
  getRecord = recordId =>
    this.state.records.find(record => record.id === recordId);

  /**
   * Load selected record on form
   *
   * @param {string} recordId Record ID
   * @returns {undefined}
   */
  setActiveRecord = recordId => {
    if (this.state.activeRecord === recordId) {
      return false;
    }

    if (this.state.formUnsaved) {
      toasts.unsavedChanges();
      return false;
    }

    const activeRecord = this.getRecord(recordId);
    this.setState(() => ({
      activeRecord: recordId,
      form: { ...activeRecord },
      formVisible: true,
      formUnsaved: false,
    }));
    return true;
  };

  /**
   * Save record on store
   *
   * @returns {undefined}
   */
  saveRecord = () => {
    const recordId = this.state.activeRecord || uuidv4();
    const keys = this.config.read('keys') || [];
    const position = keys.map(e => e.id).indexOf(recordId);
    const save = { id: recordId, ...this.state.form };
    if (position >= 0) {
      keys[position] = save;
    } else {
      keys.push(save);
    }
    this.config.store('keys', keys);
    const records = this.getRecords();
    this.setState(
      {
        records,
        formUnsaved: false,
      },
      () => {
        this.setActiveRecord(recordId);
      }
    );
  };

  /**
   * Delete record from store
   *
   * @returns {undefined}
   */
  deleteRecord = () => {
    const recordId = this.state.activeRecord;
    const keys = this.config.read('keys');
    const position = keys.map(e => e.id).indexOf(recordId);
    if (position >= 0) {
      keys.splice(position, 1);
      this.config.store('keys', keys);
      const records = this.getRecords();
      this.setState({ records }, () => {
        this.cancelForm();
      });
    }
  };

  /**
   * Handle form fields changes
   *
   * @param {object} e JavaScript event
   * @returns {undefined}
   */
  handleFormChange = (e, { name, value }) => {
    this.setState(state => ({
      form: {
        ...state.form,
        [name]: value,
      },
      formUnsaved: true,
    }));
  };

  /**
   * Handle date picker changes
   *
   * @param {object} dateSelected JavaScript event
   * @returns {undefined}
   */
  handleDateChange = (e, datepickerObject) => {
    const dateSelected = datepickerObject.value;
    if (
      dateSelected === null ||
      this.state.form.purchasedDate === dateSelected.toISOString()
    ) {
      return false;
    }
    this.setState(state => ({
      form: {
        ...state.form,
        purchasedDate: dateSelected,
      },
      formUnsaved: true,
    }));
    return true;
  };

  /**
   * Handle icon changes
   *
   * @param {string} icon Icon local path
   * @returns {undefined}
   */
  handleIconChange = icon => {
    this.setState(state => ({
      form: {
        ...state.form,
        icon,
      },
      formUnsaved: true,
    }));
  };

  render() {
    return (
      <StoreContext.Provider
        value={{
          state: this.state,
          searchRecords: this.searchRecords,
          setActiveRecord: this.setActiveRecord,
          saveRecord: this.saveRecord,
          deleteRecord: this.deleteRecord,
          handleFormChange: this.handleFormChange,
          handleDateChange: this.handleDateChange,
          handleIconChange: this.handleIconChange,
          clearForm: this.clearForm,
          cancelForm: this.cancelForm,
        }}
      >
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

StoreProvider.propTypes = {
  children: PropTypes.array.isRequired,
};

const StoreConsumer = StoreContext.Consumer;

export default StoreProvider;
export { StoreConsumer };
