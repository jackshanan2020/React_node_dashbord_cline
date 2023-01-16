const conn = require("../connection");
const { v4: uuidv4 } = require("uuid");

 function calculateDiscount(discount, amount) {
  ////console.log('discount : ',discount,'& price :',amount)
  return discount && discount > 0
    ? Math.round(amount - amount * (discount / 100))
    : amount;
};


exports.countCartItems=(req,res)=>{
  const {id} =req.user
  const sql =`SELECT * FROM cart c1 INNER JOIN cart_item c2 ON c1.id = c2.cartId WHERE userId = ${id} AND checkedOut = 0`
  conn.query(sql,(error,result)=>{
        if (error) throw error//return res.status(500).json({ message: "Operation failed" });
        if(result&&result.length > 0){
          let count = 0
          for(let i=0;i<result.length;i++){
            count+=result[i].quantity
          }

          res.status(200).json({message:"Cart content",cart:count})
        }else{
          res.status(200).json({cart:0})
        }
  })
}



exports.addToCart = (req, res) => {
  const uid = req.user.id;
  const sql = `INSERT INTO cart SET ?`;
  const findUserCart = `SELECT * FROM cart WHERE userId ='${uid}' AND checkedOut = 0`;
  const newCartId = uuidv4();
  const ps = {
    cartId: newCartId,
    userId: uid,
    status: "new",
  };
  //status: new,checkout,paid,complete
 
  const INSERT_CART_ITEM = `INSERT INTO cart_item SET ?`;
  const SUB_TOTAL = calculateDiscount(req.body.discount,req.body.price)
  req.body['sub_total']=SUB_TOTAL
  ////console.log(SUB_TOTAL,'sub total')
  const { price, discount, quantity,sub_total } = req.body;


  //check if user has cart
  conn.query(findUserCart, (error, result) => {
    if (error) return res.status(500).json({ message: "Operation failed" });
    if (result && result.length > 0) {
      //check if cart item already have the current product in cart that hasn't been checked out
      conn.query(
        `SELECT * FROM cart c1 INNER JOIN cart_item c2 ON c1.id = c2.cartId WHERE c2.productId = '${req.body.id}' AND c1.userId = '${uid}' AND c1.checkedOut = 0`,
        (error, res2) => {
          if (error) throw error; //return res.status(500).json({message:'Operation failed'})
          if (res2 && res2.length > 0) {
            return res.status(200).json({
              message: "item already added to cart",
              data: res2,
            });
          } else {
            ////console.log('neg 1');
            const ADD_CART_ITEM = `INSERT INTO cart_item SET ?`;
            const rowId = result[0].id;
            const cart_item_obj = {
              productId: req.body.id,
              cartId: rowId,
              price,
              discount,
              quantity:1,
              sub_total
            };
            //update by adding new  cart items
            conn.query(ADD_CART_ITEM, cart_item_obj, (error, res3) => {
            //  ////console.log("boundary 2");
              if (error) throw error; //return res.status(500).json({message:'Operation failed'})
              if (res3) {
                return res.status(200).json({
                  message: "item added to cart successfully",
                  data: res3,
                });
              }
            });
          }
        }
      );
    } else {
      ////console.log("failed xxx");
      //create new cart & new cart item
      conn.query(sql, ps, (error, result2) => {
        if (error) return res.status(400).json({ message: "Operation failed" });
        if (result2) {
          // return res.status(200).json({ message: "item added to cart successfully",data:result });
          ////console.log(result2);
          const rowId = result2.insertId;

          const cart_item_ps = {
            productId: req.body.id,
            cartId: rowId,
            price,
            discount,
            quantity:1,
            sub_total:calculateDiscount(discount,price)
          };

          conn.query(INSERT_CART_ITEM, cart_item_ps, (error, result) => {
            //if failed delete main cart data
            if (error)
              return res.status(500).json({ message: "Operation failed" });
            if (result) {
              return res.status(200).json({
                message: "item added to cart successfully",
                data: result2,
              });
            }
          });
        }
      });
    }
  });

  /* */
};
exports.incrementCart = (req, res) => {
  const { cartId, productId } = req.body;
  //add +1 if qunatity not greater than stock quantity

const c = `SELECT * FROM product WHERE id = ${productId}`;

    conn.query(c,(error,res1)=>{
      if (error) return res.status(500).json({ message: "Operation failed" });
      if(res1){
        const SUB_TOTAL = calculateDiscount(res1[0].discount,res1[0].price);
      
       const sql = `UPDATE cart_item set quantity = quantity+1 ,sub_total=sub_total+${SUB_TOTAL} WHERE cartId = ${cartId} AND productId = ${productId}`;

        conn.query(sql, (error, result) => {
        if (error) throw error//return res.status(500).json({ message: "Operation failed" });
        if (result) {
          ////console.log(result,' result');
          conn.query(`SELECT * FROM cart_item WHERE cartId = ${cartId} AND productId = ${productId}`,(error,res2)=>{
            if (res2) {
                return res.status(200).json({
                message: "Cart item increased",
                cartItem: res2[0],
          });
            }
          })
        
        }
       });
      }
 })

  
};

exports.decrementCart = (req, res) => {
  
  const { cartId, productId } = req.body;
  const c = `SELECT * FROM product WHERE id = ${productId}`;
   conn.query(c,(error,res1)=>{
        if (error) return res.status(500).json({ message: "Operation failed" });
        if(res1){
            const SUB_TOTAL = calculateDiscount(res1[0].discount,res1[0].price);
           //subtract -1 if qunatity not greater than stock quantity
          const sql = `UPDATE cart_item set quantity = quantity-1,sub_total=sub_total-${SUB_TOTAL} WHERE cartId = ${cartId} AND productId = ${productId} AND quantity > 1`;
          conn.query(sql, (error, result) => {
            if (error) return res.status(500).json({ message: "Operation failed" });
            if (result) {
                conn.query(`SELECT * FROM cart_item WHERE cartId = ${cartId} AND productId = ${productId}`,(error,res2)=>{
                if (res2) {
                    return res.status(200).json({
                    message: "Cart item increased",
                    cartItem: res2[0],
                   });
                }
              })
            }
         });
        }

   })
 
};
//deleteItem
exports.deleteItem = (req, res) => {
  ////console.log(req.body);
  const { cartId, productId } = req.body;
  //DELETE ITEM FROM CART
  const sql = `DELETE FROM cart_item WHERE cartId = ${cartId} AND productId = ${productId}`;
  conn.query(sql, (error, result) => {
    if (error) return res.status(500).json({ message: "Operation failed" });
    if (result) {
      return res.status(200).json({
        message: "Cart item was deleted",
        data: result,
      });
    }
  });
};
//fetch cart items
exports.fetchCartItems = (req, res) => {
  ////console.log(req.body);
  const uid = req.user.id;
  const { cartId } = req.body;
  //FETCH ITEMS FROM CART
  const sql = `SELECT c1.id AS cartItemId,c1.sub_total, c1.cartId,c1.quantity AS cartItemQty,c1.productId,c2.cartId AS userCartId,c3.name,c3.slug,c3.coverImage,c3.price,c3.quantity,c3.discount
    FROM cart_item c1 
    LEFT JOIN cart c2 ON c1.cartId = c2.id
    INNER JOIN product c3 ON c1.productId=c3.id
    WHERE c2.userId =${uid} AND c2.checkedOut = 0`;
  conn.query(sql, (error, result) => {
    if (error) throw error//return res.status(500).json({ message: "Operation failed" });
    if (result) {
      ////console.log(result);
      return res.status(200).json({
        message: "Cart items fetched successfully",
        cart: result,
      });
    }
  });
};
