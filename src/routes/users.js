const URL = 'https://kodaktor.ru/j/users';
const { get } = require('axios');
const User = require('./../db');
// curl -s -i -H 'Content-Type: application/json' 'localhost:4321/users' -d '{"login":"student"}'
// curl -X "DELETE" localhost:4321/users
// curl -X PUT 'localhost:4321/users' -d '{"login":"loh", "password":"loh"}'
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
		});

		// .put(async r => {
		// 	User.update(r.body);
		// 	r.res.send('YOU ARE H!\n');
		// });

	return rtr;
}