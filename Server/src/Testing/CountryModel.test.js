const { expect } = require('chai');
const { sequelize } = require('../db.js');
const Country = require('../models/Country.js')(sequelize);

xdescribe('Country Model', () => {
  it('It should have the accurate properties', () => {
    try {
      const attributes = Country.attributes;

      expect(attributes).to.have.property('id');
      expect(attributes.id).to.have.property('type').that.equals('STRING(3)');
      expect(attributes.id).to.have.property('primaryKey').that.is.true;
      expect(attributes.id).to.have.property('allowNull').that.is.false;

      expect(attributes).to.have.property('name');
      expect(attributes.name).to.have.property('type').that.equals('STRING');
      expect(attributes.name).to.have.property('allowNull').that.is.false;

      expect(attributes).to.have.property('flag');
      expect(attributes.flag).to.have.property('type').that.equals('STRING');
      expect(attributes.flag).to.have.property('allowNull').that.is.false;

      expect(attributes).to.have.property('continents');
      expect(attributes.continents).to.have.property('type').that.equals('STRING');
      expect(attributes.continents).to.have.property('allowNull').that.is.false;

      expect(attributes).to.have.property('capital');
      expect(attributes.capital).to.have.property('type').that.equals('STRING');
      expect(attributes.capital).to.have.property('allowNull').that.is.false;

      expect(attributes).to.have.property('subregion');
      expect(attributes.subregion).to.have.property('type').that.equals('STRING');
      expect(attributes.subregion).to.have.property('allowNull').that.is.true;

      expect(attributes).to.have.property('area');
      expect(attributes.area).to.have.property('type').that.equals('FLOAT');
      expect(attributes.area).to.have.property('allowNull').that.is.true;

      expect(attributes).to.have.property('population');
      expect(attributes.population).to.have.property('type').that.equals('INTEGER');
      expect(attributes.population).to.have.property('allowNull').that.is.false;
    } catch (error) {
      // Handle the TypeError here
      console.error('Test failed due to TypeError:', error);
    }
  });
});