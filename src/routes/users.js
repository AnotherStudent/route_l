const URL = 'https://kodaktor.ru/j/users';
const { get } = require('axios');
// curl -s -i -H 'Content-Type: application/json' 'localhost:4321/users' -d '{"login":"student"}'
// curl -X "DELETE" localhost:4321/users
module.exports = (x) => {
	const rtr = x.Router();

	rtr
		.route('/')

		.get(async r => {
			const{data: {users: items}} = await get(URL);
			r.res.render('list', {title: 'Login list', items});
		})

		.post(async r => {
			const login = r.body.login;
			const {data: {users: items}} = await get(URL);

			pass = 'login not forund!';
			for(i of items) {
				if(i.login == login)
					pass = i.password;
			}

			r.res.send(login + ": " + pass + '\n');
		})

		.delete(async r => {
			r.res.send('Удаление невозможно!\n');
		})

	return rtr;
}