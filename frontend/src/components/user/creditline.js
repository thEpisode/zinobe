import React from 'react';

export class UserCreditLine extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      user: {}
    };

    this.setupQueryString()
  }

  setupQueryString () {
    var queryString = {}
    try {
      const query = window.location.search.split('?')[1]
      const vars = query.split('&')
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=')
        const key = decodeURIComponent(pair[0])
        const value = decodeURIComponent(pair[1])
        // If first entry with this name
        if (typeof queryString[key] === 'undefined') {
          queryString[key] = decodeURIComponent(value)
          // If second entry with this name
        } else if (typeof queryString[key] === 'string') {
          const arr = [queryString[key], decodeURIComponent(value)]
          queryString[key] = arr
          // If third or later entry with this name
        } else {
          queryString[key].push(decodeURIComponent(value))
        }
      }
    } catch (error) { /* No Parameters */ }

    window.location.queryString = queryString
  }

  componentDidMount () {
    if (!window.location.queryString || !window.location.queryString.userId) {
      alert('No puedes visualizar esta página, regresa a la lista y selecciona un usuario')
      return
    }

    this.getCredits()
    this.getUser()
  }

  getCredits () {
    fetch(`http://localhost:3500/api/credit?userId=${window.location.queryString.userId}`)
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            items: data.result || []
          });
          console.log(data.result)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  getUser () {
    fetch(`http://localhost:3500/api/user?id=${window.location.queryString.userId}`)
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            user: data.result || {}
          });
          console.log(data.result)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  historyOnClick = (event) => {
    if (event) { event.preventDefault() }

    window.location.assign(`/user-credit-line?id=${event.target.value}`);
  }

  render () {
    const { error, isLoaded, items, user } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="info-container container">
          <div className="mt-5">
            <h2>Línea de crédito de {user.firstname} {user.lastname}</h2>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Referencia de pago</th>
                    <th scope="col">Valor solicitado</th>
                    <th scope="col">Valor aprobado</th>
                    <th scope="col">Fecha solicitud</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id}>
                      <th scope="row">{item.id}</th>
                      <td>$ {item.amount_requested}</td>
                      <td>$ {item.amount}</td>
                      <td>{new Date(+item.date_creation).toDateString()}</td>
                      <td>{item.status.title}</td>
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