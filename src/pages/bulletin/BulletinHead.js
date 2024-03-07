import React from 'react'

function BulletinHead({ eleve, nomTrimestre }) {
    return (
        <div>
            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" bgcolor="">
                <tbody>
                    <tr>
                        <td height="20"></td>
                    </tr>
                </tbody>
            </table>
            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" bgcolor="">
                <tbody>
                    <tr>
                        <td>
                            <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" bgcolor="#ffffff" style={{ borderRadius: '10px 10px 0 0' }}>
                                <tbody>
                                    <tr className="hiddenMobile">
                                        <td height="40"></td>
                                    </tr>
                                    <tr className="visibleMobile">
                                        <td height="30"></td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" className="fullPadding">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" className="col">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left"> <img src="https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png" width="32" height="32" alt="logo" border="0" /></td>
                                                                    </tr>
                                                                    <tr className="hiddenMobile">
                                                                        <td height="40"></td>
                                                                    </tr>
                                                                    <tr className="visibleMobile">
                                                                        <td height="20"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ fontSize: '12px', color: '#5b5b5b', fontFamily: 'Open Sans, sans-serif', lineHeight: '18px', verticalAlign: 'top', textAlign: 'left' }}>
                                                                            {eleve?.nom} {eleve?.surnom}
                                                                            <br />{eleve?.classe?.nom}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" className="col">
                                                                <tbody>
                                                                    <tr className="visibleMobile">
                                                                        <td height="20"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td height="5"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ fontSize: '21px', color: '#ff0000', letterSpacing: '-1px', fontFamily: 'Open Sans, sans-serif', lineHeight: '1', verticalAlign: 'top', textAlign: 'right' }}>
                                                                            Bulletin
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="hiddenMobile">
                                                                        <td height="50"></td>
                                                                    </tr>
                                                                    <tr className="visibleMobile">
                                                                        <td height="20"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ fontSize: '12px', color: '#5b5b5b', fontFamily: 'Open Sans, sans-serif', lineHeight: '18px', verticalAlign: 'top', textAlign: 'right' }}>
                                                                            <small>Note+</small> Kati Fouga<br />
                                                                            <small>{nomTrimestre} Trimestre</small>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
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
    )
}

export default BulletinHead