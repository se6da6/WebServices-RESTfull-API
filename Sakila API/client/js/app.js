let options = {
    data: () => {
        return {
            title: "Sakila API",
            resourceData: {},
            resourceType: "actors",
            headings: [],
            content: [],
            totalPages:0,
            totalElements:0,
            size:10,
            number:0,
            // DONE - Add page info data here
        }
    },
    /*//this is a lifecycle hook, why here here is the start of 
    the app and it authumatically fetches the info it updates mate data*/
    async created() {
        try {
            //we call the function fetchResource and pass the parameter "actors"
            this.fetchResource("actors")
        }
        catch (error)
        {
            alert(error)
        }
    },
    methods: {
        async first(){
            this.number = 0
            this.fetchResource(this.resourceType)
        },
        //DONE - add remainig navigation buttons here
        async previous(){
            if(this.number > 0){
                this.number--
                this.fetchResource(this.resourceType)
            }
        },
        async next(){
            if(this.number < this.totalPages - 1){
                this.number++
                this.fetchResource(this.resourceType)
            }
        },
        async last(){
            this.number = this.totalPages - 1
            this.fetchResource(this.resourceType)
        },
        async fetchResource(resource) {
            this.resourceType = resource
            try {
                let response = await fetch(
                    // DONE- Add page and size query parameters to URI here 
                    "http://localhost:8080/api/" + resource + "?size=" +
                    this.size + "&page=" + this.number
                )
                let json = await response.json()
                this.content = json.content
                this.resourceData = json
                this.headings = Object.keys(this.content[0])
                // DONE - Assign metadata values from json here
                this.totalElements = json.totalElements
                this.totalPages = json.totalPages
                this.size = json.size
                this.number = json.number
            } catch (error) {
                alert(error)
            }
        },
        
    },
}
let app = Vue.createApp(options)
app.mount("#app")
