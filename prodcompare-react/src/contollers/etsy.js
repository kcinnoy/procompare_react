import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
//JSONP is a method for sending JSON data without worrying about cross-domain issues. Does not use XMLHttpRequest

const searchByQuery = async (query, limit=25) => {
  const url = 
    process.env.REACT_APP_ETSY_API + 
    `listings/active.js?keywords=${query}&` +
    `fields=listing_id,title,price,url,ending_tsz&` +
    `limit=${limit}&` + 
    `includes=MainImage,Shop(num_favorers)&` +
    `api_key=${process.env.REACT_APP_ETSY_API_KEY}`;

  const { data } = await axios.get(url, {
    adapter: jsonpAdapter
  });
  return data;
};

export {
  searchByQuery
};