// Fonction pour extraire le token du cookie
const getTokenFromCookie = () => {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    return cookieValue;
  };
  
  export default getTokenFromCookie;
  