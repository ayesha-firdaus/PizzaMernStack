const fetchApi = async (url = "", methodtype = "", givenData = {}) => {
    console.log(`Making a ${methodtype} request to ${url} with data:`, givenData);

    let reqobj = {
        method: methodtype,
    };

    if (methodtype === "POST" || methodtype === "PATCH") {
        reqobj.headers = {
            "Content-Type": "application/json"
        };

        if (givenData) {
            reqobj.body = JSON.stringify(givenData);
        }
    }

    const res = await fetch(url, reqobj);

    const result=await res.json();

    if(result.status==="fail"||result.status==="error")
        {
            throw new Error(result.message)
        }
    console.log(result,'✈️')
    return result;

};

export default fetchApi;