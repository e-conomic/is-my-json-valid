var tape = require('tape')
var validator = require('../')

tape('simple', function(t) {
  var schema = {
    required: true,
    type: 'object',
    properties: {
      hello: {type:'string', required:true}
    },
	additionalProperties: false
  }

  var validate = validator(schema)
  var doc = {hello: 'world', removeThis:true}
  validate(doc, {filter:true})

  t.deepEqual(doc, {hello: 'world'}, 'remove property not in schema')
  t.end()
})