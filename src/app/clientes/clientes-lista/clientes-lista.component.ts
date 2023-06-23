import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ClientesAddComponent } from '../clientes-add/clientes-add.component';
import { ClientesService } from 'src/app/clientes.service';
import { Pet } from '../pet';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';


@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class ClientesListaComponent implements OnInit, AfterViewInit {

  selectedRow: any = null;

  clientes: User[] = [];
  displayedUsers: any[] = [];
  cliente: User = new User();
  pet: Pet = new Pet();
  intervalId: any;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'nome', 'email'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private router: Router,
    private dialog: MatDialog,
    private service: ClientesService,
    private delete_dialog: MatDialog,
    private paginatorIntl: MatPaginatorIntl
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    document.addEventListener('click', this.onDocumentClick.bind(this));
    this.getCliente();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isButton = target.closest('.custom-button'); // Verifica se o alvo ou o ancestral mais próximo corresponde à classe

    if (!isButton && !target.closest('table')) {
      this.selectedRow = null;
    }
  }

  onRowClicked(row: any) {
    this.selectedRow = row;
    console.log(row);
  }



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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.filterPredicate) {
      this.dataSource.filterPredicate = (data: User, filter: string) => {
        const searchData = `${data.id}${data.nome}${data.email}${data.telefone}${data.cidade}${data.pet.nome}`.toLowerCase();
        return searchData.includes(filter);
      };

      this.dataSource.filter = filterValue;
    }
  }



  private getCliente() {
    this.service.getAllClientes().subscribe(
      (clientes: User[]) => {
        this.clientes = clientes;
        this.displayedColumns = ['select', 'id', 'nome', 'pet', 'email', 'telefone', 'cidade'];

        this.dataSource = new MatTableDataSource(clientes);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  isClienteSelecionado(): boolean {
    return this.selectedRow !== null;
  }
}

function CustomPaginator(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Itens por página:';
  paginatorIntl.nextPageLabel = 'Próxima';
  paginatorIntl.previousPageLabel = 'Anterior';

  paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    const endIndex = startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };

  return paginatorIntl;
}

