/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Tournament from '../api/tournaments/tournaments.model';

var playerArray = [];
for (var i = 0; i < 50; i++) {
  playerArray.push({
    firstName: 'Jan',
    lastName: 'Terlinden',
    DCI: '123456789',
    email: 'jan@gmail.com'
  })
}

Tournament.find({}).removeAsync()
  .then(() => {
    Tournament.create({
      title: 'Sealed Tournament - 10',
      date: '07.05.2016',
      format: 'Standard',
      edition: 'Current',
      rel: 'Competitive',
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
      players: playerArray
    });

    var tournamentArray = [];
    for (var i = 11; i < 51; i++) {
      tournamentArray.push({
        title: 'Sealed Tournament - ' + i,
        date: '07.05.2016',
        format: 'Sealed',
        edition: 'Current',
        rel: 'Competitive',
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
          email: 'jan@gmail.com'
        }, {
          firstName: 'Nikolaj',
          lastName: 'Kielstrup Rasmussen',
          DCI: '123456789',
          email: 'nick@gmail.com'
        }, {
          firstName: 'Rimon',
          lastName: 'Bassem Hanna Issa',
          DCI: '123456789',
          email: 'rimon@gmail.com'
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
