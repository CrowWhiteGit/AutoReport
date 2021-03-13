

class Api {
    constructor() {
        this.baseUrl = "http://localhost:3100/reports";
    }

    getReports = async () => {
        let res = await fetch(`${this.baseUrl}/list`);

        let data = await res.json();

        return data;
    }
}

export default new Api();