/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Tournament from '../api/tournaments/tournaments.model';

Tournament.find({}).removeAsync()
  .then(() => {
    Tournament.create({
      title: 'Sealed Tournament',
      date: '07.05.2016',
      format: 'Sealed',
      edition: 'Current Edition',
      rel: 'competitive',
      location: 'Jugendhaus EXXE in Flensburg',
      entryTime: 'At 9 PM',
      startTime: '10 PM',
      price: '25 Euro',
      info: 'This is a non-profit tournament!' +
      ' Dafür bekommt ihr 6 Booster für das Event im Swissformat und habt die Chance auf reichlich Boosterpreise.' +
      ' Nach spielerangepasster Rundenzahl werden die Preise gemäß der Finalstandings verteilt.' +
      ' Anschließend folgt der Cut auf die Top 8 und ein Draft, in dem das Bye für den RPTQ im KO System ausgespielt.',
      players: [{
        firstName: 'Jan',
        lastName: 'Terlinden',
        DCI: '123456789',
        email: 'janterlinden@gmx.de'
      }, {
        firstName: 'Marc',
        lastName: 'Petersen',
        DCI: '123456789',
        email: 'mep@gmx.de'
      }],
      active: Boolean
    });
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
