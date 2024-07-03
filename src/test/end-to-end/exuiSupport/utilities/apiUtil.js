/* eslint-disable no-shadow */
/* eslint-disable require-await */
const I = actor();

module.exports = {

  async getData(url, headers) {
    const res = await I.executeScript(async({ url, headers }) => {
      console.log(`GET : ${url}`);
      const getRes = await fetch(url, {
        method: 'GET',
        headers,
        credentials: 'same-origin'
      });
      const resData = await getRes.json();
      return resData;
    }, { url, headers });
    return res;
  },

  async postData(url, headers, requestData) {
    const res = I.executeScript(async({ url, headers, requestData }) => {
      const postRes = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers
      });
      const resData = await postRes.json();
      return resData;
    }, { url, headers, requestData });
    return res;
  }

};
