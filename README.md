# London Trip 2026 — guida di viaggio interattiva

Web app personale per il viaggio a Londra, **31 ottobre – 2 novembre 2026** (2 adulti, Stansted + Stansted Express Duo Return, hotel a Brick Lane).
Interfaccia in italiano, pensata per lo smartphone ma funziona anche da computer.

## Come aprirla

- **Online (consigliato):** apri l'indirizzo GitHub Pages del repository. Su Android/Chrome: menu ⋮ → *Aggiungi a schermata Home* (o *Installa app*). Dopo la prima apertura con Internet, l'app resta disponibile anche con poca rete (la mappa mostra solo le zone già viste).
- **Senza hosting:** scarica `index.html` e aprilo dal telefono. Funziona (itinerario, biglietti, info, link Google Maps), ma senza installazione come app e senza uso offline: il browser non permette il service worker da file locali.

Serve Internet per: tessere della mappa (OpenStreetMap), foto (Wikipedia), meteo (Open-Meteo). Se non sono disponibili, l'app mostra un'alternativa e i link a Google Maps continuano a funzionare.

## Come modificare i contenuti

Tutto è in `index.html`, nella sezione `<script>`:

| Cosa | Dove |
|---|---|
| Tappe (nome, orario, indirizzo, coordinate, descrizione, prezzi) | `BASE_STOPS` |
| Biglietti e prenotazioni | `TICKETS` |
| Date, orario di atterraggio/decollo | `TRIP` |
| Elenco "non verificato" | `UNVERIFIED` |
| Colori e tema | variabili CSS in cima (`:root`) |

Ogni informazione ha un livello di affidabilità (`v`): `2` verificato su pagina ufficiale il 26/10/2026, `1` fonte non ufficiale/da riconfermare, `0` da verificare, `3` dato fornito da te. Le coordinate sono approssimative (±100 m): la navigazione usa nome e indirizzo, non le coordinate.

Gli orari, l'ordine, le note, le tappe aggiunte e i biglietti segnati si modificano **dall'app** e restano salvati solo sul dispositivo (localStorage). Da *Info* puoi esportare/importare un file JSON per trasferirli o fare una copia.

Per aggiornare l'app online dopo una modifica: sostituisci `index.html` nel repository e fai commit. Se non vedi la nuova versione, chiudi e riapri l'app (il service worker aggiorna la cache in background).

## Prova rapida

Aggiungi `?now=2026-11-01T10:30` all'indirizzo per simulare data e ora di Londra (utile per vedere la modalità "Sono in viaggio").

## Fonti

Pagine ufficiali consultate il 26/10/2026: Natural History Museum, Stansted Express, Westminster Abbey, London Eye, St Paul's Cathedral, Camden Market. Mappe © OpenStreetMap contributors · Foto: Wikipedia/Wikimedia Commons · Meteo: Open-Meteo.
