- Aktualnie funkcjonalność jest zduplikowana na taski i subtaski. Mają one takie same struktury, które można ujednolicić!

// Można by dodać zamiast innerHTML textContent w celu wyeliminowania możliwości wprowadzenia, np. elementu html


// chatgpt pomgógł mi tu rozwiązać jeden problem wynikający z tym, że podczas długiego kliku i usunięciu klasy "to-remove" zadanie od razu się otwierało

/** Wystarczy wrzucić dla pojedynczego zadania, nie dla każdego kontenera z osobna **/

// Można, by zrobić jeszcze fajniejszy podział w stylu: elements.button.addTask :-)

---

-> zdecydowałem się na wprowadzenie przycisku edycji tasków na stronie głównej, ponieważ longclick oraz click mieszały się ze sobą i razem tworzyły dość skomplikowany system, który trzeba było obsługiwać z pomocą wielu zmiennych state.