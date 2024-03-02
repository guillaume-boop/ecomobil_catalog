export async function ajoutListenersAvis() {
    const piecesElements = document.querySelectorAll(".fiches article button");
 
    for (let i = 0; i < piecesElements.length; i++) {
        piecesElements[i].addEventListener("click", async function (event) {
            const id = event.target.dataset.id;
            try {
                // Charger les données depuis le fichier JSON local
                const reponse = await fetch('pieces-autos.json');
                const avis = await reponse.json();

                // Filtrer les avis pour la pièce spécifique
                const avisPiece = avis.filter(avis => avis.pieceId === parseInt(id));

                const pieceElement = event.target.parentElement;
                const avisElement = document.createElement("div");

                if (avisPiece.length > 0) {
                    avisPiece.forEach(item => {
                        const avisItem = document.createElement("p");
                        avisItem.innerHTML = `<b>${item.utilisateur}:</b> ${item.commentaire}`;
                        avisElement.appendChild(avisItem);
                    });
                } else {
                    const noAvisElement = document.createElement("p");
                    noAvisElement.textContent = "Aucun avis disponible pour cette pièce.";
                    avisElement.appendChild(noAvisElement);
                }

                pieceElement.appendChild(avisElement);
            } catch (error) {
                console.error('Erreur lors du chargement des avis :', error);
            }
        });
    }
}
