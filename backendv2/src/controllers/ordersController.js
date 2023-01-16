const conn = require('../connection')
exports.addOrder=(req,res)=>{
    const sql = `INSERT INTO orders SET ?`;
    let {
      firstName,
      lastName,
      email,
      orderShipAddress,
      orderCity,
      orderState,
      orderPhone,
      orderZip,
      apartment,
      orderAmount,
      orderTrackingNumber,
      orderCountry,
      paymentMethod,
      orderShipped,
      pickup,
      pickupDate,
      orderQuantity,
      items
    }=req.body
    const ps = {
       firstName,
      lastName,
      email,
      orderShipAddress,
      orderCity,
      orderState,
      orderPhone,
      orderZip,
      apartment,
      orderAmount,
      orderTrackingNumber,
      orderCountry,
      paymentMethod,
      orderShipped,
      pickup,
      pickupDate,
      orderQuantity,
      orderCountry:'sri lanka',
      userID:req.user.id,
      status:'pending'
    }
   
    //console.log(req.body)
    conn.query(sql, ps, (error, result) => {
        if (error)
           res.status(500).json({ message: "Operation failed", error });
        if (result && result.affectedRows >0) {
          //console.log(result,' insert Result');
          const orderDetails ={
            cartId:items[0].cartId,
            items:JSON.stringify(items),
            orderId:result.insertId
          }
          conn.query(`INSERT INTO order_details SET ?`,orderDetails,(error,detailResult)=>{
            if(error) res.status(500).json({ message: "Operation failed", error });
            if(detailResult){
              conn.query(`UPDATE cart SET checkedOut = 1 WHERE id = ${orderDetails.cartId}`,(err,res3)=>{
                  if(err)  res.status(500).json({ message: "Operation failed", error });
                  if(res3){   
                    res.status(200).json({ message: "Order created successfully", res3 });
                  }
              })
           
            }
          })
          
        }
      });
}

exports.fetchOrder=(req,res)=>{
    const sql = `SELECT * FROM orders WHERE id = '${req.params.id}'`;
    conn.query(sql, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Operation failed", error });
      if (result) {
        return res.status(200).json({ data: result });
      }
    });
}

//-----------------------------REVISED FETCH ORDER ROUTE-------------------------
exports.fetchOrderById=()=>{
  const sql = `SELECT * FROM orders WHERE `;
}


//--------------------------------------ENDOF------------------------------------

exports.fetchOrders=(req,res)=>{
    const sql = 'SELECT t1.*,t2.method ,t3.items FROM orders t1 INNER JOIN paymentmethods t2 ON t1.paymentMethod=t2.id LEFT JOIN order_details t3 ON t1.id = t3.orderId';
   
  conn.query(sql, (error, result) => {
    if (error)
       res.status(500).json({ message: "Operation failed", error });
    if (result) {
     
       res.status(200).json({ orders: result });
    }
  });
}
exports.updateOrder=(req,res)=>{
    const sql =`UPDATE orders SET ? WHERE id = '${req.params.id}'`
    const ps =req.body
    conn.query(sql,ps, (error, result) => {
        if (error)
          return res.status(500).json({ message: "Operation failed", error });
        if (result) {
          return res.status(200).json({ data: result });
        }
      });
}

exports.updateOrderStatus=(req,res)=>{
    const sql =`UPDATE orders SET ? WHERE id = '${req.params.id}'`
    const ps ={status:req.body.status}
    conn.query(sql,ps, (error, result) => {
        if (error)
          return res.status(500).json({ message: "Operation failed", error });
        if (result) {
          return res.status(200).json({ message:'Status changed successfully' });
        }
      });
}
exports.deleteOrder=(req,res)=>{
    const sql = `DELETE FROM orders WHERE id = '${req.params.id}'`;
    conn.query(sql, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Operation failed", error });
      if (result) {
        return res.status(200).json({ data: result });
      }
    });
}