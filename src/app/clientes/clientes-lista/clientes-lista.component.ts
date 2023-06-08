import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../User';
import { Router } from '@angular/router';
import $ from 'jquery';
import 'datatables.net';
import { MatDialog } from '@angular/material/dialog';
import { ClientesAddComponent } from '../clientes-add/clientes-add.component';
import { ClientesService } from 'src/app/clientes.service';
import { Pet } from '../pet';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit, AfterViewInit {
  clienteHovered: number = -1;
  clientes: User[] = [];
  filteredUsers: any[] = []; // Array para armazenar os dados filtrados
  cliente: User = new User();
  pet: Pet = new Pet();
  intervalId: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private service: ClientesService,
    private delete_dialog: MatDialog
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClientesAddComponent, { width: '750px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.clienteCadastrado) {
        this.getCliente();
      }
    });
  }

  atendimento(cliente: User) {
    this.router.navigate(['/cliente', cliente.id], { state: { cliente } });
  }

  ngOnInit(): void {
    this.getCliente();
  }

  private getCliente() {
    this.service.getAllClientes().subscribe(
      (clientes: User[]) => {
        this.clientes = clientes;

        this.filteredUsers = this.clientes.map(cliente => ({
          id: cliente.id,
          name: cliente.nome,
          pet_name: cliente.pet.nome,
          pet_especie: cliente.pet.especie,
          pet_raca: cliente.pet.raca,
          pet_idade: cliente.pet.idade,
          telefone: cliente.telefone,
        }));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteCliente(id: number) {
    const dialogRef = this.delete_dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: 'Deseja realmente excluir este cliente?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deletarCliente(id).subscribe(
          () => {
            this.getCliente();
          },
          error => {
            console.error(error);
          }
        );
      }
    });
  }

  attCliente(id: number) {
    console.log(id)
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