const conn = require("../connection");
const url =`${process.env.PUBLIC_URL}assets/`;

exports.addCategory=(req, res)=>{

}
exports.fetchCategory = (req, res) => {
  const sql = `SELECT * FROM categories WHERE id = '${req.params.id}'`;
  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      return res.status(200).json({ data: result });
    }
  });
};
exports.fetchCategories = (req, res) => {
  const sql = `SELECT * FROM categories; SELECT * FROM parent_category`;
  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      const children = result[0];
      const parent = result[1];
      //(children,parent)
      return res.status(200).json({children, parent});
    }
  });
};
//for client use
exports.fetchCategoriesForClient = (req, res) => {
  const sql = `SELECT * FROM categories; SELECT * FROM parent_category`;
  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      const children = result[0];
      const parent = result[1];
      //group children
      
      const arr=[]
      for (let i = 0; i < parent.length; i++) {
        let tmp = [];
        for (let j = 0; j < children.length; j++) {
          if (children[j].parentID === parent[i].id) {
            tmp.push(Object(children[j]));
          }
        }
       
        arr.push({category:parent[i].category,children:tmp})
      }
      return res
        .status(200)
        .json({ categories: arr});
    }
  });
};

exports.updateCategory = (req, res) => {
  //(req.body);
  const { categoryName, parentID, type, slug } = req.body;
  const sql = `UPDATE categories SET ? WHERE id = ${req.params.id}`;
  const ps = { categoryName, parentID, type, slug };
  conn.query(sql, ps, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      return res.status(200).json({ data: result });
    }
  });
};
exports.deleteCategory = (req, res) => {
  const sql = `DELETE FROM categories WHERE id = '${req.params.id}'`;
  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      return res.status(200).json({ data: result });
    }
  });
};


//********************** new category model - controllers*********************************//
//CREATE DEPARTMENTS
exports.createDepartment=(req,res)=>{
  const {name,slug}=req.body
  const sql = `INSERT INTO department SET ?`;
  const stmt = {name,slug};
  stmt['slug']=name.replace(/\s/g,'-');
  //console.log(req.file)
  if(req.file){
    stmt['thumbnail']=`${url}${req.file.filename}`
  }
  conn.query(sql,stmt,(error,result)=>{
       if (error) return res.status(500).json({ message: "Operation failed", error });
       if(result&&result.affectedRows > 0){
       
          res.status(200).json({message:'Department created successfully'})
       }
  })

}
//UPDATE
exports.updateDepartment=(req,res)=>{
  const {name,id}=req.body
  const sql = `UPDATE department SET ? WHERE id = ${id}`
  const stmt = {name,id};
  stmt['slug']=name.replace(/\s/g,'-');
  if(req.file){
    stmt['thumbnail']=`${url}${req.file.filename}`
  }
    conn.query(sql,stmt,(error,result)=>{
       if (error) return res.status(500).json({ message: "Operation failed", error });
       if(result&&result.affectedRows > 0){
          res.status(200).json({message:'Department updated successfully'})
       }
  })


}
//FETCH DEPARTMENTS
exports.fetchDepartment=(req,res)=>{
  conn.query(`SELECT * FROM department ORDER BY popularity`,(error,result)=>{
    if (error) return res.status(500).json({ message: "Operation failed", error });
       if(result){
          res.status(200).json({departments:result})
       }
  })
}

exports.structureCategory=(req,res)=>{
  const sql = `SELECT * FROM department ORDER BY popularity;SELECT * FROM parent_category;SELECT * FROM category_entry`
  conn.query(sql,(error,result)=>{
        if (error) return res.status(500).json({ message: "Something went wrong", error });
         if(result){
          let departments=result[0]
          let parents = result[1]
          let categories=result[2]
         
          for (var i = 0; i < departments.length; i++) {
              departments[i]['children']=[]
            for (var j = 0; j < categories.length; j++) {

              if (categories[j].department_id==departments[i].id) {
                //console.log('matched ***')
                
                for (var k = 0; k < parents.length; k++) {
                   //find matching parent id's
                    if (parents[k].id == categories[j].parent_id) {
                       //departments[i]['children']
                      departments[i]['children'].push(categories[j])
                      categories[j]['parent']=parents[k]
                    }
                  }


              }

             
            }
          }
          res.status(200).json({departments})
       }
  })
}





//DELETE                ,
exports.deleteDepartment=(req,res)=>{
  conn.query(`DELETE FROM department WHERE id = ${req.params.id}`,(error,result)=>{
    if (error) return res.status(500).json({ message: "Operation failed", error });
       if(result){
          res.status(200).json({message:'Department deleted'})
       }
  })
}


//**************************CATEGORIES (PARENT)*************************************************/

exports.addParentCategory = (req, res) => {
  const sql = `INSERT INTO parent_category SET ?`;
  const { category} = req.body;
  const ps = {category};
  //console.log(req.body)
 ps['slug']=category.replace(/\s/g,'-')
  conn.query(sql, ps, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      
      return res
        .status(200)
        .json({ message: "Category created successfully" });
    }
  });
};
//FETCH

exports.fetchParentCategory = (req, res) => {
  const sql = `SELECT * FROM parent_category`;
 
  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      
      return res
        .status(200)
        .json({ categories:result});
    }
  });
};
//DELETE
exports.deleteParentCategory=(req,res)=>{
  conn.query(`DELETE FROM parent_category WHERE id = ${req.params.id}`,(error,result)=>{
     if (error) throw error//return res.status(500).json({ message: "Operation failed", error });
       if(result){
          res.status(200).json({message:'Category deleted'})
       }
  })
}
//UPDATE
exports.updateParentCategory = (req, res) => {
   const { category,id} = req.body;
  const sql = `UPDATE parent_category SET ? WHERE id = ${id}`;
 
  const ps = {category};
 ps['slug']=category.replace(/\s/g,'-')
  conn.query(sql, ps, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      
      return res
        .status(200)
        .json({ message: "Category created successfully" });
    }
  });
};

//*************************************CATEGORY (SUB)******************************************

exports.addSubCategory = (req, res) => {
  const sql = `INSERT INTO category_entry SET ?`;
  const {  category,department_id,parent_id } = req.body;
  const ps = {  category,department_id,parent_id};
  if(req.file){
    ps['thumbnail'] =`${url}${req.file.filename}`
  }
   ps['slug']=category.replace(/\s/g,'-')
  conn.query(sql, ps, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      
      return res
        .status(200)
        .json({ message: "Category created successfully", result });
    }
  });
};


exports.fetchSubCategory = (req, res) => {
  const sql = `SELECT * FROM category_entry WHERE id = '${req.params.id}'`;
  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      return res.status(200).json({ data: result });
    }
  });
};
//JOIN TABLE CATEGORY
exports.fetchSubCategories = (req, res) => {
//  const sql = `SELECT * FROM category_entry; SELECT * FROM parent_category`;
  
const sql = `SELECT tbl1.id,tbl1.thumbnail,tbl1.createdAt,tbl1.category,tbl2.name AS department FROM category_entry tbl1 LEFT JOIN department tbl2 ON tbl1.department_id = tbl2.id`


  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      
      //(children,parent)
      return res.status(200).json({ subCategories:result });
    }
  });

};
exports.findSubCategories=()=>{}

exports.updateSubCategory = (req, res) => {
  //(req.body);
  const {  category,department_id,parent_id } = req.body;
  const sql = `UPDATE category_entry SET ? WHERE id = ${req.params.id}`;
  const ps = {  category,department_id,parent_id };
  ps['slug']=category.replace(/\s/g,'-')
  conn.query(sql, ps, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      return res.status(200).json({ data: result });
    }
  });
};
exports.deleteSubCategory = (req, res) => {
  const sql = `DELETE FROM category_entry WHERE id = '${req.params.id}'`;
  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Operation failed", error });
    if (result) {
      return res.status(200).json({ data: result });
    }
  });
};

