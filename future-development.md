# Rozwój aplikacji

## Aktualne
- utworzenie przycisku export / import
- ogarnięcie zakładki "Przemyślenia" (?)
  - *lista pozwalająca na dodawanie swoim przemyśleń w formie notatek, może coś po prostu na miarę notatnika. Możliwość dodawania folderów? Grupowania w nich notatek?

## Przyszłe zmiany i pomysły

- Aktualnie funkcjonalność jest zduplikowana na taski i subtaski (inbox). Mają one takie same struktury, które można ujednolicić! (?)
- poprawić (usunąć jeśli można, zamienić) style tak, by współgrały z pico css
- przerzucić inptuty + buttony oraz grupy buttonów na role="group" wbudowane w picocss;

+ te z rm2

## Ideas

- Można, by zrobić jeszcze fajniejszy podział w stylu: elements.button.addTask
- Można by dodać zamiast innerHTML textContent w celu wyeliminowania możliwości wprowadzenia, np. elementu html,
- zamienić input + button na forma, by wyeliminować dodatkowy addEventListener na enterze;

## Dalsze

- poprawić style na stronie,
- dodać zakładki między (inbox, projekty, przemyślenia), którymi będzie można się przełączać,
- dodanie zawsze dostępnej sekcji "Daily / Dzisiaj" (projekty) na pojedyczne zadania, które nie są projektami, a są do wykonania "na już"


## Done

### Październik
- wykonane funkcjonalności w obrębie części "inbox";
- przebudowa części "projekty", tak by taski i subtaski ładowały się z obiektu appData;
- Po wykonaniu zadania przekreślić tekst i umieścić zadanie gdzieś na samym dole/ (np. po lewej stronie zadania dodać checkbox z możliwością zaznaczenia zadania jako zrobione);
- Dodana opcja dodawania notatek i przemyśleń do projektów z czasem automatycznie pobieranym po stronie użytkownika;

### 13.09.2023
- ikonki podmienione na bardziej prywatne rozwiązanie: https://fonts.coollabs.io/,

### 31.08.2023

- poprawiona funkcjonalność otwierania tasków i zamykania ich oraz zaznaczania / odznaczania. DO POPRAWY CZYSTOŚĆ KODU.

### 30.08.2023

- projekt dodany do nowego repozytorium, uporządkowane pliki, utworzony nowy *branch* oraz wersja aplikacji (pre-release). Rozpoczęte prace nad nowym, ulepszonym designem.

### 29.08.2023

- zaimplementowany prosty mechanizm potwierdzenia wyczyszczenia całej listy zadań,
- poprawiony drag&drop z zewnętrznego skryptu na przeciąganie tylko po naciśnięciu na ikonę,

### Wcześniej

- Wprowadzić dodawanie zadania przy pomocy przycisku "Enter",
- Dodać przycisk pozwalający na usunięcie wybranego zadania z listy,
- Dodać przycisk pozwalający na edycję wybranego zadania z listy,
- sprawdzić, w jaki sposób zapisać listę w pamięci .localStorage, tak by po odświeżeniu strony zadania nadal były dostępne,

## Przemyślenia

- chatgpt pomgógł mi tu rozwiązać jeden problem wynikający z tym, że podczas długiego kliku i usunięciu klasy "to-remove" zadanie od razu się otwierało,
- Zdecydowałem się na wprowadzenie przycisku edycji tasków na stronie głównej, ponieważ longclick oraz click mieszały się ze sobą i razem tworzyły dość skomplikowany system, który trzeba było obsługiwać z pomocą wielu zmiennych state,


---
https://picocss.com/third-party/
https://picocss.com/docs/typography.html
https://picocss.com/examples/bootstrap-grid/

! PICO V.2!
https://v2.picocss.com/docs/colors
