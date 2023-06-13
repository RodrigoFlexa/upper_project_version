import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ClientesAddComponent } from '../clientes-add/clientes-add.component';
import { ClientesService } from 'src/app/clientes.service';
import { Pet } from '../pet';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

declare var $: any;

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit, AfterViewInit {
  clienteHovered: number = -1;
  clientes: User[] = [];
  displayedUsers: any[] = [];
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
    this.router.navigate(['/cliente', cliente.id]);
  }

  ngOnInit(): void {
    this.getCliente();
  }

  private getCliente() {
    this.service.getAllClientes().subscribe(
      (clientes: User[]) => {
        this.clientes = clientes;

        this.displayedUsers = this.clientes.map(cliente => ({
          id: cliente.id,
          name: cliente.nome,
          pet_name: cliente.pet.nome,
          pet_especie: cliente.pet.especie,
          pet_raca: cliente.pet.raca,
          pet_idade: cliente.pet.idade,
          telefone: cliente.telefone,
        }));

        // Atualizar a tabela após obter os dados
        this.updateDataTable();
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
    console.log(id);
  }

  @ViewChild('dataTable', { static: false }) table: any;

  ngAfterViewInit() {
    this.table = $(this.table.nativeElement);
    this.updateDataTable();
  }

  private updateDataTable() {
    if (this.table && $.fn.DataTable.isDataTable(this.table)) {
      // Destruir a tabela existente antes de recriá-la
      this.table.DataTable().destroy();
    }

    setTimeout(() => {
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
    }, 0);
  }
}
