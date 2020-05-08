import React from 'react';
import Cookies from 'universal-cookie';

export class DeniedCredits extends React.Component {
  constructor (props) {
    super(props);
    const cookies = new Cookies();
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.payOnClick = this.payOnClick.bind(this);
    this.jwt = cookies.get('user_session')
  }

  componentDidMount () {
    this.getCredits()
  }

  serializerOjectToQueryString (obj, prefix) {
    if (obj && typeof obj === 'object') {
      const serializedArr = []
      let key = {}

      for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const k = prefix ? prefix + '[' + key + ']' : key
          const value = obj[key] || null
          serializedArr.push((value !== null && typeof value === 'object')
            ? this.serializerOjectToQueryString(value, k)
            : encodeURIComponent(k) + '=' + encodeURIComponent(value))
        }
      }
      return serializedArr.join('&')
    }
  }

  objectToQueryString (obj) {
    if (obj && typeof obj === 'object') {
      const result = this.serializerOjectToQueryString(obj)
      return `?${result}`
    } else {
      return ''
    }
  }

  getCredits () {
    const data = {
      filterBy: {
        status: 'rejected'
      }
    }
    const url = `http://localhost:3500/api/credit${this.objectToQueryString(data)}`;
    fetch(url)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {

        if (!response || !response.success) {
          alert(response.message || '')
          return
        }

        this.setState({
          isLoaded: true,
          items: response.result || []
        });
        console.log(response.result)
      })
  }

  updateCredit (creditId) {
    if (!creditId) {
      alert('No se pudo pagar, intenta más tarde')
      return
    }

    const url = 'http://localhost:3500/api/credit';
    var data = {
      status: { name: 'rejected' }
    }

    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.jwt || ''
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if (!response || !response.success) {
          alert(response.message)
          return
        }

        this.getCredits()
      });
  }

  payOnClick (event) {
    if (event) { event.preventDefault() }

    this.updateCredit(event.target.value);
  }


  render () {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="info-container container">
          <div className="mt-5">
            <h2>Créditos rechazados</h2>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Referencia de crédito</th>
                    <th scope="col">Referencia de usuario</th>
                    <th scope="col">Valor solicitado</th>
                    <th scope="col">Fecha solicitud</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id}>
                      <th scope="row">{item.id}</th>
                      <td>{item.user_id}</td>
                      <td>$ {item.amount_requested}</td>
                      <td>{new Date(+item.date_creation).toDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      );
    }
  }
}