const I = actor();

module.exports = {

    async getData(url) {
        const res = await I.executeScript((url) => {
            const res = fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            return res;
        }, url);
        return res;
    },
    async postData(url, data){
        const res = await I.executeScript((url, data) => {
            fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            return res;
        }, url, data);
        return res;
    }


}

