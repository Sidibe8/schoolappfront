import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './bulletin.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEleveById } from '../../actions/eleveActions';
import { getClasseById } from '../../actions/classeByIdActions';
import BulletinHead from './BulletinHead';
import { calculerMeilleurEleve } from './calculNotes';
import BackButton from '../../components/backBtn/Backbtn';
import ReactToPrint from 'react-to-print';
function Bulletin() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEleveById(id));
  }, [dispatch, id]);

  const eleve = useSelector(state => state.eleveByIdReducer.eleve);
  const trimestres = useSelector(state => state.trimestreReducer.trimestres);

  useEffect(() => {
    if (eleve && eleve.classe && eleve.classe._id) {
      dispatch(getClasseById(eleve.classe._id));
    }
  }, [dispatch, eleve]);

  const classe = useSelector(state => state.classeByIdReducer.classe);
  const elevesInClasse = useSelector(state => state.elevesByClasseReducer.eleves);

  // console.log('fssfjskfjs', classe);

  const [trimestreSelectionne, setTrimestreSelectionne] = useState('');
  const [rangMeilleurEleve, setRangMeilleurEleve] = useState(null);
  const [meilleureMoyenne, setMeilleureMoyenne] = useState(0);
  const [moyenne, setMoyenne] = useState(null);
  const [rangEleve, setRangEleve] = useState(null);
  const [somme, setSomme]=useState(null)

  const handleChangeTrimestre = event => {
    setTrimestreSelectionne(event.target.value);
  };

  useEffect(() => {
    if (eleve && classe && trimestreSelectionne) {
      const sommeProduits = classe.coefInfo.reduce((acc, info) => {
        const matiereId = info.matiere._id;
        const noteDevoir = eleve.notes ? eleve.notes.find(note => note.matiere._id === matiereId && note.trimestre === trimestreSelectionne)?.notesDevoir : '-';
        const noteCompo = eleve.notes ? eleve.notes.find(note => note.matiere._id === matiereId && note.trimestre === trimestreSelectionne)?.noteCompo : '-';
        const total = (parseFloat(noteDevoir) + parseFloat(noteCompo * info.coef)) || '-';
        return acc + (total !== '-' ? parseFloat(total) : 0);
      }, 0);

      const sommeCoefficients = classe.coefInfo.reduce((acc, info) => acc + parseFloat(info.coef), 0);

      const moyenneCalculee = sommeProduits / sommeCoefficients;
      setMoyenne(moyenneCalculee);
    }
  }, [eleve, classe, trimestreSelectionne]);


  useEffect(() => {
    if (elevesInClasse && classe && trimestreSelectionne) {
      // Appel de la fonction calculerMeilleurEleve pour obtenir les informations nécessaires
      const { meilleurEleve, moyennePremier, rangEleveActuel, sommeTotals } = calculerMeilleurEleve(elevesInClasse, classe, trimestreSelectionne, eleve?._id);

      // Mettre à jour les états avec les valeurs obtenues
      setRangMeilleurEleve(meilleurEleve?.rang || '-');
      setMeilleureMoyenne(moyennePremier || '-');
      setRangEleve(rangEleveActuel || '-');
      // setSomme(sommeTotals)
    }
  }, [elevesInClasse, classe, trimestreSelectionne, eleve]);




  // const handlePrint = () => {
  //   const printableContent = document.getElementById('printable-content');
  //   const originalContents = document.body.innerHTML;
  //   const printContents = printableContent.innerHTML;
  //   document.body.innerHTML = printContents;
  //   window.print();
  //   document.body.innerHTML = originalContents;
  // };

  const ref = useRef(null);

  // if (!Array.isArray(eleve)) {
  //   return (
  //     <div className='container my-4 d-flex justify-content-center align-items-center flex-column' style={{height: "70vh"}}>
  //       <div className="spinner-border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //       <br />
  //       <small>No classes to show</small>
  //     </div>
  //   );
  // }

  return (
    <div className="bull">
      <div className="" style={{
        width: 200,display:'flex', alignItems: 'center',justifyContent: 'center'
      }}>
        <select value={trimestreSelectionne} onChange={handleChangeTrimestre}>
          <option value='000'>Sélectionnez un trimestre</option>
          {trimestres.map(trimestre => (
            <option key={trimestre._id} value={trimestre._id}>{trimestre.nom}</option>
          ))}
        </select>


        {/* <div style={{ width: 200}}> */}
        <ReactToPrint
          trigger={() => <button className='btn my-2' style={{display:'flex', alignItems: 'center',justifyContent: 'center'}}><i className="fas fa-print mx-2"></i> Imprimer</button>}
          content={() => ref.current}
        />

        {/* <button className='btn my-2' >
        <i className="fas fa-print"></i> Imprimer
        </button> */}
        {/* </div> */}


        {/* <div  style={{ width: 200}}> */}

        {/* <BackButton/> */}
        {/* </div> */}
      </div>

      <div className="my-5" id="printable-content" ref={ref}>
        <BulletinHead eleve={eleve} nomTrimestre={trimestreSelectionne && trimestres.find(trimestre => trimestre._id === trimestreSelectionne)?.nom} />

        <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" bgcolor>
          <tbody>
            <tr>
              <td>
                <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" bgcolor="#ffffff">
                  <tbody>
                    <tr className="hiddenMobile">
                      <td height="60"></td>
                    </tr>
                    <tr className="visibleMobile">
                      <td height="40"></td>
                    </tr>
                    <tr>
                      <td>
                        <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" className="fullPadding">
                          <tbody>
                            <tr>
                              <th style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#5b5b5b', fontWeight: 'normal', lineHeight: '1', verticalAlign: 'top', padding: '0 10px 7px 0' }} width="50%" align="left">
                                Matières
                              </th>
                              <th style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#5b5b5b', fontWeight: 'normal', lineHeight: '1', verticalAlign: 'top', padding: '0 0 7px' }} align="left">
                                <small>Devoir</small>
                              </th>
                              <th style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#5b5b5b', fontWeight: 'normal', lineHeight: '1', verticalAlign: 'top', padding: '0 0 7px' }} align="center">
                                Compo.
                              </th>
                              <th style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#1e2b33', fontWeight: 'normal', lineHeight: '1', verticalAlign: 'top', padding: '0 0 7px' }} align="right">
                                Coef
                              </th>
                              <th style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#1e2b33', fontWeight: 'normal', lineHeight: '1', verticalAlign: 'top', padding: '0 0 7px' }} align="right">
                                Total
                              </th>
                            </tr>
                            <tr>
                              <td height="1" style={{ background: '#bebebe' }} colSpan="4"></td>
                            </tr>
                            <tr>
                              <td height="10" colSpan="4"></td>
                            </tr>
                            {classe && classe.coefInfo.map((info, index) => {
                              const matiereId = info.matiere._id;
                              const matiere = info.matiere;

                              const note = eleve && eleve.notes ? eleve.notes.find(note => note.matiere._id === matiereId && note.trimestre === trimestreSelectionne) : null;
                              const noteDevoir = note ? note.notesDevoir : '-';
                              const noteCompo = note ? note.noteCompo : '-';
                              const total = (parseFloat(noteDevoir) + parseFloat(noteCompo * info.coef)) || '-';
                              // const rangEleve = calculerRang(eleve, elevesInClasse);
                              // console.log('rangEleve', rangEleve);

                              return (
                                <tr key={index}>
                                  <td style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#ff0000', lineHeight: '18px', verticalAlign: 'top', padding: '10px 0' }} className="article">
                                    {matiere.nom}
                                  </td>
                                  <td style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#646a6e', lineHeight: '18px', verticalAlign: 'top', padding: '10px 0' }}><small>{noteDevoir !== '-' ? noteDevoir : '-'}</small></td>
                                  <td style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#646a6e', lineHeight: '18px', verticalAlign: 'top', padding: '10px 0' }} align="left">{noteCompo !== '-' ? noteCompo : '-'}</td>
                                  <td style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#1e2b33', lineHeight: '18px', verticalAlign: 'top', padding: '10px 0' }} align="left"> {info.coef}</td>
                                  <td style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#1e2b33', lineHeight: '18px', verticalAlign: 'top', padding: '10px 0' }} align="left">{total !== '-' ? total : '-'}</td>
                                </tr>
                              );
                            })}
                            <tr>
                              <td height="1" colSpan="4" style={{ borderBottom: '1px solid #e4e4e4' }}></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td height="20"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" bgcolor>
          <tbody>
            <tr>
              <td>
                <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" bgcolor="#ffffff">
                  <tbody>
                    <tr>
                      <td>
                        <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" className="fullPadding">
                          <tbody>
                            {/* <tr>
                              <td style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#646a6e', lineHeight: '22px', verticalAlign: 'top', textAlign: 'right' }}>
                                Total
                              </td>
                              <td style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#646a6e', lineHeight: '22px', verticalAlign: 'top', textAlign: 'right', whiteSpace: 'nowrap' }} width="80">
                                {somme !== null ? somme : '-'}
                              </td>
                            </tr> */}
                            <tr>
                              <td style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#646a6e', lineHeight: '22px', verticalAlign: 'top', textAlign: 'right' }}>
                                Moyen
                              </td>
                              <td style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#646a6e', lineHeight: '22px', verticalAlign: 'top', textAlign: 'right', whiteSpace: 'nowrap' }} width="80">
                                {moyenne !== null ? moyenne.toFixed(2) : '-'}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#646a6e', lineHeight: '22px', verticalAlign: 'top', textAlign: 'right' }}>
                                Rang
                              </td>
                              <td style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#646a6e', lineHeight: '22px', verticalAlign: 'top', textAlign: 'right', whiteSpace: 'nowrap' }} width="80">
                                {rangEleve !== null ? rangEleve : '-'}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#646a6e', lineHeight: '22px', verticalAlign: 'top', textAlign: 'right' }}>
                                Moyenne Premier
                              </td>
                              <td style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#646a6e', lineHeight: '22px', verticalAlign: 'top', textAlign: 'right', whiteSpace: 'nowrap' }} width="80">
                                {meilleureMoyenne}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td height="20"></td>
                    </tr>
                  </tbody>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" bgcolor>
                  <tbody>
                    <tr>
                      <td height="40"></td>
                    </tr>
                    <tr>
                      <td>
                        <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" bgcolor="#ffffff" style={{ borderRadius: '0 0 10px 10px', marginTop: '-50px', padding: "10px 5px" }}>

                          {/* partie signature */}
                          <tbody >
                            <tr >
                              <td style={{ padding: "10px 60px", fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#5b5b5b', fontWeight: 'normal', lineHeight: '1', verticalAlign: 'top' }}   >

                                Censeur
                              </td>
                              <td style={{ padding: "10px 60px", fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#5b5b5b', fontWeight: 'normal', lineHeight: '1', verticalAlign: 'top' }}>

                                Parent
                              </td>
                            </tr>
                            <tr >
                              <td style={{ padding: "10px 60px", fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#5b5b5b', fontWeight: 'normal', lineHeight: '1', verticalAlign: 'top' }}>

                                Mr. Siibe
                              </td>
                            </tr>
                            <tr >
                              <td style={{ padding: "10px 60px", fontSize: '12px', fontFamily: 'Open Sans, sans-serif', color: '#5b5b5b', fontWeight: 'normal', lineHeight: '1', verticalAlign: 'top' }}>


                              </td>
                            </tr>
                          </tbody>
                          {/* partie signature end */}
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

      </div>


      <BackButton />
    </div>
  );
}

export default Bulletin;
