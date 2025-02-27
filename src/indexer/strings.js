import {handleAction, handleActionAsync} from '../handlers';

const INDEX_TYPE = 'stringIndex';
export default class stringsIndex {
  constructor(args) {
    this.MMKV = args.mmkv;
    this.instanceID = args.instanceID;
    this.options = args;
  }

  async getKeys() {
    return await handleActionAsync(
      global.getIndexMMKV,
      INDEX_TYPE,
      this.instanceID,
    );
  }

hasKey(key) {
    let keys = handleAction(
      global.getIndexMMKV,
      INDEX_TYPE,
      this.instanceID,
    );
    return keys.indexOf(key) > -1;
  }

  async getAll() {
    return new Promise((resolve) => {
      let keys = handleAction(
        global.getIndexMMKV,
        INDEX_TYPE,
        this.instanceID,
      );
      let items = [];
      if (!Array.isArray(keys)) {
        keys = [];
      }
      for (let i = 0; i < keys.length; i++) {
        let item = [];
        item[0] = keys[i];
        item[1] = global.getStringMMKV(keys[i], this.instanceID);
        items.push(item);
      }
      resolve(items);
    });
  }
}
