const { expect } = require('chai');
const { sequelize } = require('../db.js');
const Activity = require('../models/Activity.js')(sequelize);

xdescribe('Activity Model', () => {
  it('It should have the accurate properties', () => {
    const attributes = Activity.attributes;

    expect(attributes).to.have.property('id');
    expect(attributes.id).to.have.property('type').that.equals('INTEGER');
    expect(attributes.id).to.have.property('primaryKey').that.is.true;
    expect(attributes.id).to.have.property('allowNull').that.is.false;
    expect(attributes.id).to.have.property('autoIncrement').that.is.true;

    expect(attributes).to.have.property('name');
    expect(attributes.name).to.have.property('type').that.equals('STRING');
    expect(attributes.name).to.have.property('allowNull').that.is.false;
    expect(attributes.name).to.have.property('unique').that.is.true;

    expect(attributes).to.have.property('type');
    expect(attributes.type).to.have.property('type').that.equals('ENUM');
    expect(attributes.type).to.have.property('values').that.deep.equals(['City', 'Country', 'Beach', 'Forest', 'Mountain']);
    expect(attributes.type).to.have.property('allowNull').that.is.false;

    expect(attributes).to.have.property('description');
    expect(attributes.description).to.have.property('type').that.equals('STRING');
    expect(attributes.description).to.have.property('allowNull').that.is.false;

    expect(attributes).to.have.property('difficulty');
    expect(attributes.difficulty).to.have.property('type').that.equals('INTEGER');
    expect(attributes.difficulty).to.have.property('allowNull').that.is.false;

    expect(attributes).to.have.property('duration');
    expect(attributes.duration).to.have.property('type').that.equals('TIME');
    expect(attributes.duration).to.have.property('allowNull').that.is.false;

    expect(attributes).to.have.property('season');
    expect(attributes.season).to.have.property('type').that.equals('ENUM');
    expect(attributes.season).to.have.property('values').that.deep.equals(['Winter', 'Spring', 'Summer', 'Autumn']);
    expect(attributes.season).to.have.property('allowNull').that.is.false;

    expect(attributes).to.have.property('createdInDb');
    expect(attributes.createdInDb).to.have.property('type').that.equals('BOOLEAN');
    expect(attributes.createdInDb).to.have.property('allowNull').that.is.false;
    expect(attributes.createdInDb).to.have.property('defaultValue').that.is.true;
  });
});