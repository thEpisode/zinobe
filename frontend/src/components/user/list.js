import React from 'react';

export class UserList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount () {
    fetch("http://localhost:3500/api/status")
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
            <h2>All Users</h2>

            <ul>
              {items.map(item => (
                <li key={item.name}>
                  {item.name} {item.price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  }
}