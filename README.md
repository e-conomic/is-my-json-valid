# is-my-json-valid

A [JSONSchema](http://json-schema.org/) validator that uses code generation
to be extremely fast

```
npm install is-my-json-valid
```

It supports passes the entire JSONSchema v4 test suite except for `remoteRefs` and `maxLength`/`minLength` when using unicode surrogate pairs.

[![build status](http://img.shields.io/travis/mafintosh/is-my-json-valid.svg?style=flat)](http://travis-ci.org/mafintosh/is-my-json-valid)

## Usage

Simply pass a schema to compile it

``` js
var validator = require('is-my-json-valid')

var validate = validator({
  required: true,
  type: 'object',
  properties: {
    hello: {
      required: true,
      type: 'string'
    }
  }
})

console.log('should be valid', validate({hello: 'world'}))
console.log('should not be valid', validate({}))

// get the last list of errors by checking validate.errors
// the following will print [{field: 'data.hello', message: 'is required'}]
console.log(validate.errors)
```

You can also pass the schema as a string

``` js
var validate = validate('{"type": ... }')
```

Optionally you can use the require submodule to load a schema from `__dirname`

``` js
var validator = require('is-my-json-valid/require')
var validate = validator('my-schema.json')
```

## Custom formats

is-my-json-valid supports the formats specified in JSON schema v4 (such as date-time).
If you want to add your own custom formats pass them as the formats options to the validator

``` js
var validate = validator({
  type: 'string',
  required: true,
  format: 'only-a'
}, {
  formats: {
    'only-a': /^a+$/
  }
})

console.log(validate('aa')) // true
console.log(validate('ab')) // false
```

## Filtering away additional properties
is-my-json-valid supports filtering away properties not in the schema
``` js
var validate = validator({
  required: true,
  type: 'object',
  properties: {
    hello: {type: 'string', required: true}
  },
  additionalProperties: false
}, {
  filter: true
})

var doc = {hello: 'world', notInSchema: true}

console.log(validate(doc, {filter:true})) // false
console.log(doc) // {hello: 'world'}
```

## Performance

is-my-json-valid uses code generation to turn your JSON schema into basic javascript code that is easily optimizeable by v8.

At the time of writing, is-my-json-valid is the __fastest validator__ when running

* [json-schema-benchmark](https://github.com/Muscula/json-schema-benchmark)
* [cosmicreals.com benchmark](http://cosmicrealms.com/blog/2014/08/29/benchmark-of-node-dot-js-json-validation-modules-part-3/)
* [jsck benchmark](https://github.com/pandastrike/jsck/issues/72#issuecomment-70992684)
* [themis benchmark](https://cdn.rawgit.com/playlyfe/themis/master/benchmark/results.html)
* [z-schema benchmark](https://rawgit.com/zaggino/z-schema/master/benchmark/results.html)

If you know any other relevant benchmarks open a PR and I'll add them.

## License

MIT
