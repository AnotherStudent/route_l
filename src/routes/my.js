module.exports = (x) => {
	const rtr = x.Router();

	rtr
		.route('/')
		.get(r => r.res.send('my get'))
		.post(r => r.res.send('my post'));
	return rtr;
}