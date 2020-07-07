const orm = require('../config/orm')

const models = {
    selectAll: (table) => {return orm.selectAll(table)},
    getByParams: (table,field,params) => {return orm.getByParams(table,{[field]:params})}, 
    getJoinAll: () => { return orm.selectJoin("order_info", "products", "order_info.product_id", "products.id") }, //Join Table





    updateStatus: (id, status) => {return orm.updateOne("status", status, id) },




    addNow: (table, items) => {
        console.log(">> crashersAddNow - table", table)
        console.log(">> crashersAddNow - items", items)
    
        return orm.insertDB(table, items)
    }


    
}




module.exports = models