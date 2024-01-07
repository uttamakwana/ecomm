export default class ProductFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    // this function will search the product by it's name
    // name will be provided in the query
    // keyword is a key for the search value
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    // this.query refers to Product.find() and we are finding the product by regex
    // it means if in keyword == "prod" => it will return product 2 as well
    // that's why we have used regex to find the product
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    // creating another object of query string
    const queryCopy = { ...this.queryStr };
    // we wanted to keep only category query string to filter out the products
    const removeFields = ["keyword", "page", "limit"];

    // removing other params like keyword, page and limit and keepign only category but we are not removing price
    removeFields.forEach((key) => delete queryCopy[key]);
    // for filter of price we are doing the following
    // converting the object into string
    let queryStr = JSON.stringify(queryCopy);
    // replacing the price: {gt} to price{$gt} to filter out the product by it's price range
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(productsPerPage) {
    // productPerPage are the count of product we want to show on one page
    const currentPage = Number(this.queryStr.page) || 1;
    // on next page or previous page we want to skip product
    // this variable will count how much product we want to skip on skip button
    const skipProduct = productsPerPage * (currentPage - 1);
    // Product.limit() will show limited products here productPerPage
    this.query = this.query.limit(productsPerPage).skip(skipProduct);
    return this;
  }
}
