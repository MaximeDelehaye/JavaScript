var tableau=['LOUPER','BIJOUX','SURNOM','SOCIAL','CHARME','ARGILE','BRIQUE','BRESIL','CAHIER','COMPTE','COPAIN','DANSER','DEBOUT','DEVOIR','DICTER','DRAGON','DEGOUT','FARINE','FLUIDE','CLIMAT',           'GOUTER','ZOMBIE','YAOURT','VALISE','VAPEUR','VOLCAN','CHATON','UTOPIE','TOMBER','TACHER','SCHEMA','RAGOUT','SECOND','SONGER','SUIVRE','RAPIDE','MANGER','QUARTZ','PARDON','PARENT','PAREIL','PRISON','PRENOM','ORTEIL','NOMBRE','HANTER','JOYEUX','OISEAU','SAVEUR','PROJET'];

var mot=["","","","","","","","","",""]; //Tableau contenant les 10 mots affichés
var i; // Compteur
var bool=false; //Empeche l'utilisation du clavier avant d'avoir cliquer sur jouer 

var theme = document.querySelector('#theme'); // Musique de fond

function tableauMot(){
    // Change les 10 mots affichés
    for(i=0;i<=9;++i){
            var x= Math.floor(Math.random()*tableau.length); //Nombre aleatoire
            document.getElementById("mot"+(i+1)).innerHTML=tableau[x]; //Chaque div va prendre un mot aleatoire
            mot[i]=tableau[x]; //Chaque case du tableau va prendre le mot correspondant
            document.getElementById("mot"+(i+1)).style.color="black"; //Tous les mots sont noirs
    } 
}

tableauMot();

var nbFois=0; //Nombre de clic sur le bouton jouer
var partie=0;//Nombre de partie

document.getElementById("champReponse").disabled=true;

function compteRebours(){
    var  timer=60; // Temps du timer
    document.getElementById("timer").innerHTML=timer; //La div timer affiche la variable timer
    chrono=window.setInterval(function(){
        //Fonction qui se met a jour tous les 1 secondes
        document.getElementById("champReponse").focus(); //Focus sur l'input tous les 1 secondes
        timer=timer-1;
        document.getElementById("timer").innerHTML=timer; 
        document.getElementById("boutonJeux").disabled=true; //On ne peux plus cliquer sur le bouton jeux
        if(timer==0){
            theme.pause(); //La musique s'arrete
            window.clearInterval(chrono);
            document.getElementById("champReponse").disabled=true; // Plus rien ne s'afiche sur l input(bloqué)
            for(i=0;i<=9;++i){
                    document.getElementById("mot"+(i+1)).style.color="blue";
            }
            partie=1;
            bool=false; //Le clavier se desactive
            document.getElementById("boutonJeux").value="Rejouer"; // Affiche rejouer sur le bouton
            document.getElementById("resultat").innerHTML="Vous avez taper "+nbMot+" mots en une minute !";  // Affiche le nombre de mot
            document.getElementById("erreur").innerHTML="Vous avez faits "+nbErreur+" erreurs en une minute !"; // Affiche le nombre d erreurs
            document.getElementById("boutonJeux").disabled=false;   //On peut recliquer sur le bouton   
        }
    },1000);
}

function clic(){
  
   if(nbFois==0){
        //Rentre si c'esr la premiere fois que tu clique
        theme.play(); //Lance la musique
        document.getElementById("champReponse").disabled=false; //On peut acceder a l input
        bool=true; //On peut utiliser le clavier
        for(i=1;i<=10;++i){document.getElementById("mot"+i).style.display="inline";} //Les mots apparaisent
        compteRebours();
        nbFois=1; //Permet de ne plus cliquer sur le bouton
   }
   if(partie==1){window.location.reload();}// Recharge la partie
}

//Fontion personnage a modifier ////////////////////////////////////////////////////////////////////////////////////////
function deplacementImage(){
    deplacement=deplacement+20;
    document.getElementById("cheval").style.paddingLeft=deplacement+"px";
}


var compteurLettre=0; 
var compteurMot=1;
var tailleMot=mot[0].length;
var nbMot=0;
var erreur=0;
var reponse="";
var deplacement=20;
var nbErreur=0;

function changementMot(){
    compteurLettre=0; // renitialise le compteur lettre
    compteurMot=compteurMot+1; //Permet de passer au mot suivant
    if(compteurMot==11){
        // Rentre que si tous les mots ont eté fait
        compteurMot=1; //Remet a 1 le compteur mot
        tableauMot(); //Change les 10 mots
    }
    tailleMot=mot[(compteurMot-1)].length;
}

function clavier(){
    
    var clavier = true; //Var pour empecher de faire les 2 ifs qui suivent en meme temps
    
    if(bool==true){
        
        document.getElementById("champReponse").value=document.getElementById("champReponse").value.toUpperCase(); //Affiche les lettreen majuscule
        
        if((compteurLettre+1)>tailleMot){
         //Si le nombre de lettre est superieur a la taille du mot
            if(event.keyCode==32){
            //Si on appuye sur espace
                if(erreur==0){document.getElementById("mot"+compteurMot).style.color="green";} //Le mot actuel passe au vert
                changementMot(); //Chnage de mot
                nbMot=nbMot+1; //Compte le nombre de mot bon
                document.getElementById("compteurMot").innerHTML=nbMot+" mots"; //Affiche le nombre de mot bon
                document.getElementById("champReponse").value=" ";//Efface le mot dans l'input
                deplacementImage(); //Deplace l image
                clavier=false; //Empeche le if suivant
                erreur=0; //Les erreurs sont renitialisé a zero
            }

    }
        
        if(event.keyCode==32 && clavier==true){
            //Si on appuye sur espace et qu'on a pas executé le if precedent
             erreur=0;
             document.getElementById("mot"+compteurMot).style.color="red"; //Le mot actuel passe au rouge
             changementMot();
             document.getElementById("champReponse").value="";
             nbErreur=nbErreur+1; //Le nombre d erreurs augmente 1
             document.getElementById("compteurErreur").innerHTML=nbErreur+" erreurs"; //Affiche le nombre d'erreurs
        }
    
        if(event.keyCode==mot[(compteurMot-1)].charCodeAt(compteurLettre)&&erreur==0){
            //Si la lettre tapé correspond a la lettre actuel du mot actuel
            document.getElementById("mot"+compteurMot).style.color="green";
            compteurLettre=compteurLettre+1; //Passe a la lettre suivante
        } 
        else {
            if(event.keyCode!=8 && event.keyCode!=32 || (event.keyCode>=61 && event.keyCode<=90)|| (event.keyCode>=97 && event.keyCode<=122) || event.keyCode==128 || event.keyCode==144 || event.keyCode==212 || event.keyCode==183 ){
           //Si ce n'est pas supp ni espace et que c'est une lettre
            document.getElementById("mot"+compteurMot).style.color="red";
            erreur=erreur+1; //Les erreurs augmente de 1
        }
        }
        
        if(event.keyCode==8 && erreur>0){
            //Si c'est le bouton supp et si il y a plusieurs erreurs
            erreur=erreur-1; //Les erreurs diminue de 1
            if(erreur==0){
                // Si l'erreur passe a 0
                document.getElementById("mot"+compteurMot).style.color="green";
            }
        }

        if(erreur==0 && event.keyCode!=8 && event.keyCode!=32){
            //Si l'erreur est 0 et que ce n'est pas supp ou espace
            reponse=document.getElementById("champReponse").value; //Reponse prend le contenu
        }

        if(event.keyCode==8 && erreur==0 && compteurLettre!=0){
            //Si c est le bouton supp et que l erreur est 0 et que le compteur des lettre est egal a 0
            document.getElementById("champReponse").value=reponse; //L input affiche les bonnes lettres deja tapé
        }
         
    }
}





        