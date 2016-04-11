module.exports = {

	'secret': 'ilovecharles',
	'database': 'mongodb://node:node@jello.modulusmongo.net:27017/a6hExuja',
	'facebookAuth':{
        'clientID'      : '1982378175320711', // your App ID
        'clientSecret'  : '7efd322126db55949ade4877ce99e027', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
			},
	'googleAuth' : {

         'clientID'      : '1087199701161-kq37sa9c095g7grlbh66v5m4qn8g7hso.apps.googleusercontent.com',
         'clientSecret'  : '-i_dYSamo4Rde6zRGLARQbpr',
         'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    },
		'emailAuth':{
				'user': 'nodemail12@gmail.com',
				'password': 'nodemailer'
		}
};
