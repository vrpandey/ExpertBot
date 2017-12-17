var chai = require("chai");
var expect = chai.expect;
var nock = require("nock");



// Load mock data

var git = require("../main/git.js");
var gitMock = require("../test/Mocks/gitMocks.json");
//var getGitIssuesJson = require("../test/Mocks/getIssuesMock.json");

///////////////////////////
// TEST SUITE FOR MOCHA
///////////////////////////

var gitMock = require("../test/Mocks/gitMocks.json");


  var mockService = nock("https://github.ncsu.edu/api/v3")
  .persist()
  .get("/repos/vdatla/LibraryRoomBooking/issues")
  .reply(200, JSON.stringify(gitMock.getIssues));

describe('testMain', function(){

  //MOCK SERVICE
  var mockService = nock("https://github.ncsu.edu/api/v3")
  .persist()
  .get("/users/vdatla")
  .reply(200, JSON.stringify(gitMock.getIssues));

  describe('Dummy test that should always pass', function(){


    it('This one should pass aswell ', function() {

      return git.getEmail('vdatla').then(function (results) 
      {
        expect(results).to.equal('vdatla_temp@ncsu.edu');

      });
    });
  });

});
