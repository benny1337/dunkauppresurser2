import * as React from 'react';

export default class Home extends React.Component<void, void> {
    public render() {
        return <div>
            <h1>Dunka upp resurser 2.0!</h1>
            <p>
                Inspirerad av den gamla console-appen "dunka upp resurser".
            </p>

            <b>Hur</b>
            <ul>
                <li>Lägg in en connectionstring till crm</li>
                <li>Välj in de webbresurser du vill ladda upp</li>
                <li>Kontrollera namngivning: "stq_/typ/fil"</li>
                <li>Tryck på ladda upp</li>
            </ul>

            <p>
                Appen sparar dina crm-connections och filer för respektive connection i local storage. De lever alltså per dator. Byter du dator får du göra om dina inställningar
            </p>

            <p>
                Filerna laddas upp server-side. Det innebär att din CRM-instans måste vara nåbar från siten. Är CRM-instansen on-prem måste också siten köras on-prem
            </p>
        </div>;

    }
}
