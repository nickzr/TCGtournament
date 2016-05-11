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
      title: 'Sealed Tournament - 1 - test',
      date: '07.05.2016',
      format: 'Sealed',
      edition: 'Current Edition',
      rel: 'competitive',
      location: 'Jugendhaus EXXE in Flensburg',
      entryTime: '09:00',
      startTime: '10:00',
      price: '25 Euro',
      info: "test This is a non-profit tournament!" +
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nulla dolor," +
        " malesuada et neque nec, laoreet finibus ante. Curabitur consectetur libero volutpat sem egestas," +
        " ec blandit magna ullamcorper. Nam vitae bibendum felis. Donec finibus neque in arcu faucibus," +
        " et placerat justo tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra," +
        " per inceptos himenaeos. Curabitur gravida varius quam, sed iaculis sapien.",
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
      }]
    });

    var tournamentArray = [];
    for (var i = 2; i < 51; i++) {
      tournamentArray.push({
        title: 'Sealed Tournament - ' + i,
        date: '07.05.2016',
        format: 'Sealed',
        edition: 'current Edition',
        rel: 'competitive',
        location: 'Jugendhaus EXXE in Flensburg',
        entryTime: '09:00',
        startTime: '10:00',
        price: '25 Euro',
        info: "This is a non-profit tournament!" +
          " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nulla dolor," +
          " malesuada et neque nec, laoreet finibus ante. Curabitur consectetur libero volutpat sem egestas," +
          " ec blandit magna ullamcorper. Nam vitae bibendum felis. Donec finibus neque in arcu faucibus," +
          " et placerat justo tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra," +
          " per inceptos himenaeos. Curabitur gravida varius quam, sed iaculis sapien.",
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
        }]
      });
    }

    Tournament.createAsync(tournamentArray)
      .then(() => {
        console.log("Tournaments populated.")
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
