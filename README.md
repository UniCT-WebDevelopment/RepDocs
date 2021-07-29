# RepDocs

RepDocs è un sito web dove tutti gli utenti registrati possono caricare file esclusivamente in formato pdf.
I file possono essere documenti di qualsiasi tipologia e su qualsiasi argomento.
L'Utilizzo di RepDocs è molto intuitivo, pertanto verrà omessa la Guida.<br>
Di seguito la pagina Home e la pagina dell'Area Utenti di RepDocs.

## Home
![Home](https://user-images.githubusercontent.com/28182917/126518470-33401c2a-b8b9-4cde-ac18-bc045d37d34f.JPG)

## Area Utenti
![Area Utenti](https://user-images.githubusercontent.com/28182917/126518922-93fc3aa1-f3cb-40fa-bbce-44053f5979e5.JPG)

# Realizzazione

RepDocs è stato realizzato senza l'uso di nessuna libreria esterna o framework sia per quanto riguarda il lato Front-End che per quanto riguarda il Lato Back-End.
La Responsività è stata implementata usando le CSS Grid e le CSS Media Query. Per quanto riguarda il lato Back-End è stato realizzato usando il linguaggio di programmazione lato server PHP. Le chiamate Asincrone al Server sono state implementate in Javascript usando AJAX. L'aggiornamento automatico degli item nei client è stato implementato usando la funzione Javascript setInterval e attraverso l'uso delle chiamate asincrone che richiedono al server i documenti caricati e il server li invia al client in formato JSON. RepDocs è dotato di un semplice Database Relazione implementato in SQL che ha lo scopo di memorizzare gli utenti registrati e i documenti caricati. La Connessione al Databese è implementata attraverso PDO. Sono state implementate le sessioni php per mantenere l'accesso di un utente loggato, e nel caso in cui l'utente non dovesse ricordare la password è stato implementato anche l'invio delle E_Mail di recupero. 

# Linguaggi Utilizzati
HTML, CSS, JS (Lato Client); <br>
PHP (Lato Server); <br>
SQL (Creazione Modello Fisico DB Relazionale).

# Strumenti Utilizzati
XAMPP (https://www.apachefriends.org/it/index.html);<br>
APACHE HTTP SERVER (Web Server Utilizzato integrato in XAMPP);<br>
MySQL (Servizio per Database Relazionali integrato in XAMPP);<br>
Filezilla (Software che permette il trasferimento in rete dei file integrato in XAMPP)<br>

# Implementazione DB Relazionale

## Modello Entità-Relazioni
![ER](https://user-images.githubusercontent.com/28182917/126484423-3590513f-d528-44a7-90c8-56254dfead13.jpeg)

## Modello Logico

![ML](https://user-images.githubusercontent.com/28182917/126486189-4905d105-fdd5-47d5-bb46-83583547d0dd.jpeg)

## Modello Fisico (In linguaggio SQL)

![Documento](https://user-images.githubusercontent.com/28182917/126486365-7e43304f-992d-4311-9f89-980aead9afe7.JPG)

![Utente](https://user-images.githubusercontent.com/28182917/126486379-1e6aaea9-735a-4d04-bdfe-8d3f96665ba8.JPG)

Nel Lato Back-End sono implementate anche operazioni di interrogazione, cancellazione e modifica dei record del Database.

# Riferimenti

## SQL<br><br>
Operazioni Interrogazione DB: https://www.w3schools.com/sql/sql_select.asp<br>
Operazioni Eliminazione Record DB: https://www.w3schools.com/sql/sql_delete.asp<br>
Operazioni Modifica Record DB: https://www.w3schools.com/sql/sql_update.asp<br>
Operazioni Creazione Tabella DB: https://www.w3schools.com/sql/sql_create_table.asp<br>
Operazione Creazione Database: https://www.w3schools.com/sql/sql_create_db.asp<br><br><br>

## JS AJAX<br><br>
https://www.w3schools.com/js/js_ajax_intro.asp<br>
https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX<br><br><br>

## Connessione DB attraverso PDO<br><br>

https://www.w3schools.com/php/php_mysql_connect.asp<br>
https://www.php.net/manual/en/class.pdo.php<br><br><br>

## Sessioni PHP<br><br>

https://www.w3schools.com/php/php_sessions.asp<br>
https://www.php.net/manual/en/reserved.variables.session<br><br><br>

## CSS GRID & CSS MEDIA QUERY<br><br>

https://www.w3schools.com/css/css_rwd_mediaqueries.asp<br>
https://www.w3schools.com/css/css_grid.asp<br><br><br>

## Caricamento File

Lato Client: https://www.w3schools.com/html/html_forms.asp<br>
Lato Server: https://www.w3schools.com/php/php_file_upload.asp   https://www.php.net/manual/en/reserved.variables.files<br><br><br>

## Invio E-Mail

https://www.php.net/manual/en/function.mail.php<br>
https://www.ilblogdiunprogrammatore.it/38633-configurare-xampp-per-inviare-email-con-gmail.html<br><br><br>

## JSON PHP

https://www.w3schools.com/php/php_json.asp<br>
https://www.w3schools.com/js/js_json_intro.asp<br><br><br>











