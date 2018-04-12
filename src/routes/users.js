const URL = 'https://kodaktor.ru/j/users';
const { get } = require('axios');
const User = require('./../db');
// curl -s -i -H 'Content-Type: application/json' 'localhost:4321/users' -d '{"login":"student"}'
// curl -X DELETE -i -H 'Content-Type: application/json' 'localhost:4321/users' -d '{"login":"putin"}'
// curl -X PUT -i -H 'Content-Type: application/json' 'localhost:4321/users' -d '{"login":"putin", "password":"loh"}'
module.exports = (x) => {
	const rtr = x.Router();

	rtr
		.route('/')

		.get(async r => {
			const  items = await User.find();
			r.res.render('list', { title: 'Список логинов из БД', items });
		})

		.post(async r => {
			const item = await User.findOne({"login": r.body.login});
			r.res.send(item.login + ': ' + item.password + '\n');
		})

		.delete(async r => {
			let login = r.body.login;
			
			await User.deleteOne({login});

			r.res.send('DEL!\n');
		})

		.put(async r => {
			let password = r.body.password;
			let login = r.body.login;
			let xuser = new User({login, password});
			
			await xuser.save();

			r.res.send('YOU ARE PUT IN!\n');
		});

	return rtr;
}