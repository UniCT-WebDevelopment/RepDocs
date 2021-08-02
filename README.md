# RepDocs

RepDocs è un sito web dove tutti gli utenti registrati possono caricare file esclusivamente in formato pdf.
I file possono essere documenti di qualsiasi tipologia e su qualsiasi argomento.
L'Utilizzo di RepDocs è molto intuitivo, pertanto non verrà fornita una Guida dettagliata.<br>
Di seguito la pagina Index, la pagina Area Utenti, la pagina SearchDoc e la Pagina MyRepDocs.

## Index

![Index](https://user-images.githubusercontent.com/28182917/127782634-ebf674e0-15bd-49a6-8f2f-bdd66e53b87d.JPG)

## Area Utenti

![Area Utenti](https://user-images.githubusercontent.com/28182917/127782684-8c4c41d4-a449-4ce4-8268-9b5109543e03.JPG)

## SearchDoc

![SearchDoc](https://user-images.githubusercontent.com/28182917/127782798-80381d1e-d435-44d1-9b64-4b405a630c1a.JPG)
Clicca su RepDocs che vi è a sinistra del Menu per ritornare alla pagina Area Utenti

## MyRepDocs

![MyRepDocs](https://user-images.githubusercontent.com/28182917/127782738-8caa65f5-76c0-44fd-818f-8417017d5f47.JPG)
Clicca su RepDocs che vi è a sinistra del Menu per ritornare alla pagina Area Utenti

# Realizzazione

RepDocs è stato realizzato limitando fortemente l'uso delle librerie esterne o framework sia per quanto riguarda il lato Front-End che per quanto riguarda il Lato Back-End.
La Responsività è stata implementata usando le CSS Grid e le CSS Media Query. Per quanto riguarda il lato Back-End è stato realizzato usando il linguaggio di programmazione lato server PHP. Le chiamate Asincrone al Server sono state implementate in Javascript usando AJAX. Il caricamento degli item nel client è stato implementato attraverso l'uso delle chiamate asincrone che richiedono al server i documenti caricati e il server li invia al client in formato JSON. RepDocs è dotato di un semplice Database Relazione implementato in SQL che ha lo scopo di memorizzare gli utenti registrati e i documenti caricati. La Connessione al Databese è implementata attraverso PDO. Sono state implementate le sessioni php per mantenere l'accesso di un utente loggato, e nel caso in cui l'utente non dovesse ricordare la password è stato implementato anche l'invio delle E_Mail di recupero. 
Infine, nell'Area Utenti spuntano gli ultimi 8 documenti caricati e gli 8 documenti più scaricati, queste operazioni sono state realizzate usando rispettivamente la clausola sql ORDER BY e la clausola SQL LIKE.

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
![Modello ER](https://user-images.githubusercontent.com/28182917/127783528-04e5d815-0d47-4c3f-abc3-4414a48f1071.jpeg)


## Modello Logico
![Modello Logico](https://user-images.githubusercontent.com/28182917/127783532-77346d46-6455-4b68-9afe-8c20c450404b.jpeg)

Nel Lato Back-End sono implementate anche operazioni di interrogazione, cancellazione e modifica dei record del Database.

# Riferimenti

## SQL<br><br>
Operazioni Interrogazione DB: https://www.w3schools.com/sql/sql_select.asp<br>
Operazioni Eliminazione Record DB: https://www.w3schools.com/sql/sql_delete.asp<br>
Operazioni Modifica Record DB: https://www.w3schools.com/sql/sql_update.asp<br>
Operazioni Creazione Tabella DB: https://www.w3schools.com/sql/sql_create_table.asp<br>
Operazione Creazione Database: https://www.w3schools.com/sql/sql_create_db.asp<br>
Operazione LIKE: https://www.w3schools.com/sql/sql_like.asp<br>
Operazione ORDER BY: https://www.w3schools.com/sql/sql_orderby.asp<br><br><br> 

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

## HAMBURGER MENU

https://www.w3schools.com/howto/howto_js_mobile_navbar.asp<br>
Libreria: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css








