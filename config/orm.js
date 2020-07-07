const db = require( './connection.js' )

const orm = {
    // SELECT FUNCTIONS
    selectAll: (tableInput) => { return db.query("SELECT * FROM ??", tableInput) }, // select all from a table
    getByParams: (tableInput, params) => { return  db.query("SELECT * FROM ?? WHERE ?", [tableInput,params])}, // select all from a table filter by id
    selectJoin:(tableOne, tableTwo, matchOne, matchTwo) => { return  db.query('SELECT * FROM ?? LEFT JOIN ?? ON ?? = ??', [ tableOne, tableTwo, matchOne, matchTwo ] )}, // select join
    
    // UPDATE FUNCTIONS
    updateOne: ( field, value, id ) => { return db.query( 'UPDATE transactions SET ? WHERE id=?', [ {[field]: value}, id ] )}, // update an entry based on ID

    // INSERT FUNCTIONS
    insertDB: ( table, values) => { return db.query( "INSERT INTO ?? SET ? ", [table, values] )} //
}

module.exports = orm