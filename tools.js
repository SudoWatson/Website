function getCurrentUser(req) {
	if (req.user === undefined) {
		return undefined
	}
	return {
		username: req.user.username,
		email: req.user.email
	}
}

module.exports = {getCurrentUser};