# Dokumentacija - Nefunkcionalne zahteve

## 1. Uvod

Poleg funkcionalnosti mora sistem izpolnjevati tudi nefunkcionalne zahteve, ki določajo kakovost delovanja sistema. Sem spadajo zahteve glede varnosti, hitrosti, zanesljivosti, razpoložljivosti in uporabnosti sistema. Nefunkcionalne zahteve pomagajo zagotoviti, da bo sistem stabilen, varen in primeren za uporabo v praksi.
 
## 2. Nefunkcionalne zahteve

### NFZ1 – Odzivni čas sistema
Sistem mora pri običajnih operacijah, kot so prijava, pregled točk, pregled nagrad in pregled nakupov, odgovoriti v največ **2 sekundah**.

### NFZ2 – Razpoložljivost sistema
Sistem mora biti uporabnikom dostopen najmanj **99 % časa mesečno**, brez načrtovanih vzdrževalnih del.

### NFZ3 – Varnost prijave
Gesla uporabnikov morajo biti shranjena v šifrirani oziroma zgoščeni obliki. Sistem mora po **5 neuspešnih poskusih prijave** začasno blokirati prijavo za **15 minut**.

### NFZ4 – Validacija podatkov
Sistem mora pri registraciji preveriti pravilnost e-poštnega naslova in obvezna polja. Neveljavni podatki se ne smejo shraniti v bazo.

### NFZ5 – Sledljivost sprememb točk
Vsaka sprememba točk mora biti zabeležena z ID uporabnika, ID administratorja, datumom, časom in razlogom spremembe. Zapis mora biti ustvarjen v **100 % primerov**.

### NFZ6 – Zmogljivost sistema
Sistem mora omogočati hkratno uporabo najmanj **100 uporabnikov** brez opaznega poslabšanja delovanja.

### NFZ7 – Varnost osebnih podatkov
Dostop do osebnih podatkov uporabnikov mora biti dovoljen samo pooblaščenim uporabnikom. Administrator mora imeti dostop samo do funkcij, ki so vezane na njegovo vlogo.

### NFZ8 – Varnostna kopija podatkov
Sistem mora izdelati varnostno kopijo podatkov najmanj **enkrat na 24 ur**. Obnova podatkov iz kopije mora biti možna v največ **4 urah**.

### NFZ9 – Uporabnost
Uporabnik mora izvesti osnovne akcije, kot so pregled točk, pregled nagrad in koriščenje točk, v največ **3 klikih** po prijavi.

### NFZ10 – Združljivost
Spletna aplikacija mora pravilno delovati v zadnjih dveh stabilnih verzijah brskalnikov Google Chrome, Mozilla Firefox, Microsoft Edge in Safari.

### NFZ11 – Točnost izračuna točk
Mesečni izračun točk mora biti izveden brez napak. Sistem mora pravilno izračunati točke v najmanj **99,9 % transakcij**.

### NFZ12 – Čas izvedbe mesečnega izračuna
Mesečni izračun točk za vse uporabnike mora biti zaključen v največ **30 minutah**.

### NFZ13 – Integracija s poslovnim IS
Izmenjava podatkov s poslovnim informacijskim sistemom mora biti izvedena najmanj **enkrat na dan**. Neuspešna integracija mora biti zabeležena v dnevnik napak.

### NFZ14 – Dnevniški zapisi
Sistem mora beležiti vse pomembne dogodke, kot so prijave, spremembe točk, spremembe pravil in napake. Dnevniški zapisi se morajo hraniti najmanj **6 mesecev**.

### NFZ15 – Prilagodljivost pravil
Administrator mora lahko spremeni pravila točkovanja, statusov in nagrad brez spremembe programske kode.

