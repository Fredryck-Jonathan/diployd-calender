# Diployd-Calender (Readme English)

This is my first library, a calendar. The project is designed to evolve over time, ensuring you can enjoy a fully functional calendar that works seamlessly across all browsers.


## Installation

Run the following command: `npm install diployd-calender`;

Then, you need to import it into your file. For example, if you are using React.js, you should place at the top of your file:
import DiploydCalender from "diployd-calender";


## Usage

### To select a date:

To select a date, there are several ways to do so. The first is simply to enter your date into the input field in the DD/MM/YYYY format — the / will be added automatically. Alternatively, you can open the calendar by clicking the icon to the right of the input field. You can then select your date by choosing the month and year first, and once that is done, select the day by clicking on the button containing the day number.

### To retrieve the date:

You need to select the input with the class date-input. You will see that it has an attribute named data-date. You simply need to retrieve it, and once a date is selected, it will provide you with a date in ISO format.

### To check if a date is valid:

For your forms, if you need to verify that a date is valid, as explained previously, you should select the input with the class date-input. However, this time, you will check the date-valid attribute. If the date is valid, it will return true; otherwise, it will return false.



# Diployd-Calender (Readme Français)

Ceci est ma première bibliothèque, un calendrier. Le projet est conçu pour évoluer au fil du temps afin de vous garantir un calendrier entièrement fonctionnel qui fonctionne parfaitement sur tous les navigateurs.


## Installation

Exécutez la commande suivante :
npm install diployd-calender;

Ensuite, vous devez l'importer dans votre fichier. Par exemple, si vous utilisez React.js, vous devez ajouter en haut de votre fichier :
import DiploydCalender from "diployd-calender";


## Utilisation

### Pour sélectionner une date :

Pour sélectionner une date, il existe plusieurs façons de le faire. La première consiste simplement à saisir votre date dans le champ de saisie au format JJ/MM/AAAA — les / seront ajoutés automatiquement. Sinon, vous pouvez ouvrir le calendrier en cliquant sur l'icône située à droite du champ de saisie. Vous pourrez ensuite sélectionner votre date en choisissant d'abord le mois et l'année. Une fois cela fait, sélectionnez le jour en cliquant sur le bouton contenant le numéro du jour.

### Pour récupérer la date :

Vous devez sélectionner l'input avec la classe date-input. Vous verrez qu'il possède un attribut nommé data-date. Il vous suffit de le récupérer, et une fois une date sélectionnée, cela vous fournira une date au format ISO.

### Pour vérifier si une date est valide :

Pour vos formulaires, si vous devez vérifier qu'une date est valide, comme expliqué précédemment, vous devez sélectionner l'input avec la classe date-input. Cette fois-ci, vous devrez vérifier l'attribut date-valid. S'il est valide, il renverra true; sinon, il renverra false.


