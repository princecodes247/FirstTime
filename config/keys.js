//OFFLINE USE
dbPassword = process.env.DB_KEY || "mongodb://127.0.0.1/firsttime";

module.exports = {
  mongoURI: dbPassword,
};

//+ encodeURIComponent('YOUR_PASSWORD_HERE') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true'
