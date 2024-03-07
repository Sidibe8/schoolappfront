import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createUser, updateUserById, deleteUserById } from '../../actions/userActions';
import ProfUser from './profUser'
import AdminProfil from './AdminProfil'

const User = () => {

  const userStocked = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    numero: '',
    password: ''
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [vuForm, setVuForm] = useState(false)


  const toggleForm = () => setVuForm(!vuForm)

  const dispatch = useDispatch();
  const users = useSelector(state => state.userReducer.users);

  // console.log(users);

  useEffect(() => {
    setFormData({
      nom: '',
      prenom: '',
      adresse: '',
      email: '',
      numero: '',
      password: ''
    });
  }, [editingUserId]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingUserId) {
      dispatch(updateUserById(editingUserId, formData));
      setEditingUserId(null); // Reset editing mode after submit
    } else {
      dispatch(createUser(formData));
    }
  };

  const handleEdit = user => {
    setEditingUserId(user._id);
    setFormData({
      nom: user.nom,
      prenom: user.prenom,
      adresse: user.adresse,
      email: user.email,
      numero: user.numero,
      password: '' // Note: il est probablement préférable de ne pas inclure le mot de passe ici
    });
  };

  const handleDelete = userId => {
    dispatch(deleteUserById(userId));
  };

  const handleCancelEdit = () => {
    setEditingUserId(null); // Reset editing mode
    setFormData({
      nom: '',
      prenom: '',
      adresse: '',
      email: '',
      numero: '',
      password: ''
    });
  };

  const filteredUsers = users.filter(user => user.nom.toLowerCase().includes(filterName.toLowerCase()));

  return (
    <div className='container'>

      {userStocked && userStocked.role !== "teacher" ? (
        ''
      ) : (

        <ProfUser />
      )}
      {userStocked && userStocked.role === "admin" || userStocked && userStocked.role === "superAdmin" ? (
        // ''
        <AdminProfil />
      ) : (

        ''
      )}


      {userStocked && userStocked.role !== "superAdmin" ? (
        ''
      ) : (
        <div>
          <div className="row">
            <button style={{
              width: 200
            }} onClick={toggleForm} className="my-5">{vuForm ? 'Fermer Le formulaire' : "Ouvrir le formulaire"}</button>
          </div>

          {vuForm && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">Nom</label>
                <input type="text" className="form-control" id="nom" name="nom" value={formData.nom} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">Prénom</label>
                <input type="text" className="form-control" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="adresse" className="form-label">Adresse</label>
                <input type="text" className="form-control" id="adresse" name="adresse" value={formData.adresse} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="numero" className="form-label">Numéro</label>
                <input type="text" className="form-control" id="numero" name="numero" value={formData.numero} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary me-2">{editingUserId ? 'Modifier' : 'Ajouter'}</button>
              {editingUserId && <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Annuler</button>}
            </form>

          )
          }
          <h2>Liste des Admins.</h2>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Filtrer par nom..."
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
          />
          <ul className="list-group">
            {filteredUsers.map(user => (
              <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  {user.nom} {user.prenom} - +223 {user.numero} - {user.adresse} - {user.cle} - {user.email} - {user.role}
                </div>
                <div>
                  {/* <button onClick={() => handleEdit(user)} className="btn btn-warning me-2">Modifier</button> */}

                  {
                    userStocked && userStocked.role !== "superAdmin" ? (
                      ''
                    ) : (
                      <button onClick={() => handleDelete(user._id)} className='btn'>
                        <i className="fas fa-trash text-danger"></i> Supprimer
                      </button>
                    )
                  }

                </div>
              </li>
            ))}
          </ul>


        </div>

      )}


    </div>
  );
};

export default User;
