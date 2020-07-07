const db = require( './connection.js' )

// select all from a table
function selectAll(table) {
    return db.query('SELECT * FROM ??', table)
}

// update an entry based on ID
function updateOne( id, field, value ) {
    return db.query( 'UPDATE transactions SET ? WHERE id=?', 
        [ { [field]: value }, id ] )
}

// select join
function selectJoin(tableOne, tableTwo, matchOne, matchTwo) {
    return  db.query('SELECT * FROM ?? LEFT JOIN ?? ON ?? = ??',
        [ tableOne, tableTwo, matchOne, matchTwo ] )
}

// 
function insertDB( table, values) {
    return db.query( "INSERT INTO ?? SET ? ", 
        [table, values] )
}

module.exports = { selectAll, selectJoin, updateOne, insertDB }