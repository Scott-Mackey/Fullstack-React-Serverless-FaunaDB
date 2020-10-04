const { DELETE_LINK } = require('./utils/linkQueries.js');
const sendQuery = require('./utils/sendQuery');
const formattedResponse = require('./utils/formattedResponse');

exports.handler = async(event) => {
    if(event.httpMethod !== 'DELETE') {
        return formattedResponse(405, { error: 'Method not supported' });
    }
    const { _id: id } = JSON.parse(event.body);
    const variables = {id};

    try {
        const {deleteLink: deletedLink} = await sendQuery(DELETE_LINK, variables);

        return formattedResponse(200, deletedLink);
    } catch (error) {
        console.error(error);
        return formattedResponse(500, { error: 'Something went wrong' });
    }
}
