const { buildQueryString } = require('./api');

const CLIENT_ID = process.env.CLIENT_ID;

const authorize = async (req, res) => {
    // const redirectUrl = 'http://____/login/vk/complete';
    const params = {
        client_id: CLIENT_ID,
        display: 'page',
        scope: 'groups,wall,friends,offline',
        response_type: 'token',
        // redirect_uri: redirectUrl,
    };
    const url = `https://oauth.vk.com/authorize?${buildQueryString(params)}`;

    res.redirect(url);
}

const onAuthorized = async (req, res) => {
    const accessToken = req.query['access_token'] || '';
    if (!accessToken) {
        console.debug('Cannot authorize no token');
        return res.status(500).send('Cannot authorize no token');
    }

    req.session.accessToken = accessToken;
    res.locals.accessToken = accessToken;

    res.status(200).send('Token applied');
};

module.exports = {
    authorize,
    onAuthorized,
}
