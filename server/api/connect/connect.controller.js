/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/connects              ->  index
 * POST    /api/connects              ->  create
 * GET     /api/connects/:id          ->  show
 * PUT     /api/connects/:id          ->  update
 * DELETE  /api/connects/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Connect from './connect.model';
import YeelightBlue from 'yeelight-blue'

// var async = require('async');
// var noble = require('noble');
//
//
//
// noble.on('stateChange', function(state) {
//   if (state === 'poweredOn')
//     noble.startScanning([], true);
//   else
//     noble.stopScanning();
// });
//
// noble.on('discover', peripheral => {
//   console.info(peripheral);
//   peripheral.connect(err => {
//     if (err) return err;
//     console.info(Utf8ArrayToStr(peripheral.advertisement.manufacturerData));
//     peripheral.discoverAllServicesAndCharacteristics((error, services, characteristics) => {
//       if (error) return error;
//       console.info(services)
//       console.info(characteristics)
//     })
//   })
// });

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Connect to Yeelight
export function index(req, res) {
  console.info('discovering yeelight...')

  YeelightBlue.discover( yeelightBlue => {
    console.info('yeelight found, trying to connect...')
    var red        = 255; // 0 - 255
    var green      = 0; // 0 - 255
    var blue       = 0; // 0 - 255
    var brightness = 100; // 0 - 100

    yeelightBlue.connectAndSetUp(err => {
      if (err) return console.error(err);
      console.info('connect successful!')
      yeelightBlue.setColorAndBrightness(red, green, blue, brightness, (err) => {
        if (err) console.error(err);
        console.info(`color changed to: red: ${red} green: ${green} blue: ${blue} with brightness: ${brightness}`)
      });
    })
    yeelightBlue.on('stateChange',function(){
      console.info('connect successful!')
    })
    yeelightBlue.on('connected',function(){
      console.info('connect successful!')
    })
  });

}

// Gets a single Connect from the DB
export function show(req, res) {
  return Connect.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Connect in the DB
export function create(req, res) {
  return Connect.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Connect in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Connect.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Connect from the DB
export function destroy(req, res) {
  return Connect.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
