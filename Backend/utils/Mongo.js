const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://18.224.157.155:27017';
const DBName = "SwoleMate";

export default class Mongo {
    /**
     * An abstraction to the find function
     *
     * @param collection        The collection to search in
     * @param query             The query to execute
     * @param sort              The sort conditions of the resulting query (Optional)
     * @param callback          The callback to be executed after the query. The results are passed in to this.
     */
    static find (collection, query, sort, callback) {
        MongoClient.connect(url, function(err, db) {
            const dbo = db.db(DBName);

            if (err)
                throw err;

            let result = dbo.collection(collection).find();

            if (sort) {
                result = result.sort(sort);
            }

            result.toArray(function(err, result) {
                if (err)
                    throw err;

                db.close();

                callback(result);
            });
        });
    }

    /**
     * An abstraction to the insert function
     *
     * @param collection    The collection to insert your new object into
     * @param object        The object to be inserted
     * @param callback      The function to be executed once the data has been put in the database
     */
    static insert (collection, object, callback) {
        MongoClient.connect(url, function(error, db){
            const dbo = db.db(DBName);

            if (error)
                throw error;

            dbo.collection(collection).insertOne(object, function(err, res){
                if(err)
                    throw err;

                db.close();

                if (callback)
                    callback(res);
            });
        });
    }

    /**
     * An abstraction to the update function
     *
     * @param collection    The collection to update the object in
     * @param query         The query defining what to update
     * @param values        The values that are to be updated
     * @param callback      The function to be executed once the data has been put in the database
     */
    static update (collection, query, values, callback) {
        MongoClient.connect(url, function(error, db){
            const dbo = db.db(DBName);

            //check for connection error
            if(error){
                console.error(error);
                process.exit(1);
            }

            //put methods to modify database here
            dbo.collection(collection).updateOne(query, values, function(err, res) {
                if (err)
                    throw err;

                //close database
                db.close();

                if (callback)
                    callback(res);
            });
        });
    }

    /**
     * An abstraction on the delete function
     * THIS WILL DELETE EVERY MATCH TO THE SPECIFIED QUERY
     * BE VERY CAREFUL
     *
     * @param collection        The collection to delete from
     * @param query             The query to select the object to be deleted
     * @param callback          The function to be executed upon successful deletion
     */
    static delete (collection, query, callback) {
        MongoClient.connect(url, function(err, db) {
            const dbo = db.db(DBName);

            if (err)
                throw err;

            dbo.collection(collection).deleteMany(query, function(err, obj) {
                if (err)
                    throw err;

                db.close();

                if (callback)
                    callback(obj);
            });
        });
    }
}