var Q = require('q');
var path = require('path');

var repofs = require('../');
var GitHubLocal = require('../lib/drivers/github');

describe('GitHub Driver', function() {
    var fs = repofs(GitHubLocal, {
        repository: 'GitbookIO/gitbook'
    });

    describe('fs.stat', function() {
        it('should correctly return info for a file', function() {
            return fs.stat('README.md')
            .then(function(file) {
                file.type.should.equal('file');
                file.name.should.equal('README.md');
                file.path.should.equal('README.md');
            });
        });
    });

    describe('fs.read', function() {
        it('should correctly read from master', function() {
            return fs.read('README.md').should.be.fulfilled;
        });

        it('should fail for non-existant file', function() {
            return fs.read('error-repofs.js').should.be.rejected;
        });
    });
});
