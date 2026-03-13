fetch("php/getAuto.php")
.then(response => response.json())
.then(data => {

    console.log("Auto nel database:");

    for(let i = 0; i < data.length; i++){
        console.log(data[i]);
    }

})
.catch(error => {
    console.error("Errore:", error);
});