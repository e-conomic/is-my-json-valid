var tape = require('tape')
var validator = require('../')

tape('simple filter', function(t) {
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

tape('oneOf filter', function(t) {
	var schema = {
		oneOf: [
			{
				required: true,
				type: 'object',
				properties: {
					hello: {type:'string', required:true}
				},
				additionalProperties: false
			},
			{
				required: true,
				type: 'object',
				properties: {
					hello: {type:'string', required:true},
					hello2: {type:'string', required:true}
				},
				additionalProperties: false
			}
		]
	}

	var validate = validator(schema)
	var doc = {hello: 'world', hello2:'world2'}
	validate(doc, {filter:true})

	t.deepEqual(doc, {hello: 'world', hello2:'world2'}, 'should not remove property in the oneOf schema that matches')
	t.end()
})