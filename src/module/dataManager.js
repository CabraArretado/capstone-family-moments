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
        return fetch(`${remoteURL}//${list}${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        }).then(data => data.json())
    },

    // POST
    post(list, newData) {
        return fetch(`${remoteURL}/${list}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        }).then(data => data.json())
    },

    // GET list expanded //
    getExpanded(toExpand, otherList) {
        return fetch(`${remoteURL}/${toExpand}?_expand=${otherList.toLowerCase()}`).then(result => result.json())
    },

    // GET list expanded 
    getEmbed(toEmbed, otherList) {
        return fetch(`${remoteURL}/${toEmbed}?_embed=${otherList.toLowerCase()}`).then(result => result.json())
    },

    // GET one item toEmbed 
    async getOneEmbed(toEmbed, otherList, id) {
        let i = await fetch(`${remoteURL}/${toEmbed}/${id}?_embed=${otherList.toLowerCase()}`).then(result => result.json())
        console.log(i)
        return i
    },


    // PUT curent data
    put(list, id, newObj) {
        return fetch(`${remoteURL}${list}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObj)
        }).then(data => data.json())
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

    async getUserId(email) {
        let data = await fetch(`${remoteURL}/users?email=${email}`).then(data => data.json())
        return data
    }
}