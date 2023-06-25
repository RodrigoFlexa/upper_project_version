import { Pet } from '../pet';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/clientes.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreatesuccessdialogComponent } from '../createsuccessdialog/createsuccessdialog.component';

@Component({
  selector: 'app-clientes-add',
  templateUrl: './clientes-add.component.html',
  styleUrls: ['./clientes-add.component.css']
})
export class ClientesAddComponent implements OnInit {
  petForm: FormGroup;
  clienteForm: FormGroup;
  isLinear = true;
  racasCachorros!: string[];
  racasGatos!: string[];

  constructor(
    private router: Router,
    private service: ClientesService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ClientesAddComponent>,
    private dialog: MatDialog
  ) {

    this.petForm = this.formBuilder.group({
      nomePet: ['', Validators.required],
      idade: ['', Validators.required],
      peso: ['', Validators.required],
      especie: [''],
      raca: [''],
      sexo: ['', Validators.required]
    });


    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      cidade: ['', Validators.required],
      cep: ['', Validators.required],
      numero: ['', Validators.required]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.clienteForm.get(fieldName);
    return field !== null && field.invalid && (field.touched || field.dirty);
  }

  isPetFieldInvalid(fieldName: string): boolean {
    const field = this.petForm.get(fieldName);
    return field !== null && field.invalid && (field.touched || field.dirty);
  }

  petProximo(): void {
    if (this.petForm.invalid) {
      this.petForm.markAllAsTouched();
      return;
    }
  }

  proximo(): void {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }
  }

  ngOnInit(): void {
    this.service.getRacas().subscribe((racas: any) => {
      this.racasCachorros = racas.cao;
      this.racasGatos = racas.gato;
    });
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    if (this.petForm.valid && this.clienteForm.valid) {
      const petFormData = this.petForm.value;
      const clienteFormData = this.clienteForm.value;

      const pet: Pet = {
        id: 0,
        nome: petFormData.nomePet,
        idade: petFormData.idade,
        peso: petFormData.peso,
        especie: petFormData.especie,
        raca: petFormData.raca,
        sexo: petFormData.sexo
      };

      const cliente: User = {
        id: 0,
        nome: clienteFormData.nome,
        email: clienteFormData.email,
        telefone: clienteFormData.telefone,
        cidade: clienteFormData.cidade,
        cep: clienteFormData.cep,
        cpf: clienteFormData.cpf,
        casa: clienteFormData.numero,
        pet: pet
      };
      this.service.salvar(cliente).subscribe(response => {
        console.log(response);
        // Feche o diálogo de cadastro
        this.dialogRef.close(true);
        // Abra o diálogo de confirmação

        const dialogRef = this.dialog.open(CreatesuccessdialogComponent, {
          width: '250px',
          data: { message: 'Cliente cadastrado com sucesso!' }
        });

        // Após o diálogo de confirmação ser fechado
        dialogRef.afterClosed().subscribe(result => {
          // Faça qualquer ação necessária após a confirmação
          console.log('Diálogo de confirmação fechado');
        });
      });

    }
  }
}

