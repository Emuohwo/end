// import moment from 'moment';
import uuid from 'uuid';

class Office {
  /**
     * class constructor
     * @param {object} data
     */
  constructor() {
    this.offices = [];
  }

  /**
     *
     * @returns {object} office object
     */
  create(data) {
    const newOffice = {
      id: uuid.v4(),
      type: data.type || '',
      name: data.name || '',
    };
    this.offices.push(newOffice);
    return newOffice;
  }

  /**
     *
     * @param {uuid} id
     * @returns {object} office object
     */
  findOne(id) {
    return this.offices.find(off => off.id === id);
  }

  /**
     * @returs {object} return all offices
     */
  findAll() {
    return this.offices;
  }

  /**
     *
     * @param {uuid} id
     * @param {object} data
     */
  update(id, data) {
    const office = this.findOne(id);
    const index = this.offices.indexOf(office);
    this.offices[index].type = data.type || office.type;
    this.offices[index].name = data.name || office.name;
    return this.offices[index];
  }

  /**
     *
     * @param {uuid} id
     */
  delete(id) {
    const office = this.findOne(id);
    const index = this.offices.indexOf(office);
    this.offices.splice(index, 1);
    return {};
  }
}

export default new Office();
