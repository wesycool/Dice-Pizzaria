const orm = require('../config/orm')

function getTable(tableName) {
    return orm.selectAll(tableName)
}

function updateStatus (id, status) {
    return orm.updateOne( id, "status", status)
}

// SELECT transaction_id, product_id, description, size, quantity FROM order_info o LEFT JOIN products p ON o.product_id = p.id;
async function getPrdTrans (transactionNum) {
    const transNum =  await orm.selectJoin("order_info", "products", "order_info.product_id", "products.id")
    // console.log(transNum)
    return transNum.filter(products => products.transaction_id == transactionNum)
}

async function getAllTrans () {
    return await orm.selectJoin("order_info", "products", "order_info.product_id", "products.id")
    // console.log(transNum)
}

module.exports = { getTable, updateStatus, getPrdTrans, getAllTrans }