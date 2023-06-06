import { AfterViewInit, Component, OnInit, ViewChild ,EventEmitter, Output} from '@angular/core';
import { Cliente } from '../clientes';
import { Router } from '@angular/router';
import $ from 'jquery';
import 'datatables.net';
import { MatDialog } from '@angular/material/dialog';
import { ClientesAddComponent } from '../clientes-add/clientes-add.component';
import { ClientesService } from 'src/app/clientes.service';
import { User } from '../user';


@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit, AfterViewInit {

  clienteHovered: number = -1;

  users: User[] = [];
  filteredUsers: any[] = []; // Array para armazenar os dados filtrados

  constructor(private router: Router, private dialog: MatDialog, private service: ClientesService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ClientesAddComponent, {
      width: '750px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUsers();
      }
    });
  }

  atendimento(cliente: Cliente) {
    this.router.navigate(['/cliente', cliente.id], { state: { cliente } });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.service.getAllUsers().subscribe(
      users => {
        this.users = users;
        this.filteredUsers = this.users.map(user => ({
          id: user.id,
          name: user.name,
          pet_name: user.pet_name,
          pet_especie: user.pet_especie,
          pet_raca: user.pet_raca,
          pet_idade: user.pet_idade,
          telefone: user.telefone,
        }));
      },
      error => {
        console.error('Erro ao obter os usuários:', error);
      }
    );
  }

  @ViewChild('dataTable', { static: false }) table: any;
  ngAfterViewInit() {
    $(document).ready(() => {
      this.table = $(this.table.nativeElement);
      this.table.DataTable({
        language: {
          emptyTable: '',
          info: '',
          infoEmpty: '',
          infoFiltered: '',
          lengthMenu: 'Exibir _MENU_ entradas',
          loadingRecords: 'Carregando...',
          processing: 'Processando...',
          search: 'Pesquisar:',
          zeroRecords: '',
          paginate: {
            first: 'Primeiro',
            last: 'Último',
            next: 'Próximo',
            previous: 'Anterior'
          },
          aria: {
            sortAscending: ': Ordenar colunas de forma ascendente',
            sortDescending: ': Ordenar colunas de forma descendente'
          }
        }
      });
    });
  }
}
