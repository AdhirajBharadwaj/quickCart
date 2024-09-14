class ApiFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
    search() {
      // Check if there's a search query in the queryString
      if (this.queryString.search) {
        const searchTerm = this.queryString.search;
        
        // Create a regex pattern for case-insensitive search
        const searchRegex = new RegExp(searchTerm, 'i');
        
        
        // Search across multiple fields of the product
        this.query=this.query.find({
            name:searchRegex,
        })
        

        
        // Comment: This search implementation looks for the search term in name, description, and category fields.
        // It uses a case-insensitive regex to match partial strings as well.
      }
      
      return this;
    }
    category(){
        if(this.queryString.category){
            const category=this.queryString.category;
            this.query=this.query.find({category});
        }
        return this;
    }
    filter() {
    
      const queryObj = { ...this.queryString };
      const excludedFields = ['page', 'sort', 'limit', 'fields','search'];
      excludedFields.forEach(el => delete queryObj[el]);
  
      // 1B) Advanced filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        
      this.query = this.query.find(JSON.parse(queryStr));
  
      return this;
    }
  
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
  
      return this;
    }
  
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }
  
      return this;
    }
  
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
    }
  }
  export default ApiFeatures;
  