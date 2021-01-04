function sendData(obj_form,url) {
    var XHR = new XMLHttpRequest();
    var form = /*document.querySelector(obj_form)||*/obj_form;
    // Liez l'objet FormData et l'élément form
    var FD = new FormData(form);

    // Définissez ce qui se passe si la soumission s'est opérée avec succès
    XHR.addEventListener("load", function(event) {
      //alert(event.target.responseText);
    });

    // Definissez ce qui se passe en cas d'erreur
    XHR.addEventListener("error", function(event) {
      alert('Oups! Quelque chose s\'est mal passé.');
    });

    // Configurez la requête
    XHR.open("POST", url);

    // Les données envoyées sont ce que l'utilisateur a mis dans le formulaire
    XHR.send(FD);
  }
  