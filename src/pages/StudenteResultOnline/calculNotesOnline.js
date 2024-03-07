export function calculerMeilleurEleve(elevesInClasse, classe, trimestreSelectionne, eleveActuelId) {
  if (!elevesInClasse || elevesInClasse.length === 0 || !classe || !classe.coefInfo || classe.coefInfo.length === 0) {
    console.log('Aucun élève ou information de classe disponible.');
    return null;
  }

  const moyennesEleves = []; // Tableau pour stocker les moyennes des élèves

  elevesInClasse.forEach((eleveClasse) => {
    let sommeNotes = 0;
    const sommeCoefficients = classe.coefInfo.reduce((acc, info) => acc + info.coef, 0); // Utilisation de reduce pour calculer la somme des coefficients

    eleveClasse.notes.forEach((note) => {
      // Vérifier si la note correspond au trimestre sélectionné

      
      if (note.trimestre._id === trimestreSelectionne) {// Ajoutez cette condition pour filtrer par trimestre
        console.log('note.trimestre', note.trimestre);
        console.log('trimestreSelectionne', trimestreSelectionne);
        const matiereId = note.matiere._id;
        const noteDevoir = !isNaN(parseFloat(note.notesDevoir)) ? parseFloat(note.notesDevoir) : 0;
        const noteCompo = !isNaN(parseFloat(note.noteCompo)) ? parseFloat(note.noteCompo) : 0;
        const coefInfo = classe.coefInfo.find((info) => info.matiere._id === matiereId);

        if (coefInfo) {
          const total = noteDevoir + (noteCompo * coefInfo.coef);
          sommeNotes += total;
        }
      }
    });

    const moyenneEleve = sommeCoefficients !== 0 ? sommeNotes / sommeCoefficients : 0;
    moyennesEleves.push({ id: eleveClasse._id, nom: eleveClasse.nom, moyenne: moyenneEleve }); // Ajouter la moyenne et l'ID de l'élève au tableau
  });

  // Trier le tableau des moyennes par ordre décroissant
  moyennesEleves.sort((a, b) => b.moyenne - a.moyenne);

  // Ajouter le rang à chaque élève dans le tableau moyennesEleves
  moyennesEleves.forEach((eleve, index) => {
    eleve.rang = index + 1; // Le rang est l'index + 1 dans le tableau trié
  });

  // Calculer le rang de l'élève actuel
  const eleveActuel = moyennesEleves.find(eleve => eleve.id === eleveActuelId);
  const rangEleveActuel = eleveActuel ? moyennesEleves.indexOf(eleveActuel) + 1 : '-';

  // Retourner le meilleur élève, la moyenne du premier et le rang de l'élève actuel
  const meilleurEleve = moyennesEleves[0]; // Le meilleur élève est le premier élève du tableau trié

  if (meilleurEleve) {
    console.log('Le meilleur élève de la classe est :', meilleurEleve.nom);
    console.log('Avec une moyenne de :', meilleurEleve.moyenne.toFixed(2));
  }

  return { meilleurEleve, moyennePremier: meilleurEleve ? meilleurEleve.moyenne.toFixed(2) : null, rangEleveActuel };
}
