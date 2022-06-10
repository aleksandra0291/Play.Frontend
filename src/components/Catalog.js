import React, { Component } from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import ItemModal from './form/ItemModal';
import GrantItemModal from './form/GrantItemModal';

export class Catalog extends Component
{
  static displayName = Catalog.name;

  constructor(props)
  {
    super(props);
    this.state = { items: [], loading: true, loadedSuccess: false };
  }

  componentDidMount()
  {
    this.populateItems();
  }

  async populateItems()
  {
    fetch(`${window.CATALOG_ITEMS_API_URL}`) // talking to url of the catalog apis//
      .then(response =>
      {
        return response.json(); //tu dostaajemy odpowiedz//
      })
      .then(returnedItems => this.setState({ items: returnedItems, loading: false, loadedSuccess: true }))
      .catch(err =>
      {
        console.log(err);
        this.setState({ items: [], loading: false, loadedSuccess: false })
      });
  }

  addItemToState = item =>
  {
    this.setState(previous => ({
      items: [...previous.items, item]
    }));
  }
  updateState = (id) =>
  {
    this.populateItems();
  }
  deleteItemFromState = id =>
  {
    const updated = this.state.items.filter(item => item.id !== id);
    this.setState({ items: updated })
  }
  async deleteItem(id)
  {
    let confirmDeletion = window.confirm('Do you really wish to delete it?');
    if (confirmDeletion)
    {
      fetch(`${window.CATALOG_ITEMS_API_URL}/${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res =>
        {
          this.deleteItemFromState(id);
        })
        .catch(err =>
        {
          console.log(err);
          window.alert("Could not delete the item.");
        });
    }
  }

  renderItemsTable(items)
  {
    return <Container style={{ paddingTop: "10px", paddingLeft: "0px" }}>
      <Row>
        <Col>
          <Table striped bordered hover >
            <thead className="thead-dark">
              <tr>
                <th>Nazwa Produktu </th>
                <th>Opis</th>
                <th>Cena</th>
                <th style={{ textAlign: "center" }}>Akcja</th>
              </tr>
            </thead>
            <tbody>
              {!items || items.length <= 0 ?
                <tr>
                  <td colSpan="6" align="center"><b>Nie ma jeszcze produktów </b></td>
                </tr>
                : items.map(item => (
                  <tr key={item.id}>
                    <td>
                      {item.name}
                    </td>
                    <td>
                      {item.description}
                    </td>
                    <td>
                      {item.price}
                    </td>
                    <td align="center">
                      <div>
                        <ItemModal
                          isNew={false}
                          item={item}
                          updateItemIntoState={this.updateState} />
                        &nbsp;&nbsp;&nbsp;
                        <GrantItemModal
                          item={item} />
                        &nbsp;&nbsp;&nbsp;
                        <Button variant="danger" onClick={() => this.deleteItem(item.id)}>Usuń</Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <ItemModal isNew={true} addItemToState={this.addItemToState} />
        </Col>
      </Row>
    </Container>;
  }

  render()
  {
    let contents = this.state.loading
      ? <p><em>Ładowanie...</em></p>
      : this.state.loadedSuccess
        ? this.renderItemsTable(this.state.items)
        : <p>Nie udało się zalogować pozycji</p>;

    return (
      <div>
        <h1 id="tabelLabel" >Lista dostępnych produktów</h1>
        {contents}
      </div>
    );
  }
}
