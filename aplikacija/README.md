# Program lojalnosti Maestro

Aplikacija predstavlja spletni portal za program lojalnosti trgovske verige Maestro. Uporabnikom omogoča prijavo, registracijo, pregled točk zvestobe, pregled transakcij, koriščenje nagrad in urejanje profila. Administratorski del omogoča pregled uporabnikov, upravljanje nagrad, dodajanje transakcij, mesečni obračun točk in pregled statistike.

## Funkcionalnosti

### Uporabnik
- registracija in prijava v sistem
- pregled trenutnega statusa in zbranih točk
- pregled zgodovine transakcij
- pregled mesečnih obračunov
- koriščenje razpoložljivih nagrad
- urejanje osebnih podatkov
- sprememba gesla

### Administrator
- pregled uporabnikov
- dodajanje in brisanje nagrad
- dodajanje transakcij za uporabnike
- mesečni obračun točk
- pregled osnovne statistike
- izvoz poročila

## Pravila programa lojalnosti

Uporabnik ima ob registraciji status **osnovni**.

Statusi programa:
- osnovni
- bronasti
- srebrni
- zlati

Točke se ne dodelijo takoj ob transakciji, ampak se izračunajo pri mesečnem obračunu za izbrani mesec. Pri obračunu se najprej preveri in po potrebi spremeni status uporabnika, nato pa se glede na novi status in skupni mesečni znesek nakupov dodelijo točke.

## Struktura projekta

```text
aplikacija/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── assets/
│   ├── css/
│   ├── js/
│   ├── autentikacija.html
│   ├── dashboard.html
│   ├── profil.html
│   ├── nagrade.html
│   ├── transakcije.html
│   └── admin.html
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
└── README.md
```

## Tehnologije

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- PostgreSQL

## Namestitev

V backend mapi je potrebno namestiti odvisnosti:

```bash
cd backend
npm install
```

V datoteki `.env` morajo biti nastavljeni podatki za povezavo s PostgreSQL bazo, na primer:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=maestro_db
DB_USER=postgres
DB_PASSWORD=tvoja_lozinka
```

## Priprava baze

Najprej je treba ustvariti PostgreSQL bazo z imenom:

```text
maestro_db
```

Nato se izvedejo SQL skripte:

```bash
psql -U postgres -d maestro_db -f database/schema.sql
psql -U postgres -d maestro_db -f database/seed.sql
```

Lahko se izvedeta tudi ročno v pgAdmin Query Tool.

## Zagon aplikacije

Backend se zažene iz mape `backend`:

```bash
cd backend
npm run dev
```

Če se uporabi produkcijski zagon:

```bash
npm start
```

Frontend se odpre v brskalniku z datoteko:

```text
frontend/autentikacija.html
```

## Testni uporabniki

### Administrator

```text
Uporabniško ime: admin
Geslo: admin123
```

### Navaden uporabnik

```text
Uporabniško ime: user
Geslo: user123
```

## Osnovni potek uporabe

1. Uporabnik se registrira ali prijavi.
2. Administrator doda transakcije za uporabnika.
3. Transakcije najprej čakajo na mesečni obračun.
4. Administrator izvede mesečni obračun za izbrano leto in mesec.
5. Sistem izračuna skupni mesečni znesek nakupov.
6. Sistem po pravilih spremeni status uporabnika.
7. Sistem dodeli točke zvestobe.
8. Uporabnik lahko točke porabi za nagrade.

## Opombe

- Transakcije same po sebi ne povečajo točk uporabnika.
- Točke se dodelijo šele pri mesečnem obračunu.
- Ista nagrada se lahko pri posameznem uporabniku izkoristi samo enkrat.
- Administrator ni prikazan med navadnimi uporabniki v admin tabeli.
