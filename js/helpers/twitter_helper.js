var Storage = function() {
  this.read = "4ac5n2Xnbx3cPE5VyZe43MM3J";
  this.only = "Bv9it3qoI6I6TSzp5jcHPI8HZVDwt1HMrfW55eCCZUZydeB4Q4";
};

var cb = new Codebird;
var twcb = new Storage;
cb.setConsumerKey(twcb.read, twcb.only);

cb.__call(
  "oauth2_token",
  {},
  function (reply) {
    var bearer_token = reply.access_token;
  }
);