const yup = require('yup');
const {ACTION, PASSWORD_RULE} = require('../enums');
const {actionsRequired} = require('./utils');

const UserSchema = yup.object(
    {
        firstName: yup.string()
                      .trim()
                      .when('$action',
                            actionsRequired(
                                [
                                    ACTION.SIGN_UP,
                                    ACTION.CREATE,
                                ])),
        lastName: yup.string()
                     .trim()
                     .when('$action', actionsRequired(
                         [
                             ACTION.SIGN_UP,
                             ACTION.CREATE,
                         ])),
        email: yup.string()
                  .trim()
                  .email()
                  .when('$action', actionsRequired([
                                                       ACTION.SIGN_UP,
                                                       ACTION.LOGIN,
                                                       ACTION.CREATE,
                                                   ])),
        password: yup.string()
                     .matches(PASSWORD_RULE.PATTERN,
                              PASSWORD_RULE.MESSAGE)
                     .when('$action', actionsRequired([
                                                          ACTION.SIGN_UP,
                                                          ACTION.LOGIN,
                                                          ACTION.CREATE,
                                                      ])),
    },
);

module.exports = UserSchema;
