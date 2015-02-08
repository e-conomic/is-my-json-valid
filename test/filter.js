var tape = require('tape')
var validator = require('../')

tape('not passing filter to schema compiler', function (t) {
  var schema = {
    required: true,
    type: 'object',
    properties: {
      hello: {type: 'string', required: true}
    },
    additionalProperties: false
  }

  var validate = validator(schema, {filter: true})
  var doc = {hello: 'world', notInSchema: true}

  t.notOk(validate(doc))
  t.deepEqual(doc, {hello: 'world', notInSchema: true}, 'leave property not in schema')
  t.end()
})

tape('simple filter', function (t) {
  var schema = {
    required: true,
    type: 'object',
    properties: {
      hello: {type: 'string', required: true}
    },
    additionalProperties: false
  }

  var validate = validator(schema, {filter: true})
  var doc = {hello: 'world', removeThis: true}

  t.ok(validate(doc, {filter: true}))
  t.deepEqual(doc, {hello: 'world'}, 'remove property not in schema')
  t.end()
})

tape('allOf filter - second schema matching', function (t) {
  var schema = {
    allOf: [
      {
        required: true,
        type: 'object',
        properties: {
          hello: {type: 'string', required: true}
        },
        additionalProperties: false
      },
      {
        required: true,
        type: 'object',
        properties: {
          hello: {type: 'string', required: true},
          hello2: {type: 'string'}
        },
        additionalProperties: false
      }
    ]
  }

  var validate = validator(schema, {filter: true})
  var doc = {hello: 'world', hello2: 'world2'}

  t.ok(validate(doc, {filter: true}))
  t.deepEqual(doc, {hello: 'world'}, 'should remove property')
  t.end()
})

tape('oneOf filter - second schema matching', function (t) {
  var schema = {
    oneOf: [
      {
        required: true,
        type: 'object',
        properties: {
          hello: {type: 'string', required: true}
        },
        additionalProperties: false
      },
      {
        required: true,
        type: 'object',
        properties: {
          hello: {type: 'string', required: true},
          hello2: {type: 'string', required: true}
        },
        additionalProperties: false
      }
    ]
  }

  var validate = validator(schema, {filter: true})
  var doc = {hello: 'world', hello2: 'world2'}


  t.ok(validate(doc, {filter: true}))
  t.deepEqual(doc, {hello: 'world', hello2: 'world2'}, 'should not remove property in the oneOf schema that matches')
  t.end()
})

tape('oneOf filter - first schema matching', function (t) {
  var schema = {
    oneOf: [
      {
        required: true,
        type: 'object',
        properties: {
          hello: {type: 'string', required: true},
          hello2: {type: 'string', required: true}
        },
        additionalProperties: false
      },
      {
        required: true,
        type: 'object',
        properties: {
          hello: {type: 'string', required: true}
        },
        additionalProperties: false
      }
    ]
  }

  var validate = validator(schema, {filter: true})
  var doc = {hello: 'world', hello2: 'world2'}

  t.ok(validate(doc, {filter: true}))
  t.deepEqual(doc, {hello: 'world', hello2: 'world2'}, 'should not remove property in the oneOf schema that matches')
  t.end()
})

tape('oneOf filter - no schema matching', function (t) {
  var schema = {
    oneOf: [
      {
        required: true,
        type: 'object',
        properties: {
          hello2: {type: 'string', required: true}
        },
        additionalProperties: false
      },
      {
        required: true,
        type: 'object',
        properties: {
          hello: {type: 'string', required: true}
        },
        additionalProperties: false
      }
    ]
  }

  var validate = validator(schema, {filter: true})
  var doc = {hello: 'world', hello2: 'world2'}

  t.notOk(validate(doc, {filter: true}))
  t.deepEqual(doc, {hello: 'world', hello2: 'world2'}, 'should not remove property in the oneOf schema that matches')
  t.end()
})

tape('anyOf filter - second schema matching', function (t) {
  var schema = {
    oneOf: [
      {
        required: true,
        type: 'object',
        properties: {
          hello: {type: 'string', required: true}
        },
        additionalProperties: false
      },
      {
        required: true,
        type: 'object',
        properties: {
          hello: {type: 'string', required: true},
          hello2: {type: 'string', required: true}
        },
        additionalProperties: false
      }
    ]
  }

  var validate = validator(schema, {filter: true})
  var doc = {hello: 'world', hello2: 'world2'}

  t.ok(validate(doc, {filter: true}))
  t.deepEqual(doc, {hello: 'world', hello2: 'world2'}, 'should not remove property in the anyOf schema that matches')
  t.end()
})


tape('anyOf filter - first schema matching', function (t) {
  var schema = {
    oneOf: [
      {
        required: true,
        type: 'object',
        properties: {
          hello: {type: 'string', required: true},
          hello2: {type: 'string', required: true}
        },
        additionalProperties: false
      },
      {
        required: true,
        type: 'object',
        properties: {
          hello: {type: 'string', required: true}
        },
        additionalProperties: false
      }]
  }

  var validate = validator(schema, {filter: true})
  var doc = {hello: 'world', hello2: 'world2'}

  t.ok(validate(doc, {filter: true}))
  t.deepEqual(doc, {hello: 'world', hello2: 'world2'}, 'should not remove property in the anyOf schema that matches')
  t.end()
})

tape('anyOf filter - no schema matching', function (t) {
  var schema = {
    oneOf: [
      {
        required: true,
        type: 'object',
        properties: {
          hello2: {type: 'string', required: true}
        },
        additionalProperties: false
      },
      {
        required: true,
        type: 'object',
        properties: {
          hello: {type: 'string', required: true}
        },
        additionalProperties: false
      }]
  }

  var validate = validator(schema, {filter: true})
  var doc = {hello: 'world', hello2: 'world2'}

  t.notOk(validate(doc, {filter: true}))
  t.deepEqual(doc, {hello: 'world', hello2: 'world2'}, 'should not remove property in the anyOf schema that matches')
  t.end()
})
