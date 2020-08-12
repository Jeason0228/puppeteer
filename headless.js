const url = `https://secure.louisvuitton.com/ajaxsecure/getStockLevel.jsp?storeLang=eng-ca&pageType=storelocator_section&skuIdList=M61252&null&_=1597215644930`;

const axios = require('axios');

axios.get(url).then(res=> {
    console.log(res.data);
})