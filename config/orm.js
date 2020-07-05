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

// SELECT transaction_id, product_id, description, size, quantity FROM order_info o LEFT JOIN products p ON o.product_id = p.id;
function selectJoin(tableOne, tableTwo, matchOne, matchTwo) {
    return  db.query('SELECT * FROM ?? LEFT JOIN ?? ON ?? = ??',
        [ tableOne, tableTwo, matchOne, matchTwo ] )
}

module.exports = { selectAll, selectJoin, updateOne }