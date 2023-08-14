 //========================================================//
//Copyright © 2023 Hamza Ben Khlifa - All rights reserved.//
//========================================================//
exports.getDateNow = () => {
    const dateActuelle = new Date();
    const options = {year:'numeric', month:'long', day:'numeric', hour:'numeric', minute:'numeric', second:'numeric', timeZoneName:'short'};    
    return dateActuelle.toLocaleDateString("en-US",options);
  }