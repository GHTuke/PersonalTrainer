Lopputyö Frontend ohjelmointi kurssille, Haaga-helia kevät 2025.

## Tehtävän kuvaus:

Personal trainer yritys tarvitsee käyttöliittymän heidän nykyiseen back end:iin, johon tallennetaan heidän asiakastiedot. Tietokannassa on tiedot asiakkaista ja heidän harjoituksista. Back end tarjoaa REST API:n ja sen dokumentti sisältää tarvittavat tiedot käyttöliittymäkehitystä varten.

## GitHub pages linkki: https://ghtuke.github.io/PersonalTrainer/

## Osa 1:

Luo React sovellus, jossa on omat listasivut asiakkaille (customer) ja harjoituksille (training). Luo myös navigaatio, jolla sivujen välillä voi siirtyä.

Listasivujen minimivaatimukset:

* Järjestely (sorting)
* Tietojen haku/suodatus eri sarakkeiden perusteella
* Näytä myös asiakkaan nimi harjoitus -listasivulla
* Muotoile päivämäärä taulkossa esim. mutoon pp.kk.vvvv hh:mm

## Osa 2:

Lisää seuraavat CRUD toiminnallisuudet asiakas ja harjoitus listasivuille:

* Uuden asiakkaiden lisäys
* Asiakkaan muokkaus ja poisto
* Uuden harjoituksen lisääminen asiakkaalle. Käytä harjoituksen päivämäärän syöttöön jotain siihen soveltuvaa komponenttia
* Harjoituksen poisto

Lisää poistotoimintoihin myös vahvistus käyttäjältä.

## Osa 3:


* Lisää export toiminnallisuus, jolla käyttäjä voi viedä asiakastiedot CSV tiedostoon. Suodata tiedostosta pois kaikki ylimääräinen tieto (esim. painike sarakkeet)
* Lisää kalenterisivu, jossa näkyy kaikki varatut harjoitukset kalenterissa (viikkonäkymä, kuukausnäkymä, päivänäkymä). Kts. esimerkki kuva.
* Asenna käyttöliittymä valitsemallesi pilvipalvelimelle
