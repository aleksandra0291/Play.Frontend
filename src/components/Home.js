import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationPaths } from './Constants';

export class Home extends Component
{
  static displayName = Home.name;

  render()
  {
    return (
      <div>
        <h1>Biblioteka</h1>
        <p>Witaj w bibliotece różności</p>
        <p>By zacząć:</p>
        <ul>
          <li>Zarządzaj produktami <Link to={ApplicationPaths.CatalogPath}>Katalog</Link></li>
          <li>Sprawdzić przynależnośc produktów <Link to={ApplicationPaths.InventoryPath}> Wykaz produktów </Link></li>
        </ul>
        <p>Możesz także</p>
        <ul>
          <li>Zarządzać <a href={window.RABBITMQ_URL} target="_blank" rel="noreferrer">kolejkami komunikatów</a></li>
          <li>Odkryć dokumentację OPEN API
            <ul>
              <li><a href={`${window.CATALOG_SERVICE_URL}/swagger`} target="_blank" rel="noreferrer">Catalog service</a></li>
              <li><a href={`${window.INVENTORY_SERVICE_URL}/swagger`} target="_blank" rel="noreferrer">Inventory service</a></li>
            </ul>
          </li>
        </ul>
        <p>Ta strona została zbudowana:</p>
        <ul>
          <li><a href='https://get.asp.net'>ASP.NET Core</a> i <a href='https://docs.microsoft.com/en-us/dotnet/csharp'>C#</a> Backend </li>
          <li><a href='https://www.docker.com'>Docker</a> konterneryzacja serwisów</li>
          <li><a href='https://www.mongodb.com'>MongoDB</a> baza danych</li>
          <li><a href='https://www.rabbitmq.com'>RabbitMQ</a> oraz <a href='https://masstransit-project.com'>MassTransit</a> asynchroniczna komunikacja mikroserwisów</li>
          <li><a href='https://facebook.github.io/react/'>React</a> oraz <a href='http://getbootstrap.com/'>Bootstrap</a> Frontend</li>
        </ul>
      </div>
    );
  }
}
