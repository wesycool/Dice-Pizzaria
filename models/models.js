const orm = require('../config/orm')

const models = {
    selectAll: (table) => {return orm.selectAll(table)},
    getByParams: (table,field,params) => {return orm.getByParams(table,{[field]:params})}, 
    getJoinAll: () => { return orm.selectJoin("order_info", "products", "order_info.product_id", "products.id") }, //Join Table

    updateByParams: (table,set_field,set_params,where_field,where_params) => {
        return orm.updateByParams(table, {[set_field]:set_params}, {[where_field]:where_params} )},

    updateStatus: (id, status) => {return orm.updateOne("status", status, id) },


    insertByParams: (table,params) => {return orm.insertByParams(table, Object.values(params))},

    deleteByParams: (table,params) => {
        const keys = Object.keys(params)
        const values = Object.values(params)
        orm.deleteByParams(table, {[keys[0]]:values[0]}, {[keys[1]]:values[1]} )
    },

    
    addNow: (table, items) => {
        console.log(">> crashersAddNow - table", table)
        console.log(">> crashersAddNow - items", items)
    
        return orm.insertDB(table, items)
    }
    
}




module.exports = models