import './App.css';
import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';       
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ClienteServices } from './services/ClienteService';

import 'primeicons/primeicons.css';
import { Panel } from 'primereact/panel';
import "primereact/resources/themes/lara-light-cyan/theme.css";

// Componente principal de la aplicación
export default class App extends Component {
  constructor() {
    super();
    // Estado inicial
    this.state = {
      visible: false,// Controla la visibilidad del diálogo
      clientes: { // Datos del cliente actual
        idCliente: null,
        nombre: null,
        apellido: null,
        email: null,
        telefono: null,
        direccion: null,
      },
      cliente: [], // Lista de clientes
      selectedCliente: {}, // Cliente seleccionado
    };

    // Configuración de los elementos del Menubar
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-user-plus',
        command: () => { this.showSaveDialog() }
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-user-edit',
        command: () => { this.showeditDialog() }
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-fw pi-user-minus',
        command: () => {this.delete ()}
      }
    ];

    this.clienteService = new ClienteServices();// Instancia del servicio de cliente
    this.save = this.save.bind(this);// Vinculación del método save
    // Configuración del pie de diálogo
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );

    // Cambiar Toast a minúscula
    this.toast = React.createRef();
  }

   // Se ejecuta cuando el componente se monta
  componentDidMount() {
    this.clienteService.getAll().then((data) => this.setState({ cliente: data }));
  }

    // Método para guardar el cliente actual
  save() {

    this.clienteService.save(this.state.clientes).then((data) => {
      this.setState({
        visible: false,
        clientes: {
          idCliente: null,
          nombre: null,
          apellido: null,
          email: null,
          telefono: null,
          direccion: null,
        },
      });
      this.componentDidMount(); // Refresca la tabla
    });
    
    this.toast.current.show({
      severity: "success",
      summary: "Atención!",
      detail: "Cliente guardado exitosamente",
    });
    this.clienteService.getAll().then((data) => this.setState({ cliente: data }));
  }

  // Método para eliminar el cliente seleccionado
  delete() {
    if (window.confirm("¿Desea eliminar este cliente?")) {
      this.clienteService
        .delete(this.state.selectedCliente.idCliente)
        .then((data) => {
          this.toast.current.show({
            severity: "success",
            summary: "Atención!",
            detail: "Cliente se eliminó exitosamente",
          });
          this.clienteService.getAll().then((data) => this.setState({ cliente: data }));
        });
    }
  }
 // Renderiza el componente
  render() {
    return (
      <div style={{ width: '80%', margin: '20px auto 0px' }}>
        <Menubar model={this.items} />
        <br />
        <Panel header="CRUD de clientes">
          <DataTable value={this.state.cliente} 
            paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
            selectionMode="single" 
            selection={this.state.selectedCliente}
            onSelectionChange={(e) => this.setState({ selectedCliente: e.value })}>
            <Column field="idCliente" header="ID"></Column>
            <Column field="nombre" header="Nombres"></Column>
            <Column field="apellido" header="Apellidos"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="direccion" header="Direccion"></Column>
            <Column field="telefono" header="Telefono"></Column>
          </DataTable>
        </Panel>

        <Dialog header="Clientes" 
          visible={this.state.visible} 
          style={{ width: '400px' }} 
          footer={this.footer} 
          modal={true} 
          onHide={() => this.setState({ visible: false })}>
          
          

          <FloatLabel>
            <InputText style={{ width: "100%" }} 
              value={this.state.clientes.nombre} 
              id='nombre' 
              onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let clientes = Object.assign({}, prevState.clientes);
                  clientes.nombre = val;
                  return { clientes };
                });
              }} />
            <label htmlFor="nombre">Nombres:</label>
          </FloatLabel><br />

          <FloatLabel>
            <InputText style={{ width: "100%" }} 
              value={this.state.clientes.apellido} 
              id='apellido' 
              onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let clientes = Object.assign({}, prevState.clientes);
                  clientes.apellido = val;
                  return { clientes };
                });
              }} />
            <label htmlFor="apellido">Apellidos:</label>
          </FloatLabel><br />

          <FloatLabel>
            <InputText style={{ width: "100%" }} 
              value={this.state.clientes.email} 
              id='email' 
              onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let clientes = Object.assign({}, prevState.clientes);
                  clientes.email = val;
                  return { clientes };
                });
              }} />
            <label htmlFor="email">Email:</label>
          </FloatLabel><br />

          <FloatLabel>
            <InputText style={{ width: "100%" }} 
              value={this.state.clientes.direccion} 
              id='direccion' 
              onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let clientes = Object.assign({}, prevState.clientes);
                  clientes.direccion = val;
                  return { clientes };
                });
              }} />
            <label htmlFor="direccion">Direccion:</label>
          </FloatLabel><br />

          <FloatLabel>
            <InputText style={{ width: "100%" }} 
              value={this.state.clientes.telefono} 
              id='telefono' 
              onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let clientes = Object.assign({}, prevState.clientes);
                  clientes.telefono = val;
                  return { clientes };
                });
              }} />
            <label htmlFor="telefono">Telefono</label>
          </FloatLabel><br />
        </Dialog>

        <Toast ref={this.toast} />
      </div>
    );
  }

   // Muestra el diálogo para agregar un nuevo cliente
  showSaveDialog() {
    this.setState({
      visible: true,
      clientes: {
        idCliente: null,
        nombre: null,
        apellido: null,
        email: null,
        telefono: null,
        direccion: null,
      }
    });
  }

// Muestra el diálogo para editar un cliente seleccionado
    showeditDialog(){
      this.setState({
        visible: true,
        clientes: {
          idCliente: this.state.selectedCliente.idCliente,
          nombre: this.state.selectedCliente.nombre,
          apellido: this.state.selectedCliente.apellido,
          email: this.state.selectedCliente.email,
          telefono: this.state.selectedCliente.telefono,
          direccion: this.state.selectedCliente.direccion,
        }
      });
  }
}