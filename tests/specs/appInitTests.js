/**
 * seanica

 * User: sbrookes
 * Date: 19/06/13
 * Time: 10:06 AM
 *
 */
define(function(require) {
  var ca = require('ca');
  var app   = require('app');

    describe('sf1 ', function(){
        it('should exist', function(){

            expect(ca.sf1).to.be.ok;
        });
    });


    describe('Application Init ', function(){
    it('should exist', function(){
      //var clientApp = ca.app;
      expect(ca.sf1.app).to.be.ok;
    });
  });
  describe('Application ViewPort Region ', function(){
    it('should exist', function(){

      expect(ca.sf1.app.viewPort).to.be.ok;
    });
  });


});
