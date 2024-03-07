import React, { useState } from 'react';

const StudentComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedTrimestre, setSelectedTrimestre] = useState('I'); // Par défaut, le trimestre I est sélectionné

  // Exemple de données
  const fakeStudents = [
    {
      id: 1,
      name: "John",
      surname: "Johnny",
      email: "john@example.com",
      numero: 123456789,
      fatherName: "Peter",
      motherName: "Mary",
      parentNumber: 987654321,
      classe: "10em",
      cle: "CLE_UNIQUE",
      role: "eleve",
      notes: [
        {
          trimestre: "I",
          matiere: "ID_DE_LA_MATIERE",
          notesDevoir: 0,
          noteCompo: 0
        },
       
      ]
    },
    {
      id: 2,
      name: "Jane",
      surname: "Janey",
      email: "jane@example.com",
      numero: 987654321,
      fatherName: "John",
      motherName: "Sarah",
      parentNumber: 123456789,
      classe: "11em",
      cle: "CLE_UNIQUE",
      role: "eleve",
      notes: [
        {
          trimestre: "II",
          matiere: "ID_DE_LA_MATIERE",
          notesDevoir: 17,
          noteCompo: 14
        },
        {
          trimestre: "III",
          matiere: "ID_DE_LA_MATIERE",
          notesDevoir: 18,
          noteCompo: 15
        }
      ]
    }
  ];

  // Filtrer les données en fonction de la recherche et du trimestre sélectionné
  const filteredData = fakeStudents.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.notes.some(note => note.trimestre === selectedTrimestre)
  );

  // Index du premier et du dernier élément sur la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change la page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fonction pour filtrer par trimestre
  const filterByTrimestre = (trimestre) => {
    setSelectedTrimestre(trimestre);
    setCurrentPage(1); // Réinitialiser la pagination à la première page lorsque le filtre est appliqué
  };

  return (
    <div className="container mt-5">
      <h2>Students</h2>
      {/* Barre de recherche */}
      <div className="d-flex align-items-center justify-content-between mb-3">
  <input
    type="text"
    className="form-control me-2 col-"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  
  {/* Boutons de filtre par trimestre */}
  <div className="btn-toolbar col-8" role="toolbar">
    <div className="btn-group me-2" role="group">
      <button type="button" className={`btn ${selectedTrimestre === 'I' ? 'btn-primary' : 'btn-secondary'} mx-1`} onClick={() => filterByTrimestre('I')}>Trimestre I</button>
      <button type="button" className={`btn ${selectedTrimestre === 'II' ? 'btn-primary' : 'btn-secondary'} mx-1`} onClick={() => filterByTrimestre('II')}>Trimestre II</button>
      <button type="button" className={`btn ${selectedTrimestre === 'III' ? 'btn-primary' : 'btn-secondary'} mx-1`} onClick={() => filterByTrimestre('III')}>Trimestre III</button>
    </div>
  </div>
</div>


      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Father's Name</th>
            <th scope="col">Note Devoir</th>
            <th scope="col">Note Compo</th>
            <th scope="col">Trimestre</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.id}</th>
              <td>{item.name}</td>
              <td>{item.surname}</td>
              <td>{item.fatherName}</td>
              <td>{item.notes.find(note => note.trimestre === selectedTrimestre)?.notesDevoir}</td>
              <td>{item.notes.find(note => note.trimestre === selectedTrimestre)?.noteCompo}</td>
              <td>{selectedTrimestre}</td>
              <td>
                <button type="button" className="btn btn-primary me-2">
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button type="button" className="btn btn-info">
                  <i className="fas fa-eye"></i> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default StudentComponent;
