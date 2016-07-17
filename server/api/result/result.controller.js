/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/results              ->  index
 * POST    /api/results              ->  create
 * GET     /api/results/:id          ->  show
 * PUT     /api/results/:id          ->  update
 * DELETE  /api/results/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Result from './result.model';
import YeelightBlue from 'yeelight-blue';

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

export function log(req, res, next) {
  // console.info(req.body)
  next();
}

// Gets a list of Results
export function index(req, res) {
  return Result.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Result from the DB
export function show(req, res) {
  return Result.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Result in the DB if it is failing
export function create(req, res) {
  var jobName = req.body.name;
  var jobStatus = req.body.build && req.body.build.status;
  console.info(req.body.build && req.body.build.status)
  console.info(`job ${jobName} has status ${jobStatus}`);
  Result.findOne({name: jobName}).exec()
    .then(updateResultsArray(res, jobName, jobStatus))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function updateResultsArray(res, jobName, jobStatus){
  return function(entity) {
    if (jobStatus === 'SUCCESS') {
      console.info(entity)
      if (entity) {
        console.info('successful build in the array of failing jobs so removing it')
        return entity.remove();
      } else {
        console.info('no entity found and successful so not needed in the array of failing jobs')
        res.status(200).end();
        return null;
      }
    } else {
      if (entity) {
        console.info('already in the array if failing jobs')
        res.status(200).end();
        return null;
      } else {
        console.info('not in the array of failing jobs so adding it')
        return Result.create({name: jobName})
      }
    }
  }
}

// Updates an existing Result in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Result.find(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Result from the DB
export function destroy(req, res) {
  return Result.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
