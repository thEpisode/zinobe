import React from 'react';
import { Link } from "react-router-dom";

export class UserList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };

    this.historyOnClick = this.historyOnClick.bind(this);
  }

  componentDidMount () {
    fetch("http://localhost:3500/api/user")
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

  historyOnClick = (event) => {
    if (event) { event.preventDefault() }

    debugger

    this.context.history.push(`/user-credit-line?userId=${event.target.value}`);
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
            <h2>Usuarios del sistema</h2>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Referencia de usuario</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Email</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.firstname} {item.lastname}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <Link to={'/user-credit-line?userId=' + item.id} className="btn btn-primary">Historial</Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}