import React, { Component } from 'react';
import './Faq.css';

export class Faq extends Component {
    static displayName = Faq.name;

    render() {
        return (
            <div id='Faq-info-container'>
                <h2 style={{margin: '0 auto', width: 'fit-content', padding: '0.5em 0'}}>Najczęściej zadawane pytania</h2>
                <h3>W jaki sposób powinienem zacząć?</h3>
                <p style={{fontSize: '1.1em'}}>
                    Najpierw zrób listę tego co posiadasz w domu, przy tym pomiń rzeczy pokroju mniejszej wagi np. zioła prowansalskie, olej słonecznikowy czy masło.
                    Do swojej spiżarni nie powinieneś dodawać przypraw czy składników które wydaje się każdy posiadać. 
                </p>
                <h3>Ile mogę posiadać składników w spiżarni?</h3>
                <p style={{fontSize: '1.1em'}}>Liczba składników jest ograniczona do 50 sztuk dla każdego użytkownika</p>
                <h3>Czy posiadam limit dziennych wyszukiwań przepisów przy pomocy panelu klienta?</h3>
                <p style={{fontSize: '1.1em'}}>Nie ma takiego limitu, ta strona jest darmowa. Nie ma żadnego systemu subskrypcji i nie będzie mieć</p>
                <h3>Dlaczego nie mogę dodać składnika do spiżarni, pomimo tego że nie został uprzednio wpisany?</h3>
                <p style={{fontSize: '1.1em'}}>
                    Dodanie składnika który nie znajduje się w żadnym przepisie jest niemożliwe.
                    Zdecydowałem się na ten krok aby zwiększyć szansę na dopasowanie przepisów pod użytkownika.
                    Korzystaj z listy wyświetlanej pod polem, a wszystko będzie działać.
                </p>
                <h3>Znalazłeś jakiś błąd?</h3>
                <p style={{fontSize: '1.1em'}}>Napisz do mnie wiadomość naciskając pole „Kontakt” na stopce strony</p>
            </div>
        )
    }
}