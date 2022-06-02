import { Component } from "react";

export class About extends Component
{
    static displayName = About.name;

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div id='contact-admin-container'>
                <h2 style={{margin: '0.5em auto 0 auto', width: 'fit-content', padding: '0.5em 0'}}>Kilka słów od autora</h2>
                <div id="main-home-page">
                    <div className="main-home-container-1 container">
                        <div className='row'>
                            <div className='col-sm-4 m-sm-auto'><h5>Cel powstania aplikacji webowej</h5></div>
                                <div className='col-sm-8'>
                                <div className='row'><div className='col-1 text-end' style={{color: 'rgb(0, 199, 0)'}}>{'\u276F'}</div><div className='col-10'>Zaoszczędzenie Twojego czasu</div></div>
                                <div className='row'><div className='col-1 text-end' style={{color: 'rgb(0, 199, 0)'}}>{'\u276F'}</div><div className='col-10'>Przy pomocy zebranych przepisów podsunąć Ci takie dania, które możesz zrobić od ręki</div></div>
                                <div className='row'><div className='col-1 text-end' style={{color: 'rgb(0, 199, 0)'}}>{'\u276F'}</div><div className='col-10'>Doradzenie czego Ci brakuje w spiżarni</div></div>
                                <div className='row'><div className='col-1 text-end' style={{color: 'rgb(0, 199, 0)'}}>{'\u276F'}</div><div className='col-10'>Zmniejszenie ponoszonych kosztów</div></div>
                                <div className='row'><div className='col-1 text-end' style={{color: 'rgb(0, 199, 0)'}}>{'\u276F'}</div><div className='col-10'>Powiększenie Twojego Menu</div></div>
                                <div className='row'><div className='col-1 text-end' style={{color: 'rgb(0, 199, 0)'}}>{'\u276F'}</div><div className='col-10'>Bycie na każde Twoje wywołanie</div></div>
                            </div>
                        </div>
                    </div>

                    <div className="main-home-container-1 container" style={{marginTop: '2.5em'}}>
                        <div className='row'>
                            <div className='col-sm-4 m-sm-auto'><h5>Wykorzystane technologie</h5></div>
                            <div className='col-sm-8'>
                                <div className='row'><div className='col-1 text-end' style={{color: 'rgb(0, 199, 0)'}}>{'\u276F'}</div><div className='col-10'>ASP.NET</div></div>
                                <div className='row'><div className='col-1 text-end' style={{color: 'rgb(0, 199, 0)'}}>{'\u276F'}</div><div className='col-10'>MS SQL Server</div></div>
                                <div className='row'><div className='col-1 text-end' style={{color: 'rgb(0, 199, 0)'}}>{'\u276F'}</div><div className='col-10'>ReactJs</div></div>
                                <div className='row'><div className='col-1 text-end' style={{color: 'rgb(0, 199, 0)'}}>{'\u276F'}</div><div className='col-10'>Bootstrap</div></div>
                                <div className='row'><div className='col-1 text-end' style={{color: 'rgb(0, 199, 0)'}}>{'\u276F'}</div><div className='col-10'>jQuery</div></div>
                            </div>
                        </div>
                    </div>

                    <div className="main-home-container-1 container" style={{marginTop: '2.5em'}}>
                        <div className='row'>
                            <div className='col-sm-4 m-sm-auto'><h5>Języki programowania</h5></div>
                            <div className='col-sm-8'>
                                <div className='row'><div className='col-1 text-end' style={{color: 'rgb(0, 199, 0)'}}>{'\u2713'}</div><div className='col-10'>C#</div></div>
                                <div className='row'><div className='col-1 text-end' style={{color: 'rgb(0, 199, 0)'}}>{'\u2713'}</div><div className='col-10'>JavaScript</div></div>
                                <div className='row'><div className='col-1 text-end' style={{color: 'rgb(0, 199, 0)'}}>{'\u2713'}</div><div className='col-10'>HTML5</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )}
}