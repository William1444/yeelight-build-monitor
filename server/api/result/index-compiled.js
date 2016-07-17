'use strict';

var express = require('express');
var controller = require('./result.controller');

var router = express.Router();

router.get('/', controller.log, controller.index);
router.get('/:id', controller.log, controller.show);
router.post('/', controller.log, controller.create);
router.put('/:id', controller.log, controller.update);
router.patch('/:id', controller.log, controller.update);
router.delete('/:id', controller.log, controller.destroy);

module.exports = router;

//# sourceMappingURL=index-compiled.js.map