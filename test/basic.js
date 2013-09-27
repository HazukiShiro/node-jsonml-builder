var assert = require('assert');

var JsonML = require('../index').JsonML;

describe('JsonML', function(){

  describe('#get', function(){

    var x = new JsonML();
    x.document = [
      'alpha',
      'bravo',
      [
        'charlie',
        [
          'delta',
          'echo'
        ]
      ]
    ];

    it('should return the whole object if no arguments are given', function(done){
      var result = x.get();
      assert.equal(result, x.document);
      done();
    });

    it('should return `undefined` if an unexistent position is requested', function(done){
      assert.equal(typeof x.get(3), 'undefined');

      assert.notEqual(typeof x.get(0), 'undefined');
      assert.notEqual(typeof x.get(1), 'undefined');
      assert.notEqual(typeof x.get(2), 'undefined');

      done();
    });

    it('should work passing arrays as arguments', function(done){
      assert.equal(x.get([0]), 'alpha');
      assert.equal(x.get([1]), 'bravo');
      assert.equal(x.get([2, 0]), 'charlie');
      assert.equal(x.get([2, 1, 0]), 'delta');
      assert.equal(x.get([2, 1, 1]), 'echo');

      assert.equal(x.get([2], [0]), 'charlie');
      assert.equal(x.get([2], [1, 0]), 'delta');
      assert.equal(x.get([2, 1], [1]), 'echo');

      assert.deepEqual(x.get([2,1]), ['delta', 'echo']);
      assert.deepEqual(x.get([2]), ['charlie', ['delta', 'echo']]);

      done();
    });

    it('should work passing numbers as arguments', function(done){
      assert.equal(x.get(0), 'alpha');
      assert.equal(x.get(1), 'bravo');
      assert.equal(x.get(2, 0), 'charlie');
      assert.equal(x.get(2, 1, 0), 'delta');
      assert.equal(x.get(2, 1, 1), 'echo');

      done();
    });

    it('should work with numbers AND arrays as arguments', function(done){
      assert.equal(x.get(2, [0]), 'charlie');
      assert.equal(x.get([2, 1], 0), 'delta');
      assert.equal(x.get(2, [1, 1]), 'echo');

      done();
    });
    
  });
  
  describe('#position', function(){
    
    it('should return the current position of the "cursor"', function(done){
      var x = new JsonML();

      x.path = [];
      x.index = 0;

      assert.deepEqual(x.position(), [0]);
      
      x.path = [4, 8];
      x.index = 15;

      assert.deepEqual(x.position(), [4, 8, 15]);

      x.path = [16, 23, 42];
      x.index = 108;

      assert.deepEqual(x.position(), [16, 23, 42, 108]);

      done();
    });
  });
  
  describe('#open', function(){

    it('should create a new Array at the current position', function(done){
      var x = new JsonML();

      x.open();
      assert.deepEqual(x.path, [0]);
      assert.equal(x.index, 0);
      assert.deepEqual(x.document, [[]]);

      x.open();
      assert.deepEqual(x.path, [0, 0]);
      assert.equal(x.index, 0);
      assert.deepEqual(x.document, [[[]]]);

      x.path = [0];
      x.index = 0;
      x.active = x.document[0];

      x.open();
      assert.deepEqual(x.document[0], [
        [],
        []
      ]);
      assert.deepEqual(x.path, [0, 1]);
      assert.equal(x.index, 0);

      x.document = [
        [
          'alpha',
          'bravo'
        ]
      ];

      x.path = [];
      x.index = 0;
      x.active = x.document;
      x.open();

      assert.equal(x.index, 0);
      assert.deepEqual(x.path, [1]);
      assert.deepEqual(x.active, []);
      assert.deepEqual(x.document, [['alpha', 'bravo'], []]);

      done();
    });
  });

  describe('#close', function(){

    it('should move the cursor to the parent Array', function(done){
      x = new JsonML();

      x.path = [4, 8, 15, 16];
      x.index = 23;

      x.close();

      assert.deepEqual(x.path, [4, 8, 15]);
      assert.equal(x.index, 17);
      assert.equal(typeof x.active, 'undefined');

      x.document = [
        'alpha',
        'bravo',
        [
          'charlie',
          [
            'delta',
            'echo'
          ]
        ]
      ];
      x.path = [2, 1];
      x.index = 0;
      x.active = x.document[2][1];

      x.close();
      assert.equal(x.active, x.document[2]);
      assert.deepEqual(x.path, [2]);
      assert.equal(x.index, 2);

      x.close();
      assert.equal(x.active, x.document);
      assert.deepEqual(x.path, []);
      assert.equal(x.index, 3);

      done();
    });
  });

  describe('#add', function(){

    it('should append the data to the current array and move the cursor next to it', function(done){
      x = new JsonML();

      x.add('3.14');
      assert.deepEqual(x.document, ['3.14']);
      assert.deepEqual(x.path, []);
      assert.equal(x.index, 1);

      x.document = [
        [],
        [
          'ohayo',
          []
        ]
      ];

      x.path = [0];
      x.index = 0;
      x.active = x.document[0];

      x.add('Hello, world!');
      assert.equal(x.document[0][0], 'Hello, world!');
      assert.equal(x.index, 1);

      x.path = [1];
      x.index = 0;
      x.active = x.document[1];
      x.add('gozaimasu');

      assert.deepEqual(x.document[1], ['ohayo', [], 'gozaimasu']);
      assert.equal(x.index, 3);

      x.path = [1, 1];
      x.index = 0;
      x.active = x.document[1][1];
      x.add("What's up, people!");

      assert.equal(x.document[1][1][0], "What's up, people!");
      assert.equal(x.index, 1);

      done();
    });
  });

});
