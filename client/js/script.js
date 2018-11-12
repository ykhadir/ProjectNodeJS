
window.onload = init;

function init() {
    new Vue({
        el: '#app',
        data: {
            todos: [],
            input: "",
            nameRes:"",
            cuisine:"",
            updatenameRes:"",
            updatecuisine:"",
            todoID:1,
            page:1,
            pagesize:10
        },
        
        mounted() {
            console.log("--- MOUNTED, appelée avant le rendu de la vue ---");
            this.getDataFromWebService();
        },

        methods: {
            getDataFromWebService: function () {
                let url = "http://localhost:8887/api/restaurants?page=" + this.page;

                fetch(url).then((data) => {
                    console.log("les données sont arrivées !")
                    return data.json();
                }).then((dataEnJavaScript) => {
                    // ici on a bien un objet JS
                    this.todos = dataEnJavaScript.data;
                });
            },
            findRestaurant: function (page) { 
                let url = "http://localhost:8887/api/restaurants?page="+0+"&name="+this.input;  
                fetch(url).then((data) => {
                    console.log("les données sont arrivées ...!")
                  return data.json();
                }).then((dataEnJavaScript) => { 
                    this.todos = dataEnJavaScript.data; 
                });
            },
            selectTodo: function(id,name,cuisine){ 
                this.updatenameRes=name;
                this.updatecuisine=cuisine;
                this.todoID=id;
            },
            updateTodo: function(){ 
                var Newtodo = new FormData();
                Newtodo.append("nom",this.updatecuisine);
                Newtodo.append("cuisine",this.updatenameRes); 
                let url = "http://localhost:8887/api/restaurants/"+this.todoID;
                fetch(url, {
                          method: "PUT", body: Newtodo
                }).then(function(responseJSON) {
                responseJSON.json();
                
                 }).catch(function (err) {
               console.log(err);
                });
                this.getDataFromWebService();
            },
            addTodo: function(){ 
                
                var Newtodo = new FormData(); 
                Newtodo.append("nom",this.nameRes); 
                Newtodo.append("cuisine",this.cuisine); 
                 let url = "http://localhost:8887/api/restaurants";
                 fetch(url, {
                     method: "POST", body: Newtodo
                 })
                 .then(function(responseJSON) {
                  responseJSON.json()
                }).then(() => { 
                    this.nameRes="";
                    this.cuisine="";
                }).catch(function (err) {
                   console.log(err);
                 });
              }, 
            removeTodo: function (idRest,index) { 
                 
               let url = "http://localhost:8887/api/restaurants/"+idRest;
               fetch(url, {
                   method: "DELETE",
               })
               .then(function(responseJSON) {
                   responseJSON.json() ;
                   })
                   .catch(function (err) {
                       console.log(err);
               });this.todos.splice(index, 1);
            },

            getColor: function (index) {
                return (index % 2) ? 'red' : 'green';
            },

            pagePrecedente: function() {
                console.log("page courante =" + this.page);
                this.page--;
                this.getDataFromWebService();
            },
            
            pageSuivante: function() {
                console.log("page courante =" + this.page);
                this.page++;
                this.getDataFromWebService();
            },

        }
    })
}
