const conn = require("../../connection");
const { v4: uuidv4 } = require("uuid");
const url = process.env.PUBLIC_URL;

saveFileURLS = (files) => {
  let fileUrls = [];
  if (files && files.length > 0) {
    fileUrls = files.map((f) => `${url}${f.filename}`);
  }
  return JSON.stringify(fileUrls);
};
exports.addProduct = async (req, res) => {
  const {
    name,
    longDescription,
    shortDescription,
    price,
    variations,
    slug,
    badge,
    quantity,
    discount,
    store,
    categoryID,
  } = req.body;
  const sql = `INSERT INTO product SET ?`;
  const ps = {
    name,
    longDescription,
    shortDescription,
    price,
    variations,
    slug,
    badge,
    quantity,
    discount,
    storeID: 1,
    categoryID,
  };

  ps["slug"] = name.replace(/\s/g, "-").toLowerCase();
  //ps['slug']=uuidv4()
  if (req.files && req.files.length > 0) {
    fileUrls = saveFileURLS(req.files);
    ps["productGallery"] = fileUrls;
  } else {
    return res.status(403).json({ message: "No files uploaded" });
  }
  conn.query(sql, ps, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      //insert variations
      const { variations, variationID } = req.body;

      const pid = result.insertId;

      const insert = `INSERT INTO productvariations SET ?`;
      let stmt = { productID: pid, variationID, variations };
      conn.query(insert, stmt, (error, after) => {
        if (error)
          return res.status(500).json({
            message:
              "An unknown error occurred, could not list variations, please update the product",
            error,
          });
        if (after) {
          return res
            .status(200)
            .json({ message: "Item listed successfully", result });
        }
      });
    }
  });
};

exports.fetchOne = (req, res) => {
  const sql = `SELECT * FROM product WHERE id = '${req.params.id}'`;
  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      return res.status(200).json({ data: result });
    }
  });
};

fetchProductVariants=(productid)=>{
  
  const sql = `SELECT * FROM product_variant WHERE product_id = '${productid}';SELECT * FROM materials;SELECT * FROM colors;SELECT * FROM sizes`
  conn.query(sql,(error,result)=>{
    if(error) throw error//res.status(500).json({message:'Operation failed'})
    if(result){
      
      const v=result[0]
      const material=result[1]
      const  color =result[2]
      const size = result[3]
      const attributes ={material,color,size}
      //reconstruct data structure
      for (var i = 0; i <v.length;i++ ) {
        //check variant type
        for(let j=0;j<attributes[v[i].variant_attribute_name].length;j++){
          ////console.log(attributes[v[i].variant_attribute_name][j].name,v[i].variant_attribute_name,j,i)
           if(attributes[v[i].variant_attribute_name][j].name===v[i].variant_option){
            ////console.log(attributes[v[i].variant_attribute_name][j].name,'✨✨✨',j,i);
            //then push details to object
            v[i]['variant_detail']=attributes[v[i].variant_attribute_name][j]

           }
           //attributes[v[i].variant_attribute_name][j]
        }
        //if variant attribute id matches 

      }
      //res.status(200).json({variants:v})
     // //console.log(v, 'product variation')
    
    }
  })
 }

exports.fetchProductBySlug = (req, res) => {
  const sql = `SELECT *  FROM product WHERE slug = '${req.params.slug}'`;
   let gallery = []
  let variations =[]
  conn.query(sql, async(error, result) => {
    if (error)
    return res.status(500).json({ message: "Operation failed", error });
    if (result&&result.length >0) {
     
       //get all images
     conn.query(`SELECT * FROM product_images WHERE productId = ${result[0].id};SELECT * FROM product_variant WHERE product_id = ${result[0].id} ;SELECT * FROM materials;SELECT * FROM colors;SELECT * FROM sizes `,(error,props)=>{
        if (props) {
        
          for (var i = 0; i < props[0].length; i++) {
            gallery.push(props[0][i])
          }
            for (var i = 0; i < props[1].length; i++) {
            variations.push(props[1][i])
          }
          //variant structuring
      const v=props[1]
      const material=props[2]
      const  color =props[3]
      const size = props[4]
      const attributes ={material,color,size}
      //reconstruct data structure
      for (var i = 0; i <v.length;i++ ) {
        //check variant type
        for(let j=0;j<attributes[v[i].variant_attribute_name].length;j++){
          ////console.log(attributes[v[i].variant_attribute_name][j].name,v[i].variant_attribute_name,j,i)
           if(attributes[v[i].variant_attribute_name][j].name===v[i].variant_option){
            ////console.log(attributes[v[i].variant_attribute_name][j].name,'✨✨✨',j,i);
            //then push details to object
            v[i]['variant_detail']=attributes[v[i].variant_attribute_name][j]

           }
           //attributes[v[i].variant_attribute_name][j]
        }
        //if variant attribute id matches 

      }
      //res.status(200).json({variants:v})
     // //console.log(v, 'product variation')
          result[0]['gallery']=gallery
         result[0]['variations']=v
        }
       
        return res.status(200).json({ data: result});
      })
      //get all variants

      
    }
  });
};
exports.fetchMany = (req, res) => {
  const sql = `SELECT t1.*,t2.category FROM product t1 INNER JOIN category_entry t2 ON t1.categoryID=t2.id ORDER BY t1.createdAt DESC`;
  conn.query(sql, (error, result) => {
    if (error)
      throw error//return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      return res.status(200).json({ products: result });
    }
  });
};
exports.deleteOne = (req, res) => {
  const sql = `DELETE FROM product WHERE id = '${req.params.id}'`;
  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      return res.status(200).json({ data: result });
    }
  });
};
exports.updateProduct = (req, res) => {
  const gallery = saveFileURLS(req.body);
  const sql = `UPDATE product SET ? WHERE id = '${req.params.id}'`;
  const {
    name,
    longDescription,
    shortDescription,
    price,
    variations,
    slug,
    badge,
    quantity,
    discount,

    categoryID,
  } = req.body;
  const ps = {
    name,
    longDescription,
    shortDescription,
    price,
    variations,
    slug,
    badge,
    quantity,
    discount,
    categoryID,
  };

  ps["gallery"] = gallery;
  ps["slug"] = name.replace(/\s/g, "-").toLowerCase();
  //ps['slug']=uuidv4()
  if (req.files && req.files.length > 0) {
    fileUrls = saveFileURLS(req.files);
    ps["productGallery"] = fileUrls;
  }
  conn.query(sql, ps, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      //insert variations
      const { variations, variationID } = req.body;
      const stmt = { variations, variationID };
      conn.query(
        `UPDATE productvariations SET ? WHERE productID = ${req.params.id}`,
        stmt,
        (error, final) => {
          if (error)
            return res.status(500).json({
              message:
                "An unknown error occurred, could not list variations, please update the product",
              error,
            });
          if (final) {
            return res
              .status(200)
              .json({ message: "Item updated successfully" });
          }
        }
      );
    }
  });
};
exports.addreview = (req, res) => {
  const sql = `INSERT INTO reviews SET ?`;
 const productID=req.params.productid
  const {title,description,stars} = req.body;
  const ps = {title,description,stars,productID,userID:req.params.uid}
  if(req.files){
    ps['gallery']=`${url}${req.file.filename}`

  }
  conn.query(sql, ps, (error, result) => {
    if (error)//throw error
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      return res.status(200).json({ data: result });
    }
  });
};


exports.updateProductCoverImage=(req,res)=>{

  const {productId}=req.body
    const sql = `UPDATE product SET ? WHERE id = '${productId}'`
  const ps ={}
  
  if(req.file){
     ps['coverImage']=`${url}${req.file.filename}`
  }

  conn.query(sql,ps,(error,result)=>{
       if (error)throw error
        //return res.status(500).json({ message: "Operation failed", error });
      if (result&&result.affectedRows > 0) {
         //console.log(req.file,ps,result)
        return res.status(200).json({ data: result });
      }else{
        res.status(500).json({ message: "Operation failed" });
      }
  })
}

exports.fetchTestJoinTable=(req,res)=>{
  const sql=`select  * from product t1 left JOIN product_images t2 on t1.id = t2.productId group by t1.id`

  conn.query(sql,(error,result)=>{
       if (error)throw error
        //return res.status(500).json({ message: "Operation failed", error });
      if (result) {
        
        return res.status(200).json({ list: result });
      }else{
        res.status(500).json({ message: "Operation failed" });
      }
  })
}