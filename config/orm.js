const db = require( './connection.js' )

const orm = {
    // SELECT FUNCTIONS
    selectAll: (tableInput) => { return db.query("SELECT * FROM ??", tableInput) }, // select all from a table
    getByParams: (tableInput, params) => { return  db.query("SELECT * FROM ?? WHERE ?", [tableInput,params])}, // select all from a table filter by id
    selectJoin:(tableOne, tableTwo, matchOne, matchTwo) => { return  db.query('SELECT * FROM ?? LEFT JOIN ?? ON ?? = ??', [ tableOne, tableTwo, matchOne, matchTwo ] )}, // select join

    // UPDATE FUNCTIONS
    updateByParams: (tableInput, set, where) => { return db.query( 'UPDATE ?? SET ? WHERE ?',[tableInput, set, where]) },
    updateBy2Params: (tableInput, set, where1, where2) => { return db.query( 'UPDATE ?? SET ? WHERE ? AND ?',[tableInput, set, where1, where2]) },
    updateOne: (field, value, id ) => { return db.query( 'UPDATE transactions SET ? WHERE id=?', [ {[field]: value}, id ] )}, // update an entry based on ID

    // INSERT FUNCTIONS
    insertByParams: (tableInput,values) => {return db.query('INSERT INTO ?? VALUES(0, ?, DEFAULT)',[tableInput, values])},
    insertDB: (table, values) => { return db.query( "INSERT INTO ?? SET ? ", [table, values] )}, //

    // DELETE FUNCTIONS
    deleteByParams:(table, params1,params2) => { return db.query("DELETE FROM ?? WHERE ? AND ? ;", [table,params1,params2])}
}

module.exports = orm
