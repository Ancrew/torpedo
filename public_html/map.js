var kockaMeret = 23;
var palyaSzelesseg = 9;
var palyaMagassag = 8;
var kettesHajoDb = 2;
var harmasHajoDb = 2;
var negyesHajoDb = 1;
var otosHajoDb = 1;
var kettesHajoMeret = 2;
var harmassHajoMeret = 3;
var negyessHajoMeret = 4;
var otosHajoMeret = 5;
var mapDivek = [];
var lerak = false;
var hossz = 0;
var lerakottak = [];
var sikeresLerakas = false;
var hosszaban = true;
var mindLerakva=false;
var maradt=0;


init();
function init() {
    makePalya();
    makeHajok();
    hajoSzamolo();
}
function hajoSzamolo(){
    maradt+=kettesHajoDb;
    maradt+=harmasHajoDb;
    maradt+=negyesHajoDb;
    maradt+=otosHajoDb;
}

function forgat(nev) {
    kivalaszto(nev);
    let indexek = kivalaszto(nev)
    let sor = indexek[0];
    let oszlop = indexek[1];
    let ujHossz = hossz;
    if (!this.hosszaban) {
        this.hosszaban = true;
        for (var i = 0; i < ujHossz; i++) {
            if (oszlop + hossz > mapDivek.length) {
                ujHossz = ujHosszSzamolo(oszlop) + 1;
            }
            if (mapDivek[sor][oszlop + i].className !== "foglalt")
                mapDivek[sor][oszlop + i].className = "szabad";
        }
    } else {

        this.hosszaban = false;
        for (var i = 0; i < ujHossz; i++) {
            if (sor + hossz > mapDivek.length) {
                ujHossz = ujHosszSzamolo(sor) - 1;
            }
            if (mapDivek[sor + i][oszlop].className !== "foglalt")
                mapDivek[sor + i][oszlop].className = "szabad";
        }
    }
}
function makePalya() {
    let tartalmazo = document.getElementById("tartalmazo");
    let hajok = document.getElementById("hajok");
    document.body.style.gridTemplateRows = "" + palyaMagassag * (kockaMeret + 3) + "px " + 6 * ((kockaMeret + 15) / 2) + "px";
    hajok.style.width = palyaSzelesseg * (kockaMeret + 2) + "px";
    hajok.style.height = 8 * (kockaMeret / 3) + "px";
    hajok.style.margin = "auto";
    hajok.style.marginTop = "3px";
    hajok.style.placeItems = "center";
    tartalmazo.style.gridTemplateColumns = "repeat(" + palyaSzelesseg + ", 1fr)";
    tartalmazo.style.gridTemplateRows = "repeat(" + palyaMagassag + ", 1fr)";

    for (var i = 0; i < palyaMagassag; i++) {
        mapDivek[i] = [];
        for (var x = 0; x < palyaSzelesseg; x++) {
            let nev = "p" + i + "." + x;
            makeDiv(nev, "tartalmazo");
            let ujDiv = document.getElementById(nev);
            mapDivek[i].push(ujDiv);

            ujDiv.onmouseout = function () {
                ellenorzo(ujDiv)
            };
            ujDiv.onmouseover = function () {
                szinezo(nev, "green")
            };
            ujDiv.addEventListener("click", function () {
                tisztit(nev)
            });
            ujDiv.addEventListener("wheel", function () {
                forgat(nev)
                szinezo(nev, "green")

            });
        }
    }
}

function ellenorzo(divem) {
    let indexek = kivalaszto(divem.id);
    let sor = indexek[0];
    let oszlop = indexek[1];
    let ujHossz = hossz;
    switch (hosszaban) {
        case true:
            if (lerak) {
                if (sor + hossz > mapDivek.length) {
                    ujHossz = ujHosszSzamolo(sor);
                }

                for (var i = 0; i < ujHossz + 1; i++) {
                    if (sor + i < mapDivek.length && mapDivek[sor + i][oszlop].className !== "foglalt") {
                        mapDivek[sor + i][oszlop].className = "szabad";
                    }
                }
            }
            break;
        case false:
            if (lerak) {
                if (oszlop + hossz > mapDivek[0].length) {
                    ujHossz = ujHosszSzamolo(oszlop);
                }

                for (var i = 0; i < ujHossz + 1; i++) {
                    if (oszlop + i < mapDivek[0].length && mapDivek[sor][oszlop + i].className !== "foglalt") {
                        mapDivek[sor][oszlop + i].className = "szabad";
                    }
                }
            }
            break;
    }
}



function makeDiv(nev = "", anya, szin = "blue", pozRow = - 1, pozColumn = - 1, meret = kockaMeret, hajo = false, merete = 0) {
    let divem = document.createElement("div");
    divem.id = nev;
    let hossza = merete;
    document.getElementById(anya).appendChild(divem);
    let ujDiv = document.getElementById(nev);
    ujDiv.style.height = meret + "px";
    ujDiv.style.width = meret + "px";
    ujDiv.style.border = "1px solid black";
    if (anya === "tartalmazo") {
        ujDiv.className = "szabad";
    }
    if (pozRow >= 0 && hajo) {
        ujDiv.style.display = "grid";
        ujDiv.style.gridRow = ++pozColumn + "\/" + ++pozColumn;
        ujDiv.style.padding = "2px";
        ujDiv.style.cursor = "pointer";
        ujDiv.style.margin = "auto";
        ujDiv.style.background = "green";
        ujDiv.addEventListener("click", function () {
            lepakol(hossza);
        });
    }
    if (pozRow >= 0 && !hajo) {
        ujDiv.style.gridColumn = ++pozRow + "\/" + ++pozRow;
        ujDiv.style.gridTemplateRows = "repeat(5, 1fr)";
        ujDiv.style.width = meret / 3 + "px";
        ujDiv.style.height = 80 + "px";
        ujDiv.style.border = "none";
}
}

function makeHajok() {
    let meret = kockaMeret / 3 + 2;
    let hajok = [];
    if (kettesHajoDb > 0) {
        hajok[hajok.length] = {nev: "kettesHajo", meret: 2, dbSzam: kettesHajoDb};
    }
    if (harmasHajoDb > 0)
        hajok[hajok.length] = {nev: "harmasHajo", meret: 3, dbSzam: harmasHajoDb};
    if (negyesHajoDb > 0)
        hajok[hajok.length] = {nev: "negyesHajo", meret: 4, dbSzam: negyesHajoDb};
    if (otosHajoDb > 0)
        hajok[hajok.length] = {nev: "otosHajo", meret: 5, dbSzam: otosHajoDb};
    let merete;
    for (var i = 0; i < hajok.length; i++) {
        makeDiv(hajok[i].nev, "hajok", "none", i, i, hajok.length * (meret + 3));
        for (var x = 0; x < hajok[i].meret; x++) {
            let ujNev = hajok[i].nev + "[" + x + "]";
            merete = hajok[i].meret;
            makeDiv(ujNev, hajok[i].nev, "green", i, x, meret / 2 + 3, true, merete);
        }

    }
}


function szinezo(nev, szin, keret = false, elmozditottak = false) {
    sikeresLerakas = false;
    let indexek = kivalaszto(nev);                                         //a nev a div amin az eger all, a cel pedig vagy a hajo elemei, vagy a körülötte lévő keret
    let oszlop = indexek[0];
    let sor = indexek[1];
    let valid = [true, false];
    let kellszamolni = false;
    let ujHossz = hossz;
    switch (hosszaban) {
        case true:
            if (lerak && mapDivek[oszlop][sor].className !== "foglalt") {
                for (var i = 0; i < hossz; i++) {
                    if (oszlop >= mapDivek.length - ujHossz + 1 || mapDivek[oszlop + i][sor].className === "foglalt" && lerak)
                        kellszamolni = true;
                }
                if (kellszamolni) {
                    ujHossz = ujHosszSzamolo(oszlop);

                    for (var i = 0; i < ujHossz; i++) {
                        if (mapDivek[oszlop + i][sor].className != "foglalt")
                            mapDivek[oszlop + i][sor].className = "hibas";
                    }
                }
            }
//            }
            if (oszlop < mapDivek.length - hossz + 1) {
                for (var i = 0; i < hossz; i++) {
                    if (mapDivek[oszlop + i][sor].className == "foglalt" || mapDivek[oszlop + i][sor].style.background == "gray")
                        valid[0] = false;
                    if (mapDivek[oszlop + i][sor].style.background == "gray")
                        valid[1] = true;
                }
                if (valid[0] && !valid[1] && this.lerak) {
                    for (var i = 0; i < hossz; i++) {
                        mapDivek[oszlop + i][sor].className = "sikeres";
                        sikeresLerakas = true;
                    }
                }
            }

            if (keret && !valid[1]) {
                let keretIndexek = [[]];
                keretIndexek = keretSzamolo(oszlop, sor);
                let ujOszlop;
                let ujSor;
                let ujSorIndex = 0;
                for (var i = oszlop - 1; i < keretIndexek.length; i++) {
                    ujOszlop = i;
                    for (var z = 0; z < keretIndexek[i].length; z++) {
                        ujSor = keretIndexek[i][z];
                        mapDivek[ujOszlop][ujSor].style.background = szin;
                        mapDivek[ujOszlop][ujSor].className = "foglalt";
                    }
                    ujSorIndex++;
                }
            }
            break;
        case false:
            if (lerak && mapDivek[oszlop][sor].className !== "foglalt") {
                for (var i = 0; i < hossz; i++) {
                    if (sor >= mapDivek.length - ujHossz + 1 || mapDivek[oszlop][sor + i].className === "foglalt" && lerak)
                        kellszamolni = true;
                }
                if (kellszamolni) {
                    ujHossz = ujHosszSzamolo(sor);

                    for (var i = 0; i < ujHossz; i++) {
                        if (mapDivek[oszlop][sor + i].className != "foglalt")
                            mapDivek[oszlop][sor + i].className = "hibas";
                    }
                }
            }
            if (sor < mapDivek[0].length - hossz + 1) {
                for (var i = 0; i < hossz; i++) {
                    if (mapDivek[oszlop][sor + i].className == "foglalt" || mapDivek[oszlop][sor + i].style.background == "gray")
                        valid[0] = false;
                    if (mapDivek[oszlop][sor + i].style.background == "gray")
                        valid[1] = true;
                }
                if (valid[0] && !valid[1] && this.lerak) {
                    for (var i = 0; i < hossz; i++) {
                        mapDivek[oszlop][sor + i].className = "sikeres";
                        sikeresLerakas = true;
                    }
                }
            }

            if (keret && !valid[1]) {
                let keretIndexek = [[]];
                keretIndexek = keretSzamolo(oszlop, sor);
                let ujOszlop;
                let ujSor;
                let ujSorIndex = 0;
                for (var i = oszlop - 1; i < keretIndexek.length; i++) {
                    ujOszlop = i;
                    for (var z = 0; z < keretIndexek[i].length; z++) {
                        ujSor = keretIndexek[i][z];
                        mapDivek[ujOszlop][ujSor].style.background = szin;
                        mapDivek[ujOszlop][ujSor].className = "foglalt";
                    }
                    ujSorIndex++;
                }
            }
}
}

function ujHosszSzamolo(oszlop) {
    ujHossz = hossz;
    switch (hosszaban) {
        case true:
            while (oszlop >= mapDivek.length - ujHossz + 1) {
                ujHossz--;
            }
            break;
        case false:

            while (oszlop >= mapDivek[0].length - ujHossz + 1) {
                ujHossz--;
            }
            break;
    }
    return ujHossz;
}
function keretSzamolo(oszlop, sor) {
    let keretIndexek = [];
    let mehet = false;
    let ujIndex = 0;                                                              //azért kell, mert ha I-től számozom az indexet elcsúszik a keret(kimaradna a lista első pár eleme)
    switch (hosszaban) {
        case true:
        {
            for (var i = oszlop - 1; i <= oszlop + hossz; i++) {
                keretIndexek[i] = [];
                for (var e = -1; e <= 1; e++) {
                    mehet = false;
                    let ujId = parseInt(sor + e);
                    if (ujId >= 0 && ujId < palyaSzelesseg && i >= 0 && i < palyaMagassag) {
                        mehet = true;
                    }
                    if (mehet && (i < oszlop || i >= oszlop + hossz)) {
                        keretIndexek[i].push(ujId);
                    }
                    if (e !== 0 && i >= oszlop && i < oszlop + hossz && mehet) {
                        keretIndexek[i].push(ujId);
                    }
                }
                ujIndex++;
            }
            break;
        }
        case false:
            {
                for (var i = -1; i <= 1; i++) {
                    if (oszlop + i < mapDivek.length) {
                        keretIndexek[oszlop + i] = [];
                        for (var e = sor - 1; e <= sor + hossz; e++) {
                            mehet = false;
                            let ujId = parseInt(e);
                            if (ujId >= 0 && ujId < palyaSzelesseg && oszlop + i >= 0) {
                                mehet = true;
                            }
                            if (mehet && (e < sor || e > sor + hossz - 1)) {
                                keretIndexek[oszlop + i].push(ujId);
                            }
                            if (i !== 0 && e >= sor && e < sor + hossz && mehet) {
                                keretIndexek[oszlop + i].push(ujId);
                            }
                        }
                        ujIndex++;
                    }
                }
            }
            break;
    }
    return keretIndexek;
}

function lepakol(hossz) {
    this.hossz = hossz;
    if (lerak)
        this.lerak = false;
    else {
        this.lerak = true;
    }
    switch (hossz) {
        case 2:
            if (kettesHajoDb < 1) {
                this.lerak = false;
                document.getElementById("kettesHajo").style.background = "red";
            }
            break;

        case 3:

            if (harmasHajoDb < 1) {
                this.lerak = false;
                document.getElementById("harmasHajo").style.background = "red";
            }
            break;
        case 4:
            if (negyesHajoDb < 1) {


                this.lerak = false;
                document.getElementById("negyesHajo").style.background = "red";
            }
            break;
        case 5:
            if (otosHajoDb < 1) {
                this.lerak = false;
                document.getElementById("ötösHajo").style.background = "red";
            }
            break;
    }
    return hossz;
}

function tisztit(nev) {
    if (sikeresLerakas) {
        if (lerak) {
            let indexek = kivalaszto(nev);
            let oszlop = indexek[0];
            let sor = indexek[1];
            if (hosszaban) {
                for (var i = 0; i < hossz; i++) {
                    mapDivek[oszlop + i][sor].className = "foglalt";
                }
            } else {
                for (var i = 0; i < hossz; i++) {
                    mapDivek[oszlop][sor + i].className = "foglalt";
                }
            }
            switch (hossz) {
                case 2:
                    kettesHajoDb--;
                    if (kettesHajoDb < 1)
                        document.getElementById("kettesHajo").style.background = "red";
                    break;
                case 3:
                    harmasHajoDb--;
                    if (harmasHajoDb < 1)
                        document.getElementById("harmasHajo").style.background = "red";
                    break;
                case 4:
                    negyesHajoDb--;
                    if (negyesHajoDb < 1)
                        document.getElementById("negyesHajo").style.background = "red";
                    break;
                case 5:
                    otosHajoDb--;
                    if (otosHajoDb < 1)
                        document.getElementById("otosHajo").style.background = "red";
                    break;
            }
        }
        this.lerak = false;
        szinezo(nev, "gray", true);
        jatekIndito();
    }
}

function jatekIndito(){
 maradt--;
 if (maradt===0){
     alert("Indulhat a móka!");
 }
}

function kivalaszto(nev) {                                                       //index0=oszlop index[1]=sor!
    let megvan = false;
    let oszlop = 0;
    let sor = 0;
    let eredmeny = [];
    while (oszlop < mapDivek.length && !megvan) {
        sor = 0;
        while (sor < mapDivek[oszlop].length && !megvan) {
            if (mapDivek[oszlop][sor] === document.getElementById(nev)) {
                megvan = true;
                eredmeny[0] = oszlop;
                eredmeny[1] = sor;
            } else {
                sor++;
            }
        }
        if (!megvan) {
            oszlop++;
        }
    }
    return eredmeny;
}