const yup = require('yup');
const {ACTION} = require('./../../../src/constants.js');
const {actionsRequired} = require('./utils');

const requiredOnCreate = actionsRequired([ACTION.CREATE]);

const TaskSchema = yup.object({
  value: yup.string().trim().when('$action', requiredOnCreate),
  deadline: yup.date().when('$action', requiredOnCreate),
  isDone: yup.boolean.when('$action', requiredOnCreate),
});

module.exports = TaskSchema;
