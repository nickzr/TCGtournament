/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tournaments              ->  index
 * POST    /api/tournaments              ->  create
 * GET     /api/tournaments/:id          ->  show
 * PUT     /api/tournaments/:id          ->  update
 * DELETE  /api/tournaments/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Tournament from './tournaments.model';

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
    var updated = _.assign(entity, updates);
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

// Gets a list of Tournaments
export function index(req, res) {
  Tournament.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Tournament from the DB
export function show(req, res) {
  Tournament.findById(req.params.id).populate('owner', 'name email')
    .execAsync()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Tournament in the DB
export function create(req, res) {
  Tournament.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Tournament in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Tournament.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Tournament from the DB
export function destroy(req, res) {
  return Tournament.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
