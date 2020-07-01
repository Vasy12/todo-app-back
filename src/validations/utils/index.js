
module.exports.actionsRequired = actions => (
    action, schema) => actions.includes(action) ? schema.required() : schema;
