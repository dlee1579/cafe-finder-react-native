// const baseUrl = "https://cafe-finder-production.up.railway.app"
const baseUrl = "http://127.0.0.1:8000"

export async function getAllCafes(token) {
    const url = baseUrl + "/api/cafe/";
    try {
        const response = await fetch(url,
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + token,
                },
            }
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getCafeDetailsById(cafeId, token) {
    const url = baseUrl + "/api/cafe/" + cafeId;
    const headers = {
        "Content-type": "application/json",
        "Authorization": "Token " + token,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, OPTIONS, X-Requested-With, Content-Type, Accept",
    };
    console.log(url, headers)
    try {
        const response = await fetch(url,
            {   method: "GET",
                headers: headers,
            }
        );
        if (response.status === 401){
            console.log("401 unauthorized error");
            return null;
        } else {
            const json = await response.json();
            return json;
        }
    } catch (error) {
        console.error(error);
        return {};
    }
}

export async function getReviewsByCafeId(cafeId, token) {
    const url = baseUrl + `/api/reviews?cafe_id=${cafeId}`;
    console.log(token);
    try {
        const response = await fetch(url,
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + token,
                },
        });
        if (response.status === 401) {
            console.log("401 unauthorized error");
            return null;
        } else {
            const json = await response.json();
            return json;
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function login(username, password) {
    const url = baseUrl + "/api/auth/login/";
    try {
        const response = await fetch(
            url,
            {
                method: "POST",
                body: JSON.stringify({
                    "username": username,
                    "password": password
                }),
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": 'false',
                    "Access-Control-Allow-Headers": "Origin, OPTIONS, X-Requested-With, Content-Type, Accept"
                }
            });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        // return "error";
    }
}

export async function postReview(review, token) {
    const url = baseUrl + "/api/reviews/";
    console.log(review);
    try {
        const response = await fetch(
            url,
            {
                method: "POST",
                body: JSON.stringify(review),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + token,
                }
            });
        // const json = await response.json();
        // console.log(json);
        // return json;
        return response
    } catch (error) {
        console.error(error);
    }
}