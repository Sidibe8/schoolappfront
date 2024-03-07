import React, { useEffect, useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [cle, setCle] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem('token');
    if (token) {
      // Rediriger vers "/"
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      cle:cle,
      password: password
    };

    try {
      const response = await fetch('https://schoolappback-a58x.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        // console.log(response.json());
        const data = response.json();
        console.log(data.message);
        throw new Error('Login failed');


      }

      const data = await response.json();
      
      // Enregistrer le token dans les cookies
      document.cookie = `token=${data.token}; path=/;`;

      // Enregistrer le token et son expiration dans le localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      localStorage.setItem('tokenExpiration', new Date().getTime() + 24 * 60 * 60 * 1000); // 24 heures d'expiration

      // if (data.user.role === 'eleve') {
      //   // Rediriger vers la page "onlineresult/:id" si l'utilisateur est un élève
      //   navigate(`/onlineresult/${data.user._id}`);
      // } else {
      //   // Rediriger vers "/" pour les autres rôles
      // }
        navigate('/');

      toast.success(data.message);
    } catch (error) {
      toast.error( error.message);
      // Gérer les erreurs d'authentification ici
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Note+</h1>
          <p>Vueillez vous connectez a votre compte</p>
          <div className="input-group">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              id="text"
              name="cle"
              placeholder="Cle d'identification..."
              value={cle}
              onChange={(e) => setCle(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Connecter</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
