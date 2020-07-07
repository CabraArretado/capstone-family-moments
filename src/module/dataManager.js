const remoteURL = "http://localhost:5002"


// General API manager, first parameter always the list name in lower case

export default {

    // GET
    get(list, id) {
        return fetch(`${remoteURL}/${list}/${id}`).then(result => result.json())
    },

    // GET ALL
    getAll(list) {
        return fetch(`${remoteURL}/${list}`).then(result => result.json())
    },

    //DELETE
    delete(list, id) {
        return fetch(`${remoteURL}/${list}/${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        }).then(data => data.json())

    },

    // POST
    async post(list, newData) {
        let i = await fetch(`${remoteURL}/${list}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        })
        i = i.json()
        return i
    },

    // GET list expanded //
    getExpanded(toExpand, otherList) {
        return fetch(`${remoteURL}/${toExpand}?_expand=${otherList.toLowerCase()}`).then(result => result.json())
    },
    // GET one item toEmbed 
    async getOneExpanded(toExpand, otherList, id) {
        let i = await fetch(`${remoteURL}/${toExpand}/${id}?_expand=${otherList.toLowerCase()}`).then(result => result.json())
        return i
    },

    // GET list expanded 
    getEmbed(toEmbed, otherList) {
        return fetch(`${remoteURL}/${toEmbed}?_embed=${otherList.toLowerCase()}`).then(result => result.json())
    },

    // GET one item toEmbed 
    async getOneEmbed(toEmbed, otherList, id) {
        let i = await fetch(`${remoteURL}/${toEmbed}/${id}?_embed=${otherList.toLowerCase()}`).then(result => result.json())
        return i
    },

    // PUT curent data
    async put(list, id, newObj) {
        let i = await fetch(`${remoteURL}/${list}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObj)
        })
        i = i.json();
        return i
    },

    // RANDOM ID provider
    getRandomId(list) {
        return fetch(`${remoteURL}/${list}`)
            .then(result => result.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                return data[randomIndex].id;
            });
    },


    //get userId by email
    async getUserId(email) {
        let data = await fetch(`${remoteURL}/users?email=${email}`).then(data => data.json())
        return data
    },

    // Get a obj in the list with specific value
    async getWhere(list, key, value) {
        let data = await fetch(`${remoteURL}/${list}?${key}=${value}`)
        data = data.json()
        return data
    },

    async getWhereAnd(list, key, value, key2, value2) {
        let data = await fetch(`${remoteURL}/${list}?${key}=${value}&${key2}=${value2}`)
        data = data.json()
        return data
    },

    async getWhereAndExpand(list, key, value, key2, value2, list3) {
        let data = await fetch(`${remoteURL}/${list}?${key}=${value}&${key2}=${value2}&_expand=${list3}`)
        data = data.json()
        return data
    },

    //
    async getWhereExpand(table, key, value, table2) {
        let data = await fetch(`${remoteURL}/${table}?${key}=${value}&_expand=${table2}`)
        data = data.json()
        return data
    }
}