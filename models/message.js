const datastore = ('../app');

module.exports = {
    addMessage: function(topic, body) {
        const messageKey = datastore.key('Message');
        const entity = {
            key: messageKey,
            data: [{
                name: 'date',
                value: new Date(),
            },
            {
                name: 'topic',
                value: topic,
            },
            {
                name: 'body',
                value: body
            }]
        };
        
        datastore.save(entity).then(() => {
            console.log(`Message ${messageKey.id} created successfully.`);
        }).catch( err => {
            console.error('ERROR: ', err);
        });
    },

    getTasks: function() {
        const query = datastore.createQuery('Message').order('created');

        datastore.runQuery(query).then(results => {
            const message = results[0];
            console.log(message[0]);
        }).catch(err => {
            console.error('ERROR: ', err);
        })
    }
}
